import { ComponentProps } from "react";
import clsx from "clsx";

import styles from "./index.module.css";

interface ICardProps extends ComponentProps<"div"> {
  variation?: "light" | "tinted";
  hasShadow?: boolean;
}

function Card({
  children,
  className,
  variation = "light",
  hasShadow = true,
  ...props
}: ICardProps) {
  return (
    <div
      className={clsx("Card", className, styles.card, styles[variation], {
        [styles.shadow]: hasShadow,
      })}
      {...props}
    >
      {children}
    </div>
  );
}

export { Card };
