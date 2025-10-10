export const formatPrice = (price: number | null, currency:string) => {

  const safePrice = price ?? 0
  const safeCurrency = currency && currency.trim() !== "" ? currency : "INR";
  // Read currency from cookie
  // const currency = document.cookie
  //   .split("; ")
  //   .find((c) => c.startsWith("preferred_currency="))
  //   ?.split("=")[1] || "INR";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: safeCurrency,
    maximumFractionDigits: 0,
  }).format(safePrice);
};