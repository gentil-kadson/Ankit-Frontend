import React from "react";
import styled from "styled-components";

type Props = {
  children: React.ReactNode;
};

export default function FormGroup({ children }: Props) {
  return <InputGroup>{children}</InputGroup>;
}

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;
