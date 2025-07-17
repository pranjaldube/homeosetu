export const formatPrice = (price: number | null) => {

  if(price === null){
    return ""
  }
  // Read currency from cookie
  const currency = document.cookie
    .split("; ")
    .find((c) => c.startsWith("preferred_currency="))
    ?.split("=")[1] || "INR";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
};