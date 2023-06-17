import { ChangeEvent, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldErrors, useForm } from "react-hook-form";
import { Tooltip } from "react-tooltip";

import clsx from "clsx";

import { IPlan } from "types/IPlan";
import { ISubscription } from "types/ISubscription";
import * as api from "services/api";
import { formatBrl } from "utils/formatBrl";
import { Button } from "components/Button";
import { Heading } from "components/Heading";
import { Text } from "components/Text";
import { Icon } from "components/Icon";
import { Chip } from "components/Chip";
import { Input } from "components/Input";
import { Select } from "components/Select";
import { CreditCards } from "./components/CreditCards";
import { PlanOption } from "./components/PlanOption";
import styles from "./index.module.css";

interface IFormValues {
  number: string;
  expiration: string;
  code: string;
  name: string;
  cpf: string;
  coupon: string;
  installments: string;
}

function Checkout() {
  const [selectedPlan, setSelectedPlan] = useState<IPlan | null>(null);
  const navigate = useNavigate();
  const subscriptionForm = useForm<IFormValues>();
  const plansResult = useQuery<IPlan[], Error>({
    queryKey: ["plans"],
    queryFn: api.fetchPlans,
    onSuccess: (data) => {
      setSelectedPlan(data[0]);
    },
  });
  const subscribe = useMutation({
    mutationFn: api.sendSubscription,
    onError: (error: Error) => {
      console.error("Checkout @ subscribre >>>>>", error);
      alert("Ocorreu um erro, tente novamente.");
      // TODO: add toast
    },
    onSuccess: (data: ISubscription) => {
      navigate("/checkout/success", {
        state: {
          subscription: data,
        },
      });
    },
  });

  const { register, handleSubmit, formState, setValue, watch } =
    subscriptionForm;
  const installments = watch("installments");

  const installmentsOptions = useMemo(() => {
    if (selectedPlan?.splittable) {
      return Array(selectedPlan.installments - 1)
        .fill(null)
        .map((_, index) => {
          const installment = index + 2;
          const totalPrice =
            selectedPlan.fullPrice - selectedPlan.discountAmmount;
          const installmentPrice = formatBrl(totalPrice / installment);

          return {
            label: `${installment}x de ${installmentPrice}/mês`,
            value: installment,
          };
        });
    }

    return [];
  }, [selectedPlan]);

  const selectedInstallment = useMemo(() => {
    if (installments) {
      return installmentsOptions.find(
        (option) => option.value === Number(installments)
      );
    }

    return null;
  }, [installments, installmentsOptions]);

  function onValid(data: IFormValues) {
    subscribe.mutate({
      couponCode: data.coupon || null,
      creditCardCPF: data.cpf.replace(/\D/g, ""),
      creditCardCVV: data.code,
      creditCardExpirationDate: data.expiration,
      creditCardHolder: data.name,
      creditCardNumber: data.number.replace(/\D/g, ""),
      gateway: "iugu",
      installments: Number(data.installments),
      offerId: 18,
      userId: 1,
    });
  }

  function onInvalid(errors: FieldErrors<IFormValues>) {
    // TODO: add toast
  }

  function handleNumberInputChange(event: ChangeEvent<HTMLInputElement>) {
    const formattedValue = event.target.value
      .replace(/\D/g, "")
      .replace(/(\d{4})(\d)/, "$1 $2")
      .replace(/(\d{4})(\d)/, "$1 $2")
      .replace(/(\d{4})(\d)/, "$1 $2")
      .replace(/(.{19})(.+)/, "$1"); // 16 digits + 3 spaces between them

    setValue("number", formattedValue, { shouldValidate: true });
  }

  function handleExpirationInputChange(event: ChangeEvent<HTMLInputElement>) {
    const formattedValue = event.target.value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(.{5})(.+)/, "$1"); // 4 digits + 1 slash between them

    // TODO: check if the current date is before the expiration date

    setValue("expiration", formattedValue, { shouldValidate: true });
  }

  function handleNameInputChange(event: ChangeEvent<HTMLInputElement>) {
    const formattedValue = event.target.value
      .replace(/(.{178})(.+)/, "$1")
      .toUpperCase();

    setValue("name", formattedValue, { shouldValidate: true });
  }

  function handleCodeInputChange(event: ChangeEvent<HTMLInputElement>) {
    const formattedValue = event.target.value
      .replace(/\D/g, "")
      .replace(/(.{3})(.+)/, "$1");

    setValue("code", formattedValue, { shouldValidate: true });
  }

  function handleCpfInputChange(event: ChangeEvent<HTMLInputElement>) {
    const formattedValue = event.target.value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(.{14})(.+)/, "$1"); // 11 digits + 2 dots + 1 dash

    setValue("cpf", formattedValue, { shouldValidate: true });
  }

  function handleCouponInputChange(event: ChangeEvent<HTMLInputElement>) {
    const formattedValue = event.target.value
      .replace(/(.{178})(.+)/, "$1")
      .toUpperCase();

    setValue("coupon", formattedValue, { shouldValidate: true });
  }

  function handleInstallmentsSelectChange(
    event: ChangeEvent<HTMLSelectElement>
  ) {
    setValue("installments", event.target.value, { shouldValidate: true });
  }

  function getPlanOptionClickHandler(plan: IPlan) {
    return () => setSelectedPlan(plan);
  }

  if (plansResult.isLoading || subscribe.isLoading) {
    return <div>Carregando...</div>;
  }

  if (plansResult.isError || subscribe.isError) {
    return (
      <div>
        Ocorreu um erro. Atualize a página ou tente novamente mais tarde.
      </div>
    );
  }

  return (
    <main className={clsx("Checkout", styles.checkout)}>
      <section className={styles.column}>
        <header className={styles.header}>
          <Heading tag="h4">Estamos quase lá!</Heading>
          <Text>Insira seus dados de pagamento abaixo:</Text>
        </header>

        <CreditCards />

        <form onSubmit={handleSubmit(onValid, onInvalid)}>
          <fieldset className={styles.fieldset}>
            <Input
              {...register("number", { required: "Número do cartão inválido" })}
              id="number"
              label="Número do cartão"
              type="text"
              placeholder="0000 0000 0000 0000"
              onChange={handleNumberInputChange}
              isValid={!formState.errors.number?.message}
            />

            <div className={styles.twoInputs}>
              <Input
                {...register("expiration", { required: "Validade inválida" })}
                id="expiration"
                label="Validade"
                type="text"
                placeholder="MM/AA"
                onChange={handleExpirationInputChange}
                isValid={!formState.errors.expiration?.message}
              />
              <Input
                {...register("code", { required: "CVV inválido" })}
                id="code"
                label="CVV"
                type="text"
                placeholder="000"
                onChange={handleCodeInputChange}
                isValid={!formState.errors.code?.message}
              />
            </div>

            <Input
              {...register("name", {
                required: "Nome impresso no cartão inválido",
              })}
              id="name"
              label="Nome impresso no cartão"
              type="text"
              placeholder="Seu nome"
              onChange={handleNameInputChange}
              isValid={!formState.errors.name?.message}
            />
            <Input
              {...register("cpf", { required: "CPF inválido" })}
              id="cpf"
              label="CPF"
              type="text"
              placeholder="000.000.000-00"
              onChange={handleCpfInputChange}
              isValid={!formState.errors.cpf?.message}
            />
            <Input
              {...register("coupon", { required: false })}
              id="coupon"
              label="Cupom"
              type="text"
              placeholder="Insira aqui"
              onChange={handleCouponInputChange}
              isValid={!formState.errors.coupon?.message}
            />

            {Boolean(installmentsOptions?.length) && (
              <Select
                {...register("installments", {
                  required: "Número de parcelas inválido",
                })}
                id="installments"
                label="Número de parcelas"
                onChange={handleInstallmentsSelectChange}
                options={installmentsOptions}
                isValid={!formState.errors.installments?.message}
                isDefaultValue={!installments}
              />
            )}
          </fieldset>

          <Button className={styles.submit} type="submit">
            Finalizar pagamento
          </Button>
        </form>
      </section>

      <section className={styles.column}>
        <header className={styles.header}>
          <Heading tag="h4">Confira o seu plano:</Heading>
          <Chip variation="outlined">fulano@cicrano.com.br</Chip>
        </header>

        <div>
          <ul className={styles.planList}>
            {plansResult.data?.map((plan) => {
              return (
                <li key={plan.id}>
                  <PlanOption
                    plan={plan}
                    isSelected={plan.id === selectedPlan?.id}
                    installmentsDescription={selectedInstallment?.label}
                    onClick={getPlanOptionClickHandler(plan)}
                  />
                </li>
              );
            })}
          </ul>

          <Text className={styles.planWarning} variation="footnote">
            Sobre a cobrança{" "}
            <Icon
              className={styles.icon}
              name="QuestionMark"
              fill="var(--color_black)"
              width={16}
              data-tooltip-id="plan-warning-tooltip"
              data-tooltip-content="Será feito uma pré-autorização no seu cartão e você verá duas cobranças com o valor do plano escolhido por você. Mas não se preocupe! Uma delas será cancelada e você não será cobrado duas vezes."
            />
            <Tooltip className={styles.tooltip} id="plan-warning-tooltip" />
          </Text>
        </div>
      </section>
    </main>
  );
}

export { Checkout };
