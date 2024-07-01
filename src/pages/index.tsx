import styled from "styled-components";

import Title from "@/components/Title";
import StudySessionCard from "@/components/studySessionCard/StudySessionCard";
import SearchInput from "@/components/SearchInput";

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
          studiedLanguage="English"
          studyTime={10}
          title="The Whale"
        />
        <StudySessionCard
          numberOfCards={10}
          studiedLanguage="English"
          studyTime={10}
          title="The Whale"
        />
        <StudySessionCard
          numberOfCards={10}
          studiedLanguage="English"
          studyTime={10}
          title="The Whale"
        />
        <StudySessionCard
          numberOfCards={10}
          studiedLanguage="English"
          studyTime={10}
          title="The Whale"
        />
      </div>
    </Main>
  );
}

const Main = styled.main`
  max-width: 1240px;
  margin: auto;
  border: 1px solid white;

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
