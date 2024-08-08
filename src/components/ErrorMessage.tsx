import styled from "styled-components";

type Props = {
  children: React.ReactNode;
};

export default function ErrorMessage({ children }: Props) {
  return <Message>{children}</Message>;
}

const Message = styled.p`
  font-size: 16px;
  background-color: var(--red);
  border-radius: 10px;
  padding: 10px;
`;
