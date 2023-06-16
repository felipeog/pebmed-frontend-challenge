import { ComponentProps } from "react";

import styles from "./index.module.css";

interface IButtonProps extends ComponentProps<"button"> {
  variation?: "primary" | "secondary";
}

function Button({ children, variation = "primary", ...props }: IButtonProps) {
  return (
    <button
      className={`Button ${styles.button} ${styles[variation]}`}
      {...props}
    >
      {children}
    </button>
  );
}

export { Button };
