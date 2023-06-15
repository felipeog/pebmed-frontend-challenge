import { ComponentProps } from "react";

import styles from "./index.module.css";

interface ITextProps extends ComponentProps<"p"> {
  variation?: "regular" | "small" | "smallBold" | "footnote" | "exception";
}

function Text({ variation = "regular", children, ...props }: ITextProps) {
  return (
    <p className={`Text ${styles[variation]}`} {...props}>
      {children}
    </p>
  );
}

export { Text };
