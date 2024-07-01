import styled from "styled-components";

type Props = {
  children?: React.ReactNode;
};

export default function ChatContainer({ children }: Props) {
  return <Container>{children}</Container>;
}

const Container = styled.div`
  max-width: 58.375rem;
  width: 100%;
  max-height: 38.0625rem;
  height: 38.0625rem;

  padding: 2.5rem;
  border: 0.25rem solid var(--blue);
  border-radius: 0.875rem;
  background: var(--component);
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;

  @media (max-width: 432px) {
    width: 100%;
  }
`;
