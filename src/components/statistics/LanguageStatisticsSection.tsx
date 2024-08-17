import styled from "styled-components";

import StatisticsCard from "./StatisticsCard";
import LanguageStatisticRow from "./LanguageStatisticRow";

import brazilFlag from "/public/brazilFlag.svg";

import {
  StudySessionStats,
  CardsAddedStats,
} from "@/services/StatisticsService";

type Props = {
  studySessionsPerLanguage: StudySessionStats[];
  cardsAddedPerLanguage: CardsAddedStats[];
};

export default function LanguageStatisticsSection({
  studySessionsPerLanguage,
  cardsAddedPerLanguage,
}: Props) {
  return (
    <Container>
      <StatisticsCard title="Quantidade de Cards por Idioma">
        {cardsAddedPerLanguage.map((card) => (
          <LanguageStatisticRow
            flagSrc={brazilFlag}
            alt="brazil-flag"
            language={card.name}
            number={card.cards_added}
            key={`${card.id}-${card.name}`}
          />
        ))}
      </StatisticsCard>
      <StatisticsCard title="Sessões de Estudo por Idioma">
        {studySessionsPerLanguage.map((studySession) => (
          <LanguageStatisticRow
            flagSrc={brazilFlag}
            alt="brazil-flag"
            key={`${studySession.name}-${studySession.id}`}
            language={studySession.name}
            number={studySession.study_sessions_count}
          />
        ))}
      </StatisticsCard>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 15.625rem;

  @media (max-width: 875px) {
    flex-direction: column;
    align-items: center;
  }
`;
