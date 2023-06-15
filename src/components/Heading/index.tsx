import { ComponentProps, ReactNode } from "react";

import styles from "./index.module.css";

type TTHeadingTags = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
interface IHeadingProps extends ComponentProps<TTHeadingTags> {
  tag?: TTHeadingTags;
  children: ReactNode;
}

function Heading({ tag, children, ...props }: IHeadingProps) {
  const currentTag = tag ?? "h1";
  const CurrentHeading = currentTag;

  return (
    <CurrentHeading className={`Heading ${styles[currentTag]}`} {...props}>
      {children}
    </CurrentHeading>
  );
}

export { Heading };
