import { ComponentPropsWithRef, forwardRef, Ref } from "react";
import clsx from "clsx";

import styles from "./index.module.css";

interface IOption {
  value: string | number;
  label: string | number;
}
interface ISelectProps extends ComponentPropsWithRef<"select"> {
  label?: string;
  options: IOption[];
  isValid?: boolean;
  isDefaultValue?: boolean;
}

function Select(
  {
    className,
    disabled = false,
    label,
    id,
    options,
    isValid = true,
    isDefaultValue = false,
    ...props
  }: ISelectProps,
  ref: Ref<HTMLSelectElement>
) {
  return (
    <div className={clsx("Select", className, styles.wrapper)}>
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

      <select
        ref={ref}
        className={clsx(styles.select, {
          [styles.error]: !isValid,
          [styles.placeholder]: isDefaultValue,
        })}
        id={id}
        disabled={disabled}
        defaultValue={""}
        {...props}
      >
        <option value="" disabled>
          Selecionar
        </option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

const SelectWithRef = forwardRef(Select);

export { SelectWithRef as Select };
