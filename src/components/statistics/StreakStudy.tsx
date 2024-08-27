import styled from "styled-components";
import { SymbolCodepoints } from "react-material-symbols";
import { MaterialSymbol } from "react-material-symbols";

type Props = {
  icon: SymbolCodepoints;
  text: string;
  number: number;
};

export default function StreakStudyRow({ icon, text, number }: Props) {
  return (
    <Row>
      <span>
        <MaterialSymbol
          size={24}
          icon={icon}
          color="var(--blue)"
          weight={900}
        />
        {text}
      </span>
      {number}
    </Row>
  );
}

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: var(--blue);
  font-weight: bold;
  gap: 2.75rem;
  padding: 1rem;

  span {
    color: var(--white);
    display: flex;
    align-items: center;
    gap: 0.3125rem;
  }
`;
