import {
  Button,
  Card,
  Grid,
  Link,
  Row,
  Spacer,
  Text,
  Tooltip,
} from "@nextui-org/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";

import Seo from "@/components/Seo";
import Layout from "@/layouts/Layout";
import { formatDate, formatMileage, formatPrice } from "@/utils/formatters";
import { trpc } from "@/utils/trpc";

export default function Repairs() {
  const { query } = useRouter();
  const utils = trpc.useContext();
  const { data: repairs } = trpc.repair.getAll.useQuery(
    {
      carId: query.carId as string,
    },
    {
      enabled: Boolean(query.carId),
    }
  );

  const { mutate: deleteRepair } = trpc.repair.delete.useMutation({
    onSuccess: () => utils.repair.getAll.invalidate(),
  });

  return (
    <Layout>
      <Seo title="Repairs" description="repairs list" />
      <>
        <Grid.Container gap={2}>
          <Grid xs={12} sm={6} md={4} lg={3}>
            <Link
              as={NextLink}
              href={`/app/cars/${encodeURIComponent(
                query.carId as string
              )}/repairs/add`}
              css={{ minWidth: "100%", h: "100%", minHeight: "245px" }}
            >
              <Card
                css={{ h: "100%", minHeight: "245px" }}
                variant="bordered"
                isPressable
                isHoverable
              >
                <Card.Body>
                  <Row
                    justify="center"
                    css={{ h: "100%", alignItems: "center" }}
                  >
                    <FiPlus size={48} />
                  </Row>
                </Card.Body>
              </Card>
            </Link>
          </Grid>
          {repairs?.length &&
            repairs.map((repair) => (
              <Grid key={repair.id} xs={12} sm={6} md={4} lg={3}>
                <Card variant="bordered" css={{ p: "$6" }}>
                  <Card.Header>
                    <Grid.Container>
                      <Grid justify="space-between" xs={12}>
                        <Text h4 css={{ lineHeight: "$xs" }}>
                          {repair.title}
                        </Text>
                      </Grid>
                      <Grid xs={12}>
                        <Text css={{ color: "$accents8" }}>
                          {repair.description}
                        </Text>
                      </Grid>
                    </Grid.Container>
                  </Card.Header>
                  <Card.Body css={{ pt: "$2", pb: "$6" }}>
                    <Text>
                      <strong>Date:</strong> {formatDate(repair.date)}
                    </Text>
                    <Text>
                      <strong>Price:</strong> {formatPrice(repair.price)}
                    </Text>
                    <Text>
                      <strong>Mileage:</strong> {formatMileage(repair.mileage)}
                    </Text>
                  </Card.Body>
                  <Card.Divider />
                  <Card.Footer>
                    <Row justify="center">
                      <Tooltip content="Edit repair" color="success">
                        <Button
                          color="success"
                          icon={<FiEdit />}
                          auto
                          flat
                          as={NextLink}
                          href={`/app/cars/${repair.carId}/repairs/${repair.id}`}
                        />
                      </Tooltip>
                      <Spacer x={0.5} />
                      <Tooltip content="Delete repair" color="error">
                        <Button
                          color="error"
                          auto
                          flat
                          icon={<FiTrash2 />}
                          onClick={() =>
                            deleteRepair({
                              carId: repair.carId,
                              repairId: repair.id,
                            })
                          }
                        />
                      </Tooltip>
                    </Row>
                  </Card.Footer>
                </Card>
              </Grid>
            ))}
        </Grid.Container>
      </>
    </Layout>
  );
}
