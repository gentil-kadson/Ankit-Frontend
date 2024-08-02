import styled from "styled-components";

import Navbar from "@/components/Navbar";
import ChatContainer from "@/components/GPTChat/ChatContainer";
import UpperPart from "@/components/studySessionOnlyComponents/UpperPart";
import LowerPart from "@/components/studySessionOnlyComponents/LowerPart";

export default function StudySession() {
  return (
    <>
      <Navbar />
      <Main>
        <ChatContainer>
          <></>
        </ChatContainer>
        <form method="POST">
          <UpperPart />
          <LowerPart />
        </form>
      </Main>
    </>
  );
}

const Main = styled.main`
  max-width: 58.375rem;
  margin: auto;
  padding-top: 4.75rem;
  padding-bottom: 4rem;

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
  }
`;
