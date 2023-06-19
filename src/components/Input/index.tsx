import { ComponentPropsWithRef, forwardRef, Ref } from "react";
import clsx from "clsx";

import styles from "./index.module.css";

interface IInputProps extends ComponentPropsWithRef<"input"> {
  isValid?: boolean;
  label?: string;
}

function Input(
  {
    className,
    isValid = true,
    disabled = false,
    label,
    id,
    ...props
  }: IInputProps,
  ref: Ref<HTMLInputElement>
) {
  return (
    <div className={clsx("Input", className, styles.wrapper)}>
      {label && (
        <label
          className={clsx(styles.label, {
            [styles.error]: !isValid,
          })}
          htmlFor={id}
        >
          {label}
        </label>
      )}

      <input
        ref={ref}
        className={clsx(styles.input, {
          [styles.error]: !isValid,
        })}
        id={id}
        disabled={disabled}
        {...props}
      />
    </div>
  );
}

const InputWithRef = forwardRef(Input);

export { InputWithRef as Input };
