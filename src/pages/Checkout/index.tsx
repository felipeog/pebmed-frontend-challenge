import { ChangeEvent, useMemo, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import cardValidator from "card-validator";
import clsx from "clsx";

import { Button } from "components/Button";
import { Chip } from "components/Chip";
import { Heading } from "components/Heading";
import { Icon } from "components/Icon";
import { Input } from "components/Input";
import { Select } from "components/Select";
import { Text } from "components/Text";
import { EMAIL_MOCK } from "consts/emailMock";
import * as api from "services/api";
import { IPlan } from "types/IPlan";
import { ISubscription } from "types/ISubscription";
import { formatBrl } from "utils/formatBrl";
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

interface IInstallmentOption {
  label: string;
  value: number;
}

function Checkout() {
  const [selectedPlan, setSelectedPlan] = useState<IPlan | null>(null);
  const [selectedInstallment, setSelectedInstallment] =
    useState<IInstallmentOption | null>(null);
  const navigate = useNavigate();
  const subscriptionForm = useForm<IFormValues>();
  const plansResult = useQuery<IPlan[], Error>({
    queryKey: ["plans"],
    queryFn: api.fetchPlans,
    onSuccess: (data) => {
      setSelectedPlan((prev) => prev ?? data[0]);
    },
  });
  const subscribe = useMutation({
    mutationFn: api.sendSubscription,
    onError: (error: Error) => {
      console.error("Checkout @ subscribre >>>>>", error);
    },
    onSuccess: (_data: ISubscription) => {
      // not using data as it's always the same

      toast.dismiss();
      navigate("/checkout/success", {
        state: {
          subscription: {
            fullPrice: selectedPlan?.fullPrice,
            discountAmmount: selectedPlan?.discountAmmount,
            splittable: selectedPlan?.splittable,
            title: selectedPlan?.title,
            description: selectedPlan?.description,
            installments: selectedInstallment?.value,
            cpf: subscriptionForm.getValues().cpf,
          },
        },
      });
    },
  });

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

  const { register, handleSubmit, formState, setValue } = subscriptionForm;

  function onValid(data: IFormValues) {
    subscribe.mutate({
      couponCode: data.coupon || null,
      creditCardCPF: data.cpf.replace(/\D/g, ""),
      creditCardCVV: data.code,
      creditCardExpirationDate: data.expiration,
      creditCardHolder: data.name,
      creditCardNumber: data.number.replace(/\D/g, ""),
      gateway: "iugu",
      installments: Number(data.installments) || 1,
      offerId: 18,
      userId: 1,
    });
  }

  function onInvalid(errors: FieldErrors<IFormValues>) {
    const firstError = Object.values(errors)[0];

    toast(firstError.message, {
      toastId: firstError.message,
    });
  }

  // TODO: move handlers to the utils folder
  function handleNumberInputChange(event: ChangeEvent<HTMLInputElement>) {
    const formattedValue = event.target.value.replace(/\D/g, "");

    // TODO: format
    // const card = cardValidator.number(formattedValue);
    // const formattedValue = event.target.value
    //   .replace(/\D/g, "")
    //   .replace(/(\d{4})(\d)/, "$1 $2")
    //   .replace(/(\d{4})(\d)/, "$1 $2")
    //   .replace(/(\d{4})(\d)/, "$1 $2")
    //   .replace(/(.{19})(.+)/, "$1"); // 16 digits + 3 spaces between them

    setValue("number", formattedValue);
  }

  // TODO: move validators to the utils folder
  function validateNumber(value: string) {
    const formattedValue = value.replace(/\D/g, "");
    const card = cardValidator.number(formattedValue);

    return card.isValid || "Número do cartão inválido";
  }

  function handleExpirationInputChange(event: ChangeEvent<HTMLInputElement>) {
    const formattedValue = event.target.value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(.{5})(.+)/, "$1"); // 4 digits + 1 slash between them

    setValue("expiration", formattedValue);
  }

  function handleNameInputChange(event: ChangeEvent<HTMLInputElement>) {
    const formattedValue = event.target.value
      .replace(/[^a-z\s]/gi, "")
      .replace(/\s{2,}/g, " ")
      .replace(/(.{178})(.+)/, "$1")
      .toUpperCase();

    setValue("name", formattedValue);
  }

  function handleCodeInputChange(event: ChangeEvent<HTMLInputElement>) {
    const formattedValue = event.target.value
      .replace(/\D/g, "")
      .replace(/(.{3})(.+)/, "$1");

    setValue("code", formattedValue);
  }

  function handleCpfInputChange(event: ChangeEvent<HTMLInputElement>) {
    const formattedValue = event.target.value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(.{14})(.+)/, "$1"); // 11 digits + 2 dots + 1 dash

    setValue("cpf", formattedValue);
  }

  function handleCouponInputChange(event: ChangeEvent<HTMLInputElement>) {
    const formattedValue = event.target.value
      .replace(/(.{178})(.+)/, "$1")
      .toUpperCase();

    setValue("coupon", formattedValue);
  }

  function handleInstallmentsSelectChange(
    event: ChangeEvent<HTMLSelectElement>
  ) {
    setValue("installments", event.target.value);
    setSelectedInstallment(
      installmentsOptions.find(
        (option) => option.value === Number(event.target.value)
      ) as IInstallmentOption
    );
  }

  function getPlanOptionClickHandler(plan: IPlan) {
    return () => setSelectedPlan(plan);
  }

  if (plansResult.isLoading || subscribe.isLoading) {
    return <Text>Carregando...</Text>;
  }

  if (plansResult.isError || subscribe.isError) {
    return (
      <Text>
        Ocorreu um erro. Atualize a página ou tente novamente mais tarde.
      </Text>
    );
  }

  return (
    <main className={clsx("Checkout", styles.checkout)}>
      <section className={styles.column}>
        <header className={styles.header}>
          <Heading tag="h4">Confira o seu plano:</Heading>
          <Chip variation="outlined">{EMAIL_MOCK}</Chip>
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

      <section className={styles.column}>
        <header className={styles.header}>
          <Heading tag="h4">Estamos quase lá!</Heading>
          <Text>Insira seus dados de pagamento abaixo:</Text>
        </header>

        <CreditCards />

        <form onSubmit={handleSubmit(onValid, onInvalid)}>
          <fieldset className={styles.fieldset}>
            <Input
              {...register("number", {
                required: "Número do cartão é obrigatório",
                validate: validateNumber,
              })}
              id="number"
              label="Número do cartão"
              type="text"
              placeholder="0000 0000 0000 0000"
              onChange={handleNumberInputChange}
              isValid={!formState.errors.number?.message}
            />

            <div className={styles.twoInputs}>
              <Input
                {...register("expiration", {
                  required: "Validade é obrigatória",
                  pattern: {
                    value: /^\d{2}\/\d{2}$/,
                    message: "Validade inválida",
                  },
                })}
                id="expiration"
                label="Validade"
                type="text"
                placeholder="MM/AA"
                onChange={handleExpirationInputChange}
                isValid={!formState.errors.expiration?.message}
              />
              <Input
                {...register("code", {
                  required: "CVV é obrigatório",
                  pattern: {
                    value: /^\d{3}$/,
                    message: "CVV inválido",
                  },
                })}
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
                required: "Nome impresso no cartão é obrigatório",
              })}
              id="name"
              label="Nome impresso no cartão"
              type="text"
              placeholder="Seu nome"
              onChange={handleNameInputChange}
              isValid={!formState.errors.name?.message}
            />
            <Input
              {...register("cpf", {
                required: "CPF é obrigatório",
                pattern: {
                  value: /^(\d{3}\.){2}\d{3}-\d{2}$/,
                  message: "CPF inválido",
                },
              })}
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
                  required: "Número de parcelas é obrigatório",
                })}
                id="installments"
                label="Número de parcelas"
                onChange={handleInstallmentsSelectChange}
                options={installmentsOptions}
                isValid={!formState.errors.installments?.message}
                isDefaultValue={!selectedInstallment}
              />
            )}
          </fieldset>

          <Button className={styles.submit} type="submit">
            Finalizar pagamento
          </Button>
        </form>
      </section>
    </main>
  );
}

export { Checkout };
