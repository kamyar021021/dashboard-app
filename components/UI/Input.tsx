import { forwardRef } from "react";

type Props = {
  label: string;
  error?: string;
  type?: string;
};

const Input = forwardRef<HTMLInputElement, Props & React.InputHTMLAttributes<HTMLInputElement>>(
  ({ label, error, type = "text", ...rest }, ref) => {
    return (
      <div style={{ marginBottom: "1rem" }}>
        <label>
          {label}
          <input
            ref={ref}
            type={type}
            {...rest}
            style={{ display: "block", padding: "8px", width: "100%", marginTop: "4px" }}
          />
        </label>
        {error && <p style={{ color: "red", marginTop: "4px" }}>{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
