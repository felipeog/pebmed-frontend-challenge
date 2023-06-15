import { ComponentProps } from "react";

import styles from "./index.module.css";

function Chip({ children, ...props }: ComponentProps<"span">) {
  return (
    <span className={`Chip ${styles.chip}`} {...props}>
      {children}
    </span>
  );
}

export { Chip };
