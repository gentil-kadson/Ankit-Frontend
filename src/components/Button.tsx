import React from "react";
import styled from "styled-components";

type Props = {
  width: number;
  children: React.ReactNode;
};

export default function Button({ children, width }: Props) {
  return <CustomButton width={width}>{children}</CustomButton>;
}

const CustomButton = styled.button<{ width: number }>`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: red;
  border: none;
  width: ${(props) => props.width + "rem"};
`;
