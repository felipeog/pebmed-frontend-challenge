import cardValidator from "card-validator";

export function number(value: string) {
  const formattedValue = value.replace(/\D/g, "");
  const numberVerification = cardValidator.number(formattedValue);

  if (!numberVerification.card?.gaps) {
    return formattedValue;
  }

  const gaps = numberVerification.card.gaps;
  const formarttedNumber = gaps.reduceRight((acc, gap) => {
    if (acc.length <= gap) {
      return acc;
    }

    const charArray = Array.from(acc);

    charArray.splice(gap, 0, " ");

    return charArray.join("");
  }, formattedValue);

  return formarttedNumber;
}

export function expiration(value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(.{5})(.+)/, "$1"); // 4 digits + 1 slash between them
}

export function code(value: string) {
  return value.replace(/\D/g, "").replace(/(.{4})(.+)/, "$1"); // max 4 digits
}

export function name(value: string) {
  return value.toUpperCase();
}

export function cpf(value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(.{14})(.+)/, "$1"); // 11 digits + 2 dots + 1 dash
}

export function coupon(value: string) {
  return value.toUpperCase().replace(/(.{100})(.+)/, "$1"); //max 100 characters;
}
