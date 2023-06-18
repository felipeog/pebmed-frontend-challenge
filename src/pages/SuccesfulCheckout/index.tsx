import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";

import { EMAIL_MOCK } from "consts/emailMock";
import { IPlan } from "types/IPlan";
import { Icon } from "components/Icon";
import { Heading } from "components/Heading";
import { Text } from "components/Text";
import { Card } from "components/Card";
import { formatBrl } from "utils/formatBrl";
import { Button } from "components/Button";
import styles from "./index.module.css";

interface ISubscriptionState {
  plan: IPlan;
  installment: {
    label: string;
    value: number;
  };
  form: {
    number: string;
    expiration: string;
    code: string;
    name: string;
    cpf: string;
    coupon: string;
    installments: string;
  };
}

function SuccesfulCheckout() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // if by any means the user gets here without the subscription data,
    // they're redirected to the home page
    if (!location.state) {
      navigate("/");
    }
  }, [location.state, navigate]);

  if (!location.state?.subscription) {
    return null;
  }

  const { form, installment, plan } = location.state
    .subscription as ISubscriptionState;
  const finalPrice = plan.fullPrice - plan.discountAmmount;

  function handleHomeButtonClick() {
    navigate("/");
  }

  function getInstallmentsText() {
    if (!plan.splittable) {
      return null;
    }

    const installmentPrice = formatBrl(finalPrice / installment.value);

    return ` | ${installment.value}x ${installmentPrice}`;
  }

  return (
    <main className={clsx("SuccesfulCheckout", styles.successfulCheckout)}>
      <header className={styles.header}>
        <div className={styles.headerIcon}>
          <Icon name="Check" width={28} />
        </div>

        <Heading tag="h4">Parabéns!</Heading>
        <Text className={styles.headerText}>
          Sua assinatura foi realizada <br />
          com sucesso.
        </Text>
      </header>

      <section className={styles.section}>
        <Card>
          <Card
            className={styles.planCard}
            variation="tinted"
            hasShadow={false}
          >
            <div className={styles.planIcon}>
              <Icon name="Star" width={18} />
            </div>

            <div className={styles.planText}>
              <Text>
                {plan.title} | {plan.description}
              </Text>
              <Text variation="small">
                {formatBrl(finalPrice)}
                {getInstallmentsText()}
              </Text>
            </div>
          </Card>

          <div className={styles.userData}>
            <Text className={styles.userRow} variation="small">
              <span className={styles.label}>E-mail</span>{" "}
              <span className={styles.value}>{EMAIL_MOCK}</span>
            </Text>
            <Text className={styles.userRow} variation="small">
              <span className={styles.label}>CPF</span>{" "}
              <span className={styles.value}>{form.cpf}</span>
            </Text>
          </div>
        </Card>

        <div className={styles.navigate}>
          <Link className={styles.navigateLink} to="/">
            Gerenciar assinatura
          </Link>
          <Button onClick={handleHomeButtonClick}>Ir para a Home</Button>
        </div>
      </section>
    </main>
  );
}

export { SuccesfulCheckout };
