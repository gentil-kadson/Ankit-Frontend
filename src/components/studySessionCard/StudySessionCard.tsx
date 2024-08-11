import styled from "styled-components";

import { MaterialSymbol } from "react-material-symbols";
import StudySessionInfo from "./StudySessionInfo";
import StudySessionActionButton from "./StudySessionActionButton";

type Props = {
  title: string;
  studyTime: string;
  studiedLanguage: string;
  numberOfCards: number;
};

export default function StudySessionCard({
  title,
  studyTime,
  studiedLanguage,
  numberOfCards,
}: Props) {
  return (
    <Container>
      <div className="card-title">
        <MaterialSymbol icon="dictionary" size={24} />
        <h3>{title}</h3>
      </div>
      <div className="study-session-data-actions">
        <div className="study-session-info">
          <StudySessionInfo
            text={`${studyTime} min`}
            icon={<MaterialSymbol icon="alarm" size={24} />}
          />
          <StudySessionInfo
            text={studiedLanguage}
            icon={<MaterialSymbol icon="translate" size={24} />}
          />
          <StudySessionInfo
            text={`${numberOfCards} cards`}
            icon={<MaterialSymbol icon="content_copy" size={24} />}
          />
        </div>
        <div className="action-buttons">
          <StudySessionActionButton onClick={() => 2 + 2} icon="csv" />
          <StudySessionActionButton onClick={() => 2 + 2} icon="delete" />
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  border-radius: 1rem;

  width: 24.96rem;
  height: 18.8125rem;

  .card-title {
    h3 {
      font-size: 1.25rem;
    }

    background: var(--blue);
    border-radius: 1rem 1rem 0rem 0rem;

    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 2.25rem 1.25rem;
    gap: 0.5rem;
  }

  .study-session-data-actions {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    background: var(--component);
    height: 12.375rem;
    border-radius: 0rem 0rem 1rem 1rem;
    padding: 1.5rem 1.25rem;
  }

  .study-session-info {
    max-width: 11.5625rem;
    row-gap: 0.75rem;
    column-gap: 0.5rem;

    display: flex;
    flex-wrap: wrap;
    padding-top: 0.6875rem;
  }

  .action-buttons {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  @media (max-width: 431px) {
    width: 100%;
  }
`;
