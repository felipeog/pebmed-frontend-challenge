import { ITooltip, Tooltip as ReactTooltip } from "react-tooltip";
import clsx from "clsx";

function Tooltip({ style, className, ...props }: ITooltip) {
  return (
    <ReactTooltip
      className={clsx("Tooltip", className)}
      style={{
        borderRadius: "var(--border_radius)",
        padding: "1rem",
        font: "var(--text_footnote)",
        maxWidth: "12rem",
        ...style,
      }}
      {...props}
    />
  );
}

export { Tooltip };
