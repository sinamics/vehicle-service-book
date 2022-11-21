import { Button, Card, Grid, Row, Spacer, Text } from "@nextui-org/react";
import NextLink from "next/link";
import { FiEdit, FiPlus, FiTool, FiTrash2 } from "react-icons/fi";

import Seo from "@/components/Seo";
import Layout from "@/layouts/Layout";
import { formatEngineCapacity } from "@/utils/formatters";
import { trpc } from "@/utils/trpc";

export default function CarsList() {
  const utils = trpc.useContext();
  const { isLoading, isSuccess, data: cars } = trpc.car.getAll.useQuery();

  const { mutate: deleteCar } = trpc.car.delete.useMutation({
    onSuccess: () => utils.car.getAll.invalidate(),
  });

  return (
    <Layout>
      <Seo title="Cars" description="cars list" />
      <>
        <Grid.Container gap={2}>
          <Grid xs={12} sm={6} md={4} lg={3}>
            <Card
              as={NextLink}
              href="/app/cars/add"
              css={{ h: "100%", minHeight: "245px" }}
              variant="bordered"
              isPressable
              isHoverable
            >
              <Card.Body>
                <Row justify="center" css={{ h: "100%", alignItems: "center" }}>
                  <FiPlus size={48} />
                </Row>
              </Card.Body>
            </Card>
          </Grid>
          {cars?.length &&
            cars.map((car) => (
              <Grid key={car.id} xs={12} sm={6} md={4} lg={3}>
                <Card variant="bordered" css={{ p: "$6" }}>
                  <Card.Header>
                    <Grid.Container>
                      <Grid justify="space-between" xs={12}>
                        <Grid.Container>
                          <Grid justify="space-between" xs={12}>
                            <Text h4 css={{ lineHeight: "$xs" }}>
                              {car.brand} {car.model} {car.generation}{" "}
                              {car.productionYear}
                            </Text>
                          </Grid>
                          <Grid xs={12}>
                            <Text css={{ color: "$accents8" }}>{car.type}</Text>
                          </Grid>
                        </Grid.Container>
                        <Button
                          color="success"
                          icon={<FiEdit />}
                          auto
                          flat
                          as={NextLink}
                          href={`/app/cars/${car.id}`}
                        />
                      </Grid>
                    </Grid.Container>
                  </Card.Header>
                  <Card.Body css={{ pt: "$2", pb: "$6" }}>
                    <Text>
                      <strong>Engine:</strong> {car.engineType}{" "}
                      {formatEngineCapacity(car.engineCapacity)}{" "}
                      {car.enginePower}
                      HP
                    </Text>
                    <Text>
                      <strong>Gearbox:</strong> {car.gearboxType}
                    </Text>
                  </Card.Body>
                  <Card.Divider />
                  <Card.Footer>
                    <Row justify="space-between">
                      <Button
                        auto
                        icon={<FiTool />}
                        as={NextLink}
                        href={`/app/cars/${car.id}/repairs`}
                      >
                        Repairs
                      </Button>
                      <Spacer x={0.5} />
                      <Button
                        color="error"
                        auto
                        flat
                        icon={<FiTrash2 />}
                        onClick={() => deleteCar({ carId: car.id })}
                      >
                        Delete
                      </Button>
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
