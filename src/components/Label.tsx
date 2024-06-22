import React from "react";
import styled from "styled-components";
import { MaterialSymbol, SymbolCodepoints } from "react-material-symbols";

type Props = {
  children: React.ReactNode;
  symbolIcon: SymbolCodepoints;
};

export default function Label({ children, symbolIcon }: Props) {
  return (
    <CustomLabel>
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
