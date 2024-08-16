import styled from "styled-components";
import StudySessionRoomService from "@/services/StudySessionRoomService";
import StudySessionService from "@/services/StudySessionService";
import { ChangeEvent, FormEvent, useState } from "react";
import Router from "next/router";

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

type Message = {
  type: "success" | "error";
  message: string;
};

import Navbar from "@/components/Navbar";
import ChatContainer from "@/components/GPTChat/ChatContainer";
import ChatReply from "@/components/GPTChat/ChatReply";
import UpperPart from "@/components/studySessionOnlyComponents/UpperPart";
import LowerPart from "@/components/studySessionOnlyComponents/LowerPart";
import FinishStudySessionModal from "@/components/modals/FinishStudySessionModal";

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);

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

  async function handleFinishStudySession(
    handleMessage: (msgObj: Message) => void
  ) {
    await studySessionRoomService
      .finishStudySession()
      .then((successResponse) => {
        handleMessage({
          message: "Sessão encerrada com sucesso",
          type: "success",
        });
        setTimeout(() => {
          Router.push("/");
        }, 3000);
      });
  }

  function handleStayInStudySession() {
    setShowModal(false);
  }

  function handleShowModal() {
    setShowModal(true);
  }

  async function handleVocabularyBuilding(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    const { cards } = await studySessionRoomService.getVocabulary({
      name: formData.name,
      card_type: formData.card_type,
      language: formData.language,
      topic: formData.topic,
    });

    if (cards) {
      setCards((prevCards) => {
        return [...prevCards, ...cards];
      });
      setFormData((prevForm) => {
        return { ...prevForm, name: "" };
      });

      setIsLoading(false);
    } else {
      setShowErrorMessage(true);
      setTimeout(() => {
        setShowErrorMessage(false);
      }, 3000);
    }
  }

  return (
    <>
      {showModal && (
        <FinishStudySessionModal
          onCancelButtonClick={handleStayInStudySession}
          onFinishStudySession={handleFinishStudySession}
        />
      )}
      <Navbar />
      <Main>
        {showErrorMessage && (
          <ErrorParagraph className="error-message">
            Ocorreu um erro ao tentar resgatar o vocabulário. Por favor, tente
            novamente
          </ErrorParagraph>
        )}
        <ChatContainer>
          {cards.map((card) => (
            <ChatReply
              key={card.front}
              frontPhrase={card.front}
              backPhrase={card.back}
            />
          ))}
        </ChatContainer>
        <form method="post" onSubmit={(e) => handleVocabularyBuilding(e)}>
          <UpperPart
            isLoading={isLoading}
            textName={formData.name}
            handleChangeName={handleChangeName}
            handleChangeToTopic={handleChangeToTopic}
            handleChangeToWord={handleChangeToWord}
            isTopic={formData.topic}
          />
          <LowerPart
            handleShowSessionEndModal={handleShowModal}
            handleCardLevelChange={handleCardLevelChange}
          />
        </form>
      </Main>
    </>
  );
}

const ErrorParagraph = styled.p`
  font-size: 1.2rem;

  margin: auto;
  padding: 1rem;
  background-color: var(--red);
  border-radius: 0.5rem;
`;

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
