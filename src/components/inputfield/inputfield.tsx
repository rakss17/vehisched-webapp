import { ChangeEvent, FC, InputHTMLAttributes, useState } from "react";
import "./inputfield.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  error?: boolean;
  adjustWidth?: boolean;
  label?: string;
  icon?: IconProp;
}

const InputField: FC<InputFieldProps> = ({
  className,
  error,
  value: inputValue,
  onChange,
  placeholder,
  type,
  onInput,
  onKeyDown,
  adjustWidth,
  label,
  icon,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    onChange?.(event);
    event.target.placeholder = value ? "" : placeholder || "";
  };

  const inputClass = `inputfield ${className || ""} ${
    adjustWidth ? "adjusted" : ""
  }`;

  return (
    <div className="inputfieldd">
      <label
        className={
          isFocused || inputValue ? "input-label input-focused" : "input-label"
        }
      >
        {icon && <FontAwesomeIcon icon={icon} className="icon" />}
        {label}
      </label>
      <input
        className={inputClass}
        style={{ borderColor: error ? "red" : "" }}
        value={inputValue || ""}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        type={type}
        onInput={onInput}
        onKeyDown={onKeyDown}
        placeholder={!isFocused && inputValue === "" ? placeholder || "" : ""}
      />
    </div>
  );
};

export default InputField;
