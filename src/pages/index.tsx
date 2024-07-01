import styled from "styled-components";

import Title from "@/components/Title";
import StudySessionCard from "@/components/studySessionCard/StudySessionCard";
import SearchInput from "@/components/SearchInput";
import ShowMoreButton from "@/components/ShowMoreButton";
import { MaterialSymbol } from "react-material-symbols";

export default function Home() {
  return (
    <Main>
      <div className="title-and-filter">
        <Title>My Study Sessions</Title>
        <SearchInput />
      </div>
      <div className="cards-container">
        <StudySessionCard
          numberOfCards={10}
          studiedLanguage="Inglês"
          studyTime={10}
          title="The Whale"
        />
        <StudySessionCard
          numberOfCards={10}
          studiedLanguage="Inglês"
          studyTime={10}
          title="The Whale"
        />
        <StudySessionCard
          numberOfCards={10}
          studiedLanguage="Inglês"
          studyTime={10}
          title="The Whale"
        />
        <StudySessionCard
          numberOfCards={10}
          studiedLanguage="Inglês"
          studyTime={10}
          title="The Whale"
        />
        <StudySessionCard
          numberOfCards={10}
          studiedLanguage="Inglês"
          studyTime={10}
          title="The Whale"
        />
        <StudySessionCard
          numberOfCards={10}
          studiedLanguage="Inglês"
          studyTime={10}
          title="The Whale"
        />
        <StudySessionCard
          numberOfCards={10}
          studiedLanguage="Inglês"
          studyTime={10}
          title="The Whale"
        />
        <StudySessionCard
          numberOfCards={10}
          studiedLanguage="Inglês"
          studyTime={10}
          title="The Whale"
        />
        <StudySessionCard
          numberOfCards={10}
          studiedLanguage="Inglês"
          studyTime={10}
          title="The Whale"
        />
      </div>
      <div id="sticky-buttons-container">
        <StartStudySession>
          <MaterialSymbol icon="add" color="var(--white)" size={40} />
        </StartStudySession>
        <ShowMoreButton />
      </div>
    </Main>
  );
}

const Main = styled.main`
  max-width: 1240px;
  margin: auto;
  padding-top: 4.75rem;

  display: flex;
  flex-direction: column;
  gap: 2rem;

  .title-and-filter {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .cards-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    column-gap: 1.25rem;
    row-gap: 1rem;
  }

  #sticky-buttons-container {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;

    position: sticky;
    bottom: 0;
  }

  @media (max-width: 432px) {
    .title-and-filter {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }
  }
`;

const StartStudySession = styled.button`
  width: 4.0625rem;
  padding: 0.875rem;

  border-radius: 1rem;
  border: none;
  background: var(--blue);
  -webkit-box-shadow: 0px 10px 19px -1px rgba(0, 0, 0, 0.34);
  -moz-box-shadow: 0px 10px 19px -1px rgba(0, 0, 0, 0.34);
  box-shadow: 0px 10px 19px -1px rgba(0, 0, 0, 0.34);

  display: flex;
  justify-content: center;
  align-items: center;
`;
