import styled from "styled-components";
import { ReactElement } from "react";

type Props = {
  icon: ReactElement;
  text: string;
};

export default function StudySessionInfo({ icon, text }: Props) {
  return (
    <Info>
      {icon}
      {text}
    </Info>
  );
}

const Info = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  font-size: 0.875rem;
  font-weight: bold;
`;
