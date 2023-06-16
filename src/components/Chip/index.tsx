import { ComponentProps } from "react";

import styles from "./index.module.css";

interface IChipProps extends ComponentProps<"span"> {
  variation?: "filled" | "outlined";
}

function Chip({ children, variation = "filled", ...props }: IChipProps) {
  return (
    <span className={`Chip ${styles.chip} ${styles[variation]}`} {...props}>
      {children}
    </span>
  );
}

export { Chip };
