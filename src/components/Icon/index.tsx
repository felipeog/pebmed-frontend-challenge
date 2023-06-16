import { ComponentProps } from "react";
import clsx from "clsx";

import * as Icons from "../../assets/icons";

interface IIconProps extends ComponentProps<"svg"> {
  name: "ArrowLeft" | "Check" | "Iugu" | "QuestionMark" | "Star" | "Whitebook";
}

function Icon({
  className,
  name,
  fill = "var(--color_primary)",
  ...props
}: IIconProps) {
  const CurrentIcon = Icons?.[name];

  if (!CurrentIcon) {
    return null;
  }

  return (
    <CurrentIcon
      className={clsx("Icon", className, name)}
      fill={fill}
      {...props}
    />
  );
}

export { Icon };
