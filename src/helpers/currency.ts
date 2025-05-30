export const formatCurrencyInCents = (amout: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amout / 100);
};
