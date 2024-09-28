import * as React from "react";
import { Input } from "@/components/ui/input";

const NumericInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = [
      "Backspace",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
      "Delete",
      ".",
    ];
    if (!allowedKeys.includes(event.key) && isNaN(Number(event.key))) {
      event.preventDefault();
    }

    // Prevent multiple decimal points
    if (event.key === "." && event.currentTarget.value.includes(".")) {
      event.preventDefault();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Allow empty string, single minus sign, or valid number
    if (!isNaN(parseFloat(value))) {
      props.onChange?.(event);
    }
  };

  return (
    <Input
      {...props}
      ref={ref}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      inputMode="numeric"
    />
  );
});

NumericInput.displayName = "NumericInput";

export default NumericInput;
