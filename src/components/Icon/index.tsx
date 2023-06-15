import { SVGProps } from "react";

import * as Icons from "../../assets/icons";

interface IIconProps extends SVGProps<SVGSVGElement> {
  name: "ArrowLeft" | "Check" | "Iugu" | "QuestionMark" | "Star" | "Whitebook";
}

function Icon({ name, ...props }: IIconProps) {
  const CurrentIcon = Icons?.[name];

  if (!CurrentIcon) {
    return null;
  }

  return <CurrentIcon {...props} />;
}

export { Icon };
