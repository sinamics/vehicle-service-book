export function sumByField<T>(arr: T[], field: keyof T): number {
  return arr.reduce((acc, item) => acc + Number(item[field]), 0);
}
