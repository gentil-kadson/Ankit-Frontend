import styled from "styled-components";
import { MaterialSymbol } from "react-material-symbols";
import StudySessionInfo from "./StudySessionInfo";

type Props = {
  title: string;
  studyTime: number;
  studiedLanguage: string;
  numberOfCards: number;
};

export default function StudySessionCard() {
  return (
    <Container>
      <div className="card-title">
        <MaterialSymbol icon="dictionary" size={24} />
        <h3>At The Doctor</h3>
      </div>
      <div className="study-session-data-actions">
        <div className="study-session-info">
          <StudySessionInfo
            text="10 min"
            icon={<MaterialSymbol icon="alarm" size={24} />}
          />
          <StudySessionInfo
            text="10 min"
            icon={<MaterialSymbol icon="alarm" size={24} />}
          />
          <StudySessionInfo
            text="10 min"
            icon={<MaterialSymbol icon="alarm" size={24} />}
          />
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  border: 3px solid var(--white);
  border-radius: 1rem;

  width: 25rem;
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
    background: var(--component);
    display: flex;
    flex-direction: column;
  }

  .study-session-info {
    max-width: 11.5625rem;

    display: flex;
    flex-wrap: wrap;
  }
`;
