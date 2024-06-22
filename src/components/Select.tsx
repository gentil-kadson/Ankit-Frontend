import React from "react";
import styled from "styled-components";

type Props = {
  children: React.ReactNode;
};

export default function Select({ children, ...props }: Props) {
  return <SelectInput {...props}>{children}</SelectInput>;
}

const SelectInput = styled.select`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.375rem;

  appearance: none;
  background-image: url("selectArrow.svg");
  background-repeat: no-repeat;
  background-position: right 0.7rem top 50%;
  background-size: 1.5rem auto;
`;
