import styled from "styled-components";

import Title from "@/components/Title";
import StudySessionCard from "@/components/studySessionCard/StudySessionCard";
import SearchInput from "@/components/SearchInput";
import ShowMoreButton from "@/components/ShowMoreButton";

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
      </div>
      <ShowMoreButton />
    </Main>
  );
}

const Main = styled.main`
  max-width: 1240px;
  margin: auto;
  border: 1px solid white;
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
`;

const StartStudySession = styled.button`
  width: 4.0625rem;
  border-radius: 1rem;
  border: none;
  padding: 1rem;
`;
