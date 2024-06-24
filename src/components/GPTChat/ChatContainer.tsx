import styled from "styled-components";

export default function ChatContainer() {
  return <Container>Hello word</Container>;
}

const Container = styled.div`
  max-width: 58.375rem;
  max-height: 38.0625rem;
  height: 38.0625rem;

  padding: 2.5rem;
  border: 0.25rem solid var(--blue);
  border-radius: 0.875rem;
  background: var(--component);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  @media (max-width: 432px) {
    width: 100%;
  }
`;
