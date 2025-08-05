import React, { forwardRef } from "react";
import styles from "./Input.module.scss";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, Props>(({ label, error, ...rest }, ref) => {
  return (
    <div className={styles.inputWrapper}>
      <label>{label}</label>
      <input ref={ref} {...rest} />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
});

export default Input;
