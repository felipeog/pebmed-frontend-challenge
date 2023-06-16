import { ComponentProps } from "react";
import clsx from "clsx";

import CreditCardsOne from "assets/images/credit-cards-215w.png";
import CreditCardsOneAndAHalf from "assets/images/credit-cards-323w.png";
import CreditCardsTwo from "assets/images/credit-cards-430w.png";
import { Text } from "components/Text";
import { Icon } from "components/Icon";
import styles from "./index.module.css";

function CreditCards({ className }: ComponentProps<"div">) {
  return (
    <div className={clsx("CreditCards", className, styles.wrapper)}>
      <img
        className={styles.cardsImage}
        srcSet={`${CreditCardsOne} 1x, ${CreditCardsOneAndAHalf} 1.5x, ${CreditCardsTwo} 2x`}
        src={CreditCardsTwo}
        alt=""
      />

      <Text className={styles.iuguText}>
        Pagamentos por{" "}
        <Icon name="Iugu" fill="var(--color_gray_1)" width={29} />
      </Text>
    </div>
  );
}

export { CreditCards };
