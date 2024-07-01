import styled from "styled-components";

import Radio from "../Radio";
import StudySessionButton from "./StudySessionButton";
import { MaterialSymbol } from "react-material-symbols";

export default function LowerPart() {
  return (
    <Container>
      <section id="card-levels">
        <h2>Nível de Card</h2>
        <div className="radios-container">
          <Radio id="basic" labelText="Basic" name="card-level-radio" />
          <Radio
            id="intermediate"
            labelText="Intermediário"
            name="card-level-radio"
          />
          <Radio id="advanced" labelText="Avançado" name="card-level-radio" />
        </div>
      </section>
      <StudySessionButton width="11.375rem">
        <MaterialSymbol icon="download" size={35} color="var(--white)" />
        Vocabulário
      </StudySessionButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  #card-levels {
    background: var(--component);
    max-width: 466px;
    width: 100%;
    padding: 1.25rem;

    border-radius: 10px;

    h2 {
      font-size: 1.25rem;
      font-weight: bold;
    }

    .radios-container {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 1rem;
      padding-top: 1.5rem;
    }
  }

  @media (max-width: 432px) {
    flex-direction: column;
    gap: 1rem;

    #card-levels {
      display: flex;
      flex-direction: column;
      align-items: center;

      .radios-container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
    }

    button {
      width: 100%;
    }
  }
`;
