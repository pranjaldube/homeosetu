export const formatPrice = (price: number, country: string | undefined) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: (!country || country === "India") ? "INR" : "USD",
  }).format(price)
}
