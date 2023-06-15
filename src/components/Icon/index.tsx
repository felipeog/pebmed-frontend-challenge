import { ComponentProps } from "react";

import * as Icons from "../../assets/icons";

interface IIconProps extends ComponentProps<"svg"> {
  name: "ArrowLeft" | "Check" | "Iugu" | "QuestionMark" | "Star" | "Whitebook";
}

function Icon({ name, fill = "var(--color_primary)", ...props }: IIconProps) {
  const CurrentIcon = Icons?.[name];

  if (!CurrentIcon) {
    return null;
  }

  return <CurrentIcon className={`Icon ${name}`} fill={fill} {...props} />;
}

export { Icon };
