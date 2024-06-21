import React from "react";
import styled from "styled-components";

type Props = {
  width: string;
  children: React.ReactNode;
  inverted?: boolean;
  onClick?: () => {};
};

export default function Button({
  children,
  width,
  onClick,
  inverted = false,
}: Props) {
  return (
    <CustomButton
      width={width}
      inverted={inverted ? inverted : undefined}
      onClick={onClick && onClick}
    >
      {children}
    </CustomButton>
  );
}

const CustomButton = styled.button<{ width: string; inverted?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.625rem;
  padding: 12px 0px;

  font-size: 1.25rem;
  font-weight: bold;

  background-color: ${(props) => {
    return props.inverted ? "var(--background)" : "var(--blue)";
  }};
  border: ${(props) => {
    return props.inverted ? "3px solid var(--blue)" : "none";
  }};
  width: ${(props) => props.width};
  color: ${(props) => (props.inverted ? "var(--blue)" : "var(--white)")};
`;
