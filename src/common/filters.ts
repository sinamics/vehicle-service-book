export function formatDate(
  date: Date | null,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
): string | null {
  if (!date) return null;
  return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
}

export function formatPrice(price: number | null): string | null {
  if (!price) return null;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}
