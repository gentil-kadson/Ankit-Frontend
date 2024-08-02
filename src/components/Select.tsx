import React from "react";
import styled from "styled-components";

type Props = {
  children: React.ReactNode;
  name?: string;
  id?: string;
  required?: boolean;
  onChange?: (event?: any) => void;
  value?: string;
  width?: string;
};

export default function Select({ children, ...props }: Props) {
  return <SelectInput {...props}>{children}</SelectInput>;
}

const SelectInput = styled.select<{ width?: string }>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.375rem;

  width: ${(props) => (props.width ? props.width : "26.375rem")};

  appearance: none;
  background-image: url("selectArrow.svg");
  background-repeat: no-repeat;
  background-position: right 0.7rem top 50%;
  background-size: 1.5rem auto;

  @media (max-width: 432px) {
    width: 100%;
  }
`;
