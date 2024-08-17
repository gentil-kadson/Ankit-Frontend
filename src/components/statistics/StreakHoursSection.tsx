import styled from "styled-components";

import ProfilePicture from "../ProfilePicture";
import StatisticsCard from "./StatisticsCard";
import StreakStudyRow from "./StreakStudy";

import NoProfilePicture from "/public/noProfilePicture.svg";

import { User } from "@/services/UserService";

type Props = {
  user: User;
};

export default function StreakHoursSection({ user }: Props) {
  const student = user.student;

  const renderProfilePicture = () => {
    let src = NoProfilePicture;
    if (student.profile_picture) {
      src = student.profile_picture;
    }

    return src;
  };

  const duration = Number(student.total_study_time.split(":")[1]);
  const roundDuration = Math.ceil(duration);

  return (
    <Container>
      <ProfilePicture src={renderProfilePicture()} width={194} height={194} />
      <StatisticsCard>
        <StreakStudyRow
          icon="trending_flat"
          text="Maior Ofensiva"
          number={student.longest_streak}
        />
        <StreakStudyRow
          icon="local_fire_department"
          text="Ofensiva Atual"
          number={student.streak}
        />
        <StreakStudyRow
          icon="alarm"
          text="Tempo de Estudo (min)"
          number={roundDuration}
        />
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
