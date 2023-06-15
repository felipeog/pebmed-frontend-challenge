import { ComponentProps } from "react";

import * as Icons from "../../assets/icons";

interface IIconProps extends ComponentProps<"svg"> {
  name: "ArrowLeft" | "Check" | "Iugu" | "QuestionMark" | "Star" | "Whitebook";
}

function Icon({ name, ...props }: IIconProps) {
  const CurrentIcon = Icons?.[name];

  if (!CurrentIcon) {
    return null;
  }

  return <CurrentIcon className={`Icon ${name}`} {...props} />;
}

export { Icon };
