import { ButtonHTMLAttributes } from "react";

export default function Button({ children, ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      style={{
        backgroundColor: "#333",
        color: "#fff",
        padding: "10px 16px",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        width: "100%",
        marginTop: "10px",
      }}
    >
      {children}
    </button>
  );
}
