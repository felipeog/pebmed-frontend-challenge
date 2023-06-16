import { ComponentProps } from "react";
import clsx from "clsx";

import styles from "./index.module.css";

interface IButtonProps extends ComponentProps<"button"> {
  variation?: "primary" | "secondary";
}

function Button({
  children,
  className,
  variation = "primary",
  ...props
}: IButtonProps) {
  return (
    <button
      className={clsx("Button", className, styles.button, styles[variation])}
      {...props}
    >
      {children}
    </button>
  );
}

export { Button };
