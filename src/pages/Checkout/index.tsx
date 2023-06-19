import { ChangeEvent, useMemo, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
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
import * as masks from "./utils/masks";
import * as validations from "./utils/validations";
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
  const subscriptionForm = useForm<IFormValues>({ mode: "all" });
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

  function onInvalid(_errors: FieldErrors<IFormValues>) {
    toast("Dados inválidos, corrija as entradas destacadas", {
      toastId: "invalid-form",
    });
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const name = event.target.name as keyof Omit<IFormValues, "installments">;
    const mask = masks[name];

    setValue(name, mask(event.target.value));
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
                validate: validations.number,
                onChange: handleInputChange,
              })}
              id="number"
              label="Número do cartão"
              type="text"
              placeholder="0000 0000 0000 0000"
              isValid={!formState.errors.number?.message}
            />

            <div className={styles.twoInputs}>
              <Input
                {...register("expiration", {
                  required: "Validade é obrigatória",
                  validate: validations.expiration,
                  onChange: handleInputChange,
                })}
                id="expiration"
                label="Validade"
                type="text"
                placeholder="MM/AA"
                isValid={!formState.errors.expiration?.message}
              />
              <Input
                {...register("code", {
                  required: "CVV é obrigatório",
                  validate: validations.code,
                  onChange: handleInputChange,
                })}
                id="code"
                label="CVV"
                type="text"
                placeholder="000"
                isValid={!formState.errors.code?.message}
              />
            </div>

            <Input
              {...register("name", {
                required: "Nome impresso no cartão é obrigatório",
                validate: validations.name,
                onChange: handleInputChange,
              })}
              id="name"
              label="Nome impresso no cartão"
              type="text"
              placeholder="Seu nome"
              isValid={!formState.errors.name?.message}
            />
            <Input
              {...register("cpf", {
                required: "CPF é obrigatório",
                validate: validations.cpf,
                onChange: handleInputChange,
              })}
              id="cpf"
              label="CPF"
              type="text"
              placeholder="000.000.000-00"
              isValid={!formState.errors.cpf?.message}
            />
            <Input
              {...register("coupon", {
                required: false,
                onChange: handleInputChange,
              })}
              id="coupon"
              label="Cupom"
              type="text"
              placeholder="Insira aqui"
              isValid={!formState.errors.coupon?.message}
            />

            {Boolean(installmentsOptions?.length) && (
              <Select
                {...register("installments", {
                  required: "Número de parcelas é obrigatório",
                  onChange: handleInstallmentsSelectChange,
                })}
                id="installments"
                label="Número de parcelas"
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
