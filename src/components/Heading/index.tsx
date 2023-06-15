import { ComponentProps } from "react";

import styles from "./index.module.css";

type TTHeadingTags = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
interface IHeadingProps extends ComponentProps<TTHeadingTags> {
  tag?: TTHeadingTags;
}

function Heading({ tag = "h1", children, ...props }: IHeadingProps) {
  const CurrentHeading = tag;

  return (
    <CurrentHeading className={`Heading ${styles[tag]}`} {...props}>
      {children}
    </CurrentHeading>
  );
}

export { Heading };
