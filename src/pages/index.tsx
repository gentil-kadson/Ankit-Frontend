import styled from "styled-components";
import useScreenSize from "@/hooks/useScreenSize";
import { useState } from "react";
import { cookies } from "@/context/AuthContext";

import Title from "@/components/Title";
import StudySessionCard from "@/components/studySessionCard/StudySessionCard";
import ShowMoreButton from "@/components/ShowMoreButton";
import Navbar from "@/components/Navbar";
import { MaterialSymbol } from "react-material-symbols";
import HomepageFilters from "@/components/HomepageFilters";
import CreateStudySessionModal from "@/components/modals/CreateStudySessionModal";

import StudySessionService, {
  StudySession,
} from "@/services/StudySessionService";
import { StudySessionQueryParams } from "@/services/StudySessionService";
import LanguageService, { Language } from "@/services/LanguageService";

import type {
  InferGetServerSidePropsType,
  GetServerSideProps,
  GetServerSidePropsContext,
} from "next";
import { HTTP_204_NO_CONTENT } from "@/utils/constants";

export const getServerSideProps = (async (ctx: GetServerSidePropsContext) => {
  const accessToken = ctx.req.cookies.accessToken;

  if (accessToken) {
    const { name, language } = ctx.query as unknown as StudySessionQueryParams;
    const studySessionService = new StudySessionService(accessToken);
    const { data } = await studySessionService.getStudySessions({
      name,
      language,
    });

    const studySessions: StudySession[] = data;
    for (const session of studySessions) {
      session.duration_in_minutes =
        studySessionService.getDisplayDuration(session);
    }

    const languageService = new LanguageService();
    const { data: languages } = await languageService.getLanguages();

    return {
      props: { studySessions, languages },
    };
  }

  return {
    redirect: {
      permanent: false,
      destination: "/login",
    },
    props: {},
  };
}) satisfies GetServerSideProps<{
  studySessions: StudySession[];
  languages: Language[];
}>;

export default function Home({
  studySessions,
  languages,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { width } = useScreenSize();
  const [sessions, setSessions] = useState<StudySession[]>(
    studySessions as StudySession[]
  );
  const [showModal, setShowModal] = useState<boolean>(false);

  function handleCancelStudySession() {
    setShowModal(false);
  }

  function handleDeleteStudySession(id: number) {
    const accessToken = cookies.get("accessToken");
    const studySessionService = new StudySessionService(accessToken);

    studySessionService.delete(id).then((response) => {
      if (response.status === HTTP_204_NO_CONTENT) {
        setSessions((prevSessions) => {
          const updatedSessions = prevSessions.filter(
            (session) => session.id !== id
          );
          return updatedSessions;
        });
      }
    });
  }

  return (
    <>
      {showModal && (
        <CreateStudySessionModal onClick={handleCancelStudySession} />
      )}
      <Navbar />
      <Main>
        <div className="title-and-filter">
          <Title>My Study Sessions</Title>
          <HomepageFilters languages={languages} setSessions={setSessions} />
        </div>
        <div className="cards-container">
          {sessions &&
            sessions.map((studySession) => (
              <StudySessionCard
                studySessionId={studySession.id}
                key={studySession.id}
                studyTime={studySession.duration_in_minutes}
                numberOfCards={studySession.cards_added}
                studiedLanguage={studySession.language}
                title={studySession.name}
                onDeleteClick={handleDeleteStudySession}
              />
            ))}
        </div>
        <ShowMoreButton width={width} />
        <div id="sticky-buttons-container">
          <StartStudySession onClick={() => setShowModal(true)}>
            <MaterialSymbol icon="add" color="var(--white)" size={40} />
          </StartStudySession>
        </div>
      </Main>
    </>
  );
}

const Main = styled.main`
  max-width: 1240px;
  margin: auto;
  padding-top: 4.75rem;
  padding-bottom: 4rem;

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
    bottom: 0.625rem;
  }

  @media (max-width: 432px) {
    .title-and-filter {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }

    /* .filters-container,
    .language-filter-container {
      flex-direction: column;
      width: 100%;
    } */

    select {
      width: 100%;
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
