import React from "react";
import styled from "styled-components";

type Props = {
  title?: string;
  children: React.ReactNode;
};

export default function StatisticsCard({ title, children }: Props) {
  return (
    <StatisticsSection>
      {title && <h2>{title}</h2>}
      <StatisticsCardsGroup>{children}</StatisticsCardsGroup>
    </StatisticsSection>
  );
}

const StatisticsSection = styled.section`
  display: flex;
  flex-direction: column;
  max-width: 30.625rem;
  background-color: var(--component);
  border-radius: 10px;
  max-height: 30.625rem;
  overflow-y: auto;

  h2 {
    color: var(--blue);
    font-weight: bold;
    padding: 1rem;
  }
`;

const StatisticsCardsGroup = styled.div`
  width: 100%;
`;
