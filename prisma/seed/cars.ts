import { faker } from "@faker-js/faker";
import type { Car, EngineType, GearboxType } from "@prisma/client";

export async function addCars(prisma: any, userUUID: string[]) {
  await prisma.car.deleteMany({});

  const cars: Car[] = [];
  const uuids: string[] = [];

  for (let i = 0; i < 100; i++) {
    const uuid = faker.datatype.uuid();

    const car: Car = {
      id: uuid,
      type: "SUV",
      brand: faker.vehicle.manufacturer(),
      model: faker.vehicle.model(),
      productionYear: faker.date.past().getFullYear(),
      engineCapacity: faker.datatype.number({ min: 1000, max: 5000 }),
      enginePower: faker.datatype.number({ min: 50, max: 900 }),
      gearboxType: faker.helpers.arrayElement([
        "Manual",
        "Automatic",
      ] as GearboxType[]),
      generation: null,
      engineType: faker.helpers.arrayElement([
        "Gasoline",
        "Diesel",
        "Electric",
        "Hybrid",
        "Other",
      ] as EngineType[]),
      userId: faker.helpers.arrayElement(userUUID),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    };

    cars.push(car);
    uuids.push(uuid);
  }

  await prisma.car.createMany({ data: cars });
  return uuids;
}
