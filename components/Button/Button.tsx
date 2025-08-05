import React from "react";
import styles from "./Button.module.scss";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = ({ children, ...rest }: Props) => {
  return <button className={styles.button} {...rest}>{children}</button>;
};

export default Button;
