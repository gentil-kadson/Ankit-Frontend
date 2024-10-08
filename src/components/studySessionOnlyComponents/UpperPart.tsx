import styled from "styled-components";
import { useState } from "react";

import { ChangeEvent } from "react";

import Button from "../Button";
import { MaterialSymbol } from "react-material-symbols";
import StudySessionButton from "./StudySessionButton";

type Props = {
  handleChangeName: (e: ChangeEvent<HTMLInputElement>) => void;
  handleChangeToTopic: () => void;
  handleChangeToWord: () => void;
  isTopic: boolean;
  textName: string;
  isLoading: boolean;
};

export default function UpperPart({
  handleChangeName,
  handleChangeToTopic,
  handleChangeToWord,
  isTopic,
  isLoading,
  textName,
}: Props) {
  return (
    <Container>
      <div className="left-side">
        <input
          onChange={(e) => handleChangeName(e)}
          type="text"
          name="word-topic"
          id="word-topic"
          required
          value={textName}
        />
        <Button width="3.75rem">
          {isLoading ? (
            <MaterialSymbol icon="schedule" color="var(--white)" size={30} />
          ) : (
            <MaterialSymbol
              icon="arrow_upward"
              color="var(--white)"
              size={30}
            />
          )}
        </Button>
      </div>
      <div className="right-side">
        <StudySessionButton
          onClick={handleChangeToTopic}
          $black={!isTopic}
          width="9.25rem"
        >
          <MaterialSymbol icon="topic" size={35} color="var(--white)" />
          Tópico
        </StudySessionButton>
        <StudySessionButton
          onClick={handleChangeToWord}
          width="9.25rem"
          $black={isTopic}
        >
          <MaterialSymbol icon="dictionary" size={35} color="var(--white)" />
          Palavra
        </StudySessionButton>
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;

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

    .left-side {
      gap: 1rem;
      flex-direction: column;
    }

    .right-side {
      button {
        width: 100%;
      }
    }
  }
`;
