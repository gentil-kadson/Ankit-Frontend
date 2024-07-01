import styled from "styled-components";
import Button from "../Button";
import { MaterialSymbol } from "react-material-symbols";
import SSButton from "./SSButton";

export default function UpperPart() {
  return (
    <Container className="upper-part">
      <div className="left-side">
        <input type="text" name="word-topic" id="word-topic" />
        <Button width="3.75rem">
          <MaterialSymbol icon="arrow_upward" color="var(--white)" size={30} />
        </Button>
      </div>
      <div className="right-side">
        <SSButton width="9.25rem">
          <MaterialSymbol icon="topic" size={35} color="var(--white)" />
          Tópico
        </SSButton>
        <SSButton width="9.25rem" $black>
          <MaterialSymbol icon="dictionary" size={35} color="var(--white)" />
          Palavra
        </SSButton>
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  .left-side,
  .right-side {
    display: flex;
  }

  .left-side {
    gap: 0.75rem;
  }

  .right-side {
    gap: 1rem;
  }

  @media (max-width: 431px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;
