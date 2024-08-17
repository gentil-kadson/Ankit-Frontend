import styled from "styled-components";
import StatisticsService from "@/services/StatisticsService";
import { useState, useContext } from "react";
import AuthContext from "@/context/AuthContext";

import { MaterialSymbol } from "react-material-symbols";
import Navbar from "@/components/Navbar";
import Button from "@/components/Button";
import FormGroup from "@/components/FormGroup";
import Select from "@/components/Select";
import LanguageStatisticsSection from "@/components/statistics/LanguageStatisticsSection";
import StreakHoursSection from "@/components/statistics/StreakHoursSection";

import type {
  InferGetServerSidePropsType,
  GetServerSideProps,
  GetServerSidePropsContext,
} from "next";
import {
  StudySessionStats,
  CardsAddedStats,
} from "@/services/StatisticsService";
import { User } from "@/services/UserService";
import { Student } from "@/services/StudentService";

export const getServerSideProps = (async (ctx: GetServerSidePropsContext) => {
  const token = ctx.req.cookies.accessToken;
  if (token) {
    const statsService = new StatisticsService(token);
    const cardsAddedResponse = await statsService.getCardsAddedByLanguage();
    const studySessionsResponse =
      await statsService.getStudySessionsByLanguage();
    const cardsAddedStats: CardsAddedStats[] = [];
    const studySessionStats: StudySessionStats[] = [];

    if (cardsAddedResponse.status === 200) {
      cardsAddedStats.push(...cardsAddedResponse.data);
    }

    if (studySessionsResponse.status === 200) {
      studySessionStats.push(...studySessionsResponse.data);
    }

    return {
      props: {
        studySessionStats,
        cardsAddedStats,
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
  studySessionStats: StudySessionStats[];
  cardsAddedStats: CardsAddedStats[];
}>;

export default function Statistics({
  cardsAddedStats,
  studySessionStats,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [cards, setCards] = useState<CardsAddedStats[]>(cardsAddedStats);
  const [studySessions, setStudySessions] =
    useState<StudySessionStats[]>(studySessionStats);

  const { user } = useContext(AuthContext);

  return (
    <>
      <Navbar />
      <Main>
        <Header>
          <h2>Statistics</h2>
          <form method="get">
            <FormGroup>
              <Select>
                <option value="">Neste mês</option>
                <option value="">Últimos 6 meses</option>
                <option value="">Ano passado</option>
                <option value="">Nenhum</option>
              </Select>
            </FormGroup>
            <Button width="125px">
              <MaterialSymbol icon="filter_list" size={30} />
              Filtrar
            </Button>
          </form>
        </Header>
        {user && <StreakHoursSection user={user} />}
        <LanguageStatisticsSection
          cardsAddedPerLanguage={cards}
          studySessionsPerLanguage={studySessions}
        />
      </Main>
    </>
  );
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 3.125rem;
  max-width: 77.5rem;
  margin: auto;
  padding-top: 4.75rem;
  padding-bottom: 4rem;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;

  @media (max-width: 875px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  form {
    display: flex;
    align-items: center;
    gap: 1rem;

    @media (max-width: 875px) {
      flex-direction: column;
    }
  }
`;
