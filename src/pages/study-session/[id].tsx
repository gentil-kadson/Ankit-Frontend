import styled from "styled-components";
import StudySessionRoomService from "@/services/StudySessionRoomService";
import StudySessionService from "@/services/StudySessionService";
import { ChangeEvent, FormEvent, useState } from "react";
import Router from "next/router";
import { downloadFile } from "@/utils/utilityFunctions";

import Head from "next/head";

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

type StudySessionErrorMessage = {
  message: string;
  show: boolean;
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
    const name = await studySessionService.getStudySessionName(id);

    return {
      props: {
        cookie: cookies,
        sessionId: id,
        languageId,
        name,
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
  name: string;
}>;

export default function StudySession({
  cookie,
  sessionId,
  languageId,
  name,
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
  const [errorMessage, setErrorMessage] = useState<StudySessionErrorMessage>({
    show: false,
    message: "",
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

  async function handleFinishStudySession(
    handleMessage: (msgObj: Message) => void
  ) {
    if (cards.length > 0) {
      await studySessionRoomService
        .finishStudySession(cards)
        .then((response) => {
          if (response.status === 200) {
            handleMessage({
              message: "Sessão encerrada com sucesso",
              type: "success",
            });
            downloadFile(
              process.env.NEXT_PUBLIC_CSV_FILE_DOWNLOAD_BASE_URL +
                response.data.csv_file
            );
            setTimeout(() => {
              Router.push("/");
            }, 3000);
          } else {
            setErrorMessage({
              show: true,
              message:
                "Ocorreu um erro ao tentar encerrar a sessão de estudos. Por favor, tente novamente",
            });

            setTimeout(() => {
              setErrorMessage({
                show: false,
                message: "",
              });
            }, 3000);
          }
        });
    } else {
      setShowModal(false);
      setErrorMessage({
        show: true,
        message: "Não há como encerrar uma sessão sem pelo menos 1 palavra.",
      });

      setTimeout(() => {
        setErrorMessage({
          show: false,
          message: "",
        });
      }, 3000);
    }
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
    const response = await studySessionRoomService.getVocabulary({
      name: formData.name,
      card_type: formData.card_type,
      language: formData.language,
      topic: formData.topic,
    });

    if (response.status === 200) {
      setCards((prevCards) => {
        return [...prevCards, ...response.data.cards];
      });
      setFormData((prevForm) => {
        return { ...prevForm, name: "" };
      });

      setIsLoading(false);
    } else {
      setIsLoading(false);
      setErrorMessage({
        show: true,
        message:
          "Ocorreu um erro ao tentar buscar vocabulário. Por favor, tente novamente",
      });
      setTimeout(() => {
        setErrorMessage({
          show: false,
          message: "",
        });
      }, 3000);
    }
  }

  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>
      {showModal && (
        <FinishStudySessionModal
          onCancelButtonClick={handleStayInStudySession}
          onFinishStudySession={handleFinishStudySession}
        />
      )}
      <Navbar />
      <Main>
        {errorMessage.show && (
          <ErrorParagraph className="error-message">
            {errorMessage.message}
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

  @media (max-width: 432px) {
    max-width: 100%;
    width: 100%;
  }
`;
