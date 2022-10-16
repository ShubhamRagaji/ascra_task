import React from "react";
import "./input.scss";
import visibility from "../../Assests/visibility.png";
import invisibility from "../../Assests/invisibility.png";

export default function Input({
  name,
  type,
  value,
  onChange,
  onBlur,
  style,
  autoFocus,
  error,
  errorMsg,
  onFocus,
  maxLength,
  disabled,
  onKeyPress,
  placeholder,
  onVisibilityClick,
  password,
}) {
  return (
    <div className="user_input">
      <p className="name">{name}</p>
      <div className="main_input">
        {password && (
          <img
            src={type === "password" ? invisibility : visibility}
            alt=""
            className="visibility"
            onClick={onVisibilityClick}
          />
        )}
        <input
          autoFocus={autoFocus}
          type={type ? type : "text"}
          className={error ? "common_inputs onError" : "common_inputs"}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          onFocus={onFocus}
          style={style}
          maxLength={maxLength}
          disabled={disabled}
          onKeyPress={onKeyPress}
        />
        {error && <p className="error_msg fadeIn">{errorMsg}</p>}
      </div>
    </div>
  );
}
