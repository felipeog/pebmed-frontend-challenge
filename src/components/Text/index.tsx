import { ComponentProps, ReactNode } from "react";

import styles from "./index.module.css";

interface ITextProps extends ComponentProps<"p"> {
  variation?: "regular" | "small" | "smallBold" | "footnote" | "exception";
  children: ReactNode;
}

function Text({ variation = "regular", children, ...props }: ITextProps) {
  return (
    <p className={`Text ${styles[variation]}`} {...props}>
      {children}
    </p>
  );
}

export { Text };
