function formatBrl(price: number) {
  const brlFormatter = new Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  return brlFormatter.format(price);
}

export { formatBrl };
