import React from "react";
import styled from "styled-components";

type Props = {
  title: string;
  children: React.ReactNode;
};

export default function StatisticsCard({ title, children }: Props) {
  return (
    <StatisticsSection>
      <h2>{title}</h2>
      <StatisticsCardsGroup>{children}</StatisticsCardsGroup>
    </StatisticsSection>
  );
}

const StatisticsSection = styled.section`
  display: flex;
  flex-direction: column;
  max-width: 30.625rem;

  h2 {
    color: var(--blue);
    font-weight: bold;
  }
`;

const StatisticsCardsGroup = styled.div`
  width: 100%;
`;
