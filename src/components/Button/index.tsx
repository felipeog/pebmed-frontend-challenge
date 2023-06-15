import { ComponentProps } from "react";

import styles from "./index.module.css";

function Button({ children, ...props }: ComponentProps<"button">) {
  return (
    <button className={`Button ${styles.button}`} {...props}>
      {children}
    </button>
  );
}

export { Button };
