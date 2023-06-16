import { ComponentProps } from "react";
import clsx from "clsx";

import styles from "./index.module.css";

interface IChipProps extends ComponentProps<"span"> {
  variation?: "filled" | "outlined";
}

function Chip({
  children,
  className,
  variation = "filled",
  ...props
}: IChipProps) {
  return (
    <span
      className={clsx("Chip", className, styles.chip, styles[variation])}
      {...props}
    >
      {children}
    </span>
  );
}

export { Chip };
