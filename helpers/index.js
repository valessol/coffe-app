export const formatCurrency = (currency) => {
  return currency.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};
