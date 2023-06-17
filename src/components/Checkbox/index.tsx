import { ComponentProps } from "react";
import clsx from "clsx";

import styles from "./index.module.css";

interface ICheckboxProps extends ComponentProps<"button"> {
  isOn?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
}

function Checkbox({
  className,
  isOn = false,
  isDisabled = false,
  onClick,
  ...props
}: ICheckboxProps) {
  function handleCheckboxClick() {
    onClick?.();
  }

  return (
    <button
      className={clsx("Checkbox", className, styles.checkbox, {
        [styles.on]: isOn,
        [styles.disabled]: isDisabled,
      })}
      onClick={handleCheckboxClick}
      {...props}
    />
  );
}

export { Checkbox };
