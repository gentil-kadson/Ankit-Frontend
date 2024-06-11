import { ReactElement } from "react";
import styled from "styled-components";

type SimpleInputProps = {
  symbol: ReactElement;
  label: string;
  type: "text" | "password";
  id: string;
  name: string;
};

export default function SimpleInput({
  symbol,
  type,
  label,
  id,
  name,
}: SimpleInputProps) {
  return (
    <InputWrapper>
      <label htmlFor={name}>
        {symbol} {label}
      </label>
      <input type={type} name={name} id={id} />
    </InputWrapper>
  );
}

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--blue);

    font-weight: bold;
  }

  input {
    border-radius: 0.625rem;
    width: 26.375rem;
    height: 2.875rem;
    background: var(--component);
    padding: 0.725rem;

    &:focus {
      outline: none;
    }
  }
`;
