import React from "react";
import styled from "styled-components";

type Props = {
  children: React.ReactNode;
};

export default function Title({ children }: Props) {
  return <CustomTitle>{children}</CustomTitle>;
}

const CustomTitle = styled.h1`
  text-align: left;
  width: fit-content;
  color: var(--white);
  font-size: 2rem;
`;
