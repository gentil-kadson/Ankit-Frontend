import styled from "styled-components";
import { downloadFile } from "@/utils/utilityFunctions";

import { MaterialSymbol } from "react-material-symbols";
import StudySessionInfo from "./StudySessionInfo";
import StudySessionActionButton from "./StudySessionActionButton";

type StudySession = {
  id: number;
  name: string;
  duration_in_minutes: string;
  language: { name: string; id: number };
  cards_added: number;
  csv_file: string | null;
};

type Props = {
  session: StudySession;
  onDeleteClick: (id: number) => void;
};

export default function StudySessionCard({ session, onDeleteClick }: Props) {
  const hasCSV = session.csv_file ? true : false;

  return (
    <Container $csv_path={hasCSV}>
      <div className="card-title">
        <MaterialSymbol icon="dictionary" size={24} />
        <h3>{session.name}</h3>
      </div>
      <div className="study-session-data-actions">
        <div className="study-session-info">
          <StudySessionInfo
            text={`${session.duration_in_minutes} min`}
            icon={<MaterialSymbol icon="alarm" size={24} />}
          />
          <StudySessionInfo
            text={session.language.name}
            icon={<MaterialSymbol icon="translate" size={24} />}
          />
          <StudySessionInfo
            text={`${session.cards_added} cards`}
            icon={<MaterialSymbol icon="content_copy" size={24} />}
          />
        </div>
        <div className="action-buttons">
          {session.csv_file && (
            <StudySessionActionButton
              disabled={!hasCSV}
              onClick={() => downloadFile(session.csv_file as string)}
              icon="csv"
            />
          )}

          <StudySessionActionButton
            onClick={async () => onDeleteClick(session.id)}
            icon="delete"
          />
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div<{ $csv_path: boolean }>`
  border-radius: 1rem;

  width: 24.96rem;
  height: 18.8125rem;

  filter: brightness(${(props) => (props.$csv_path ? 0.75 : 1)});

  &:hover {
    cursor: ${(props) => (props.$csv_path ? "not-allowed" : "pointer")};
  }

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
