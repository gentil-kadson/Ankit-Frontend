import styled from "styled-components";
import StatisticsService from "@/services/StatisticsService";
import { useState, useContext, FormEvent, useRef } from "react";
import AuthContext from "@/context/AuthContext";
import { prepareFiltersDate } from "@/utils/utilityFunctions";

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
type Message = {
  type: "error" | "filter";
  message: string;
  show: boolean;
};

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
        accessToken: ctx.req.cookies.accessToken as string,
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
  accessToken: string;
}>;

export default function Statistics({
  cardsAddedStats,
  studySessionStats,
  accessToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [cards, setCards] = useState<CardsAddedStats[]>(cardsAddedStats);
  const [studySessions, setStudySessions] =
    useState<StudySessionStats[]>(studySessionStats);
  const [message, setMessage] = useState<Message>({
    type: "error",
    message: "",
    show: false,
  });

  const filtersFormRef = useRef<HTMLFormElement>(null);

  const statisticsService = new StatisticsService(accessToken);

  const { user } = useContext(AuthContext);
  const { dateBefore, dateAfter } = prepareFiltersDate();

  const handleFilters = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("data atual: ", dateBefore);

    const filterDate = filtersFormRef.current?.history_date_after.value;
    console.log("data depois: ", filterDate);

    const cardsAddedResponse = await statisticsService.getCardsAddedByLanguage(
      dateBefore,
      filterDate
    );
    const studySessionsResponse =
      await statisticsService.getStudySessionsByLanguage(
        dateBefore,
        filterDate
      );

    if (
      cardsAddedResponse.status === 200 &&
      studySessionsResponse.status === 200
    ) {
      setCards(cardsAddedResponse.data);
      setStudySessions(studySessionsResponse.data);

      console.log("cards:", cardsAddedResponse.data);

      const successFilterMessage = filterDate
        ? "Filtro aplicado com sucesso."
        : "Filtros removidos.";

      setMessage({
        type: "filter",
        message: successFilterMessage,
        show: true,
      });

      setTimeout(() => {
        setMessage({
          message: "",
          show: false,
          type: "error",
        });
      }, 3000);
    } else {
      setMessage({
        type: "error",
        message:
          "Não foi possível aplicar o filtro. Por favor, tente novamente",
        show: true,
      });

      setTimeout(() => {
        setMessage({
          message: "",
          show: false,
          type: "error",
        });
      }, 3000);
    }
  };

  return (
    <>
      <Navbar />
      <Main>
        <Header>
          <h2>Estatísticas</h2>
          <form
            ref={filtersFormRef}
            method="get"
            onSubmit={(e) => handleFilters(e)}
          >
            <FormGroup>
              <Select name="history_date_after">
                <option value="">Nenhum</option>
                <option value={dateAfter.oneMonthAgo}>Neste mês</option>
                <option value={dateAfter.sixMonthsAgo}>Últimos 6 meses</option>
                <option value={dateAfter.oneYearAgo}>Ano passado</option>
              </Select>
            </FormGroup>
            <Button width="125px">
              <MaterialSymbol icon="filter_list" size={30} />
              Filtrar
            </Button>
          </form>
        </Header>
        {message.show && (
          <p className={`alert ${message.type}`}>{message.message}</p>
        )}
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

  p.alert {
    padding: 1rem;
    border-radius: 0.625rem;
    width: fit-content;
    text-align: center;
    align-self: center;
  }

  p.alert.error {
    background: var(--red);
  }

  p.alert.filter {
    background: var(--blue);
  }
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
      width: 100%;
    }
  }
`;
