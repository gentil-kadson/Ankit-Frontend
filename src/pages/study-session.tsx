import styled from "styled-components";

import ChatContainer from "@/components/GPTChat/ChatContainer";
import FormGroup from "@/components/FormGroup";
import Label from "@/components/Label";
import Button from "@/components/Button";
import SSButton from "@/components/studySessionOnlyComponents/SSButton";
import { MaterialSymbol } from "react-material-symbols";
import Radio from "@/components/Radio";

export default function StudySession() {
  return (
    <Main>
      <ChatContainer>
        <></>
      </ChatContainer>
      <form method="POST">
        <div className="upper-part">
          <div className="left-side">
            <input type="text" name="word-topic" id="word-topic" />
            <Button width="3.75rem">
              <MaterialSymbol
                icon="arrow_upward"
                color="var(--white)"
                size={30}
              />
            </Button>
          </div>
          <div className="right-side">
            <SSButton width="9.25rem">
              <MaterialSymbol icon="topic" size={35} color="var(--white)" />
              Tópico
            </SSButton>
            <SSButton width="9.25rem" $black>
              <MaterialSymbol
                icon="dictionary"
                size={35}
                color="var(--white)"
              />
              Palavra
            </SSButton>
          </div>
        </div>
        <div className="lower-part">
          <section id="card-levels">
            <h2>Nível de Card</h2>
            <div className="radios-container">
              <Radio id="basic" labelText="Basic" name="basic" />
              <Radio
                id="intermediate"
                labelText="Intermediário"
                name="intermediate"
              />
              <Radio id="advanced" labelText="Avançado" name="advanced" />
            </div>
          </section>
          <SSButton width="11.375rem">
            <MaterialSymbol icon="download" size={35} color="var(--white)" />
            Vocabulário
          </SSButton>
        </div>
      </form>
    </Main>
  );
}

const Main = styled.main`
  max-width: 58.375rem;
  margin: auto;
  padding-top: 4.75rem;

  &,
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  justify-content: flex-start;
  align-items: center;

  form {
    width: 100%;

    .upper-part {
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
    }

    .lower-part {
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
    }
  }

  @media (max-width: 432px) {
    .upper-part,
    .left-side,
    .right-side,
    .lower-part {
      flex-direction: column;
    }

    .upper-part {
      gap: 1.5rem;
    }

    .left-side {
      gap: 1rem;
    }

    .right-side {
      button {
        width: 100%;
      }
    }

    form {
      .lower-part {
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
    }
  }
`;
