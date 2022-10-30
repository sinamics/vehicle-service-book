export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export interface Car {
  id: number;
  type?: string;
  brand: string;
  model: string;
  generation?: string;
  productionYear?: number;
  engineType?: string;
  engineCapacity?: string;
  enginePower?: number;
  gearboxType?: string;
}
