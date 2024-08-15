import styled from "styled-components";
import StudySessionRoomService from "@/services/StudySessionRoomService";
import StudySessionService from "@/services/StudySessionService";
import { ChangeEvent, useState } from "react";

import type {
  InferGetServerSidePropsType,
  GetServerSideProps,
  GetServerSidePropsContext,
} from "next";
type FormData = {
  language: number;
  name: string;
  topic: boolean;
  card_type: "basic" | "intermediate" | "advanced";
};
type Cookie = {
  accessToken: string;
  refreshToken: string;
};
type ResponseCard = {
  front: string;
  back: string;
};

import Navbar from "@/components/Navbar";
import ChatContainer from "@/components/GPTChat/ChatContainer";
import ChatReply from "@/components/GPTChat/ChatReply";
import UpperPart from "@/components/studySessionOnlyComponents/UpperPart";
import LowerPart from "@/components/studySessionOnlyComponents/LowerPart";

export const getServerSideProps = (async (ctx: GetServerSidePropsContext) => {
  const cookies = ctx.req.cookies.accessToken;

  if (cookies && ctx.params) {
    const cookies = ctx.req.cookies as Cookie;
    const id = Number(ctx.params.id);

    const studySessionService = new StudySessionService(cookies.accessToken);
    const languageId = await studySessionService.getStudySessionLanguageId(id);
    return {
      props: {
        cookie: cookies,
        sessionId: id,
        languageId,
      },
    };
  }

  return {
    redirect: {
      permanent: false,
      destination: "/login",
    },
  };
}) satisfies GetServerSideProps<{
  cookie: Cookie;
  sessionId: number;
  languageId: number;
}>;

export default function StudySession({
  cookie,
  sessionId,
  languageId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const studySessionRoomService = new StudySessionRoomService(
    cookie.accessToken,
    sessionId
  );

  const [cards, setCards] = useState<ResponseCard[]>([]);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    topic: false,
    language: languageId,
    card_type: "basic",
  });

  function handleChangeName(e: ChangeEvent<HTMLInputElement>) {
    setFormData((prevForm) => {
      return { ...prevForm, name: e.target.value };
    });
  }

  function handleChangeToTopic() {
    setFormData((prevForm) => {
      return { ...prevForm, topic: true };
    });
  }

  function handleChangeToWord() {
    setFormData((prevForm) => {
      return { ...prevForm, topic: false };
    });
  }

  function handleCardLevelChange(
    cardLevel: "basic" | "intermediate" | "advanced"
  ) {
    setFormData((prevForm) => {
      return { ...prevForm, card_type: cardLevel };
    });
  }

  return (
    <>
      <Navbar />
      <Main>
        <ChatContainer>
          {cards.map((card) => (
            <ChatReply
              key={card.front}
              frontPhrase={card.front}
              backPhrase={card.back}
              term={formData.name}
            />
          ))}
        </ChatContainer>
        <form method="POST">
          <UpperPart
            handleChangeName={handleChangeName}
            handleChangeToTopic={handleChangeToTopic}
            handleChangeToWord={handleChangeToWord}
          />
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
