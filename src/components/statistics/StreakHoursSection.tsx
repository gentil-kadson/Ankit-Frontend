import styled from "styled-components";

import ProfilePicture from "../ProfilePicture";
import StatisticsCard from "./StatisticsCard";
import StreakStudyRow from "./StreakStudy";

import brazilFlag from "/public/brazilFlag.svg";

export default function StreakHoursSection() {
  return (
    <Container>
      <ProfilePicture src={brazilFlag} width={194} height={194} />
      <StatisticsCard>
        <StreakStudyRow
          icon="trending_flat"
          text="Maior Ofensiva"
          number={25}
        />
        <StreakStudyRow
          icon="local_fire_department"
          text="Ofensiva Atual"
          number={25}
        />
        <StreakStudyRow icon="alarm" text="Tempo de Estudo (min)" number={25} />
      </StatisticsCard>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.9375rem;
`;
