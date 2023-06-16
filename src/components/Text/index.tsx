import { ComponentProps } from "react";
import clsx from "clsx";

import styles from "./index.module.css";

interface ITextProps extends ComponentProps<"p"> {
  variation?: "regular" | "small" | "smallBold" | "footnote" | "exception";
}

function Text({
  children,
  className,
  variation = "regular",
  ...props
}: ITextProps) {
  return (
    <p className={clsx("Text", className, styles[variation])} {...props}>
      {children}
    </p>
  );
}

export { Text };
