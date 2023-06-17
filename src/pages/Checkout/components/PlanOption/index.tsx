import clsx from "clsx";

import { IPlan } from "types/IPlan";
import styles from "./index.module.css";
import { Checkbox } from "components/Checkbox";
import { formatBrl } from "utils/formatBrl";
import { Chip } from "components/Chip";
import { Text } from "components/Text";

interface IPlanOptionProps {
  plan: IPlan;
  className?: string;
  isSelected?: boolean;
  installmentsDescription?: string;
  onClick?: () => void;
}

function PlanOption({
  className,
  plan,
  installmentsDescription,
  isSelected = false,
  onClick,
}: IPlanOptionProps) {
  function handlePlanOptionClick() {
    onClick?.();
  }

  function getInstallmentsText() {
    if (!plan.splittable) {
      return null;
    }

    if (isSelected && !installmentsDescription) {
      return "Selecione a quantidade de parcelas";
    }

    return installmentsDescription;
  }

  return (
    <div
      className={clsx("PlanOption", className, styles.option, {
        [styles.selected]: isSelected,
      })}
      onClick={handlePlanOptionClick}
    >
      <div className={styles.content}>
        <Text variation="smallBold">
          {plan.title} | {plan.description}
        </Text>

        <Text className={styles.price} variation="footnote">
          De {formatBrl(plan.fullPrice)} | Por{" "}
          {formatBrl(plan.fullPrice - plan.discountAmmount)}{" "}
          <Chip className={styles.percentage}>
            -{plan.discountPercentage * 100}%
          </Chip>
        </Text>

        {plan.splittable && (
          <Text className={styles.installments} variation="exception">
            {getInstallmentsText()}
          </Text>
        )}
      </div>

      <Checkbox isOn={isSelected} />
    </div>
  );
}

export { PlanOption };
