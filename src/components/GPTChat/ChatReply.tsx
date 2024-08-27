import styled from "styled-components";

type Props = {
  frontPhrase: string;
  backPhrase: string;
};

export default function ChatReply({ frontPhrase, backPhrase }: Props) {
  return (
    <Container>
      <p>{frontPhrase}</p>
      <p>{backPhrase}</p>
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1.125rem;

  padding: 1.5rem;
  background: var(--darker-component);
  border-radius: 0.875rem;

  width: 100%;

  h1 {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--blue);
  }

  p {
    font-size: 1.25rem;
    font-weight: normal;
  }
`;
