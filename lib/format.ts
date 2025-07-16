export const formatPrice = (price: number) => {
  // Read currency from cookie
  const currency = document.cookie
    .split("; ")
    .find((c) => c.startsWith("preferred_currency="))
    ?.split("=")[1] || "INR";

  // let convertedPrice = price;

  // // Static conversion rate (you can later fetch from API if needed)
  // const conversionRates: Record<string, number> = {
  //   INR: 1,
  //   USD: 1 / 85, // Example: ₹83 = $1
  // };

  // if (currency === "USD") {
  //   convertedPrice = price * conversionRates.USD;
  // }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
};