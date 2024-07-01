import React from "react";
import styled from "styled-components";

type Props = {
  width: string;
  children: React.ReactNode;
  onClick?: () => void;
  $inverted?: boolean;
  className?: string;
  id?: string;
  $htmlType?: string;
  form?: string;
  height?: string;
};

export default function Button({ children, width, onClick, ...props }: Props) {
  return (
    <CustomButton width={width} {...props} onClick={onClick && onClick}>
      {children}
    </CustomButton>
  );
}

const CustomButton = styled.button<{
  width: string;
  height?: string;
  $inverted?: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.625rem;
  padding: 12px 0px;

  font-size: 1.25rem;
  font-weight: bold;

  background-color: ${(props) => {
    return props.$inverted ? "var(--background)" : "var(--blue)";
  }};
  border: ${(props) => {
    return props.$inverted ? "3px solid var(--blue)" : "none";
  }};
  width: ${(props) => props.width};
  height: ${(props) => (props.height ? props.height : "auto")};
  color: ${(props) => (props.$inverted ? "var(--blue)" : "var(--white)")};

  @media (max-width: 431px) {
    width: 100%;
  }
`;
