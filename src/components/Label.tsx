import React from "react";
import styled from "styled-components";
import { MaterialSymbol, SymbolCodepoints } from "react-material-symbols";

type Props = {
  children: React.ReactNode;
  symbolIcon: SymbolCodepoints;
  inputId: string;
};

export default function Label({ children, symbolIcon, inputId }: Props) {
  return (
    <CustomLabel htmlFor={inputId}>
      <MaterialSymbol
        size={24}
        icon={symbolIcon}
        color="var(--blue)"
        weight={900}
      />
      {children}
    </CustomLabel>
  );
}

const CustomLabel = styled.label`
  display: flex;
  align-items: center;
  max-width: 18rem;
  gap: 0.5rem;
  color: var(--blue);
  font-weight: bold;
`;
