import { ComponentProps } from "react";
import clsx from "clsx";

import styles from "./index.module.css";

type TTHeadingTags = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
interface IHeadingProps extends ComponentProps<TTHeadingTags> {
  tag?: TTHeadingTags;
}

function Heading({ children, className, tag = "h1", ...props }: IHeadingProps) {
  const CurrentHeading = tag;

  return (
    <CurrentHeading
      className={clsx("Heading", className, styles[tag])}
      {...props}
    >
      {children}
    </CurrentHeading>
  );
}

export { Heading };
