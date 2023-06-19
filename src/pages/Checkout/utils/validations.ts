import cardValidator from "card-validator";
import { cpf as cpfValidator } from "cpf-cnpj-validator";

export function number(value: string) {
  const formattedValue = value.replace(/\D/g, "");
  const card = cardValidator.number(formattedValue);

  return card.isValid || "Número do cartão inválido";
}

export function expiration(value: string) {
  const formattedValue = value.replace(/\D/g, "");
  const card = cardValidator.expirationDate(formattedValue);

  return card.isValid || "Validade inválida";
}

export function code(value: string) {
  const formattedValue = value.replace(/\D/g, "");
  const card = cardValidator.cvv(formattedValue);

  return card.isValid || "CVV inválido";
}

export function name(value: string) {
  const card = cardValidator.cardholderName(value);

  return card.isValid || "Nome impresso no cartão inválido";
}

export function cpf(value: string) {
  const formattedValue = value.replace(/\D/g, "");
  const isValid = cpfValidator.isValid(formattedValue);

  return isValid || "CPF inválido";
}
