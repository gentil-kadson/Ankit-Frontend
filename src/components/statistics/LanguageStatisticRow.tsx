import styled from "styled-components";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

import FlagItem from "./FlagItem";

type Props = {
  flagSrc: string | StaticImport;
  alt: string;
  number: number;
  language: string;
};

export default function LanguageStatisticRow({
  flagSrc,
  number,
  language,
}: Props) {
  return (
    <Row>
      <FlagItem src={flagSrc} alt={language} language={language} />
      <span>{number}</span>
    </Row>
  );
}

const Row = styled.p`
  display: flex;
  justify-content: space-between;

  span {
    color: var(--blue);
    font-weight: bold;
  }
`;
