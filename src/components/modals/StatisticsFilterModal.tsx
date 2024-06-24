import { SymbolCodepoints } from "react-material-symbols";
import styled from "styled-components";

import Modal from "./Modal";
import Radio from "../Radio";

const buttonsData = [
  {
    symbolIcon: "check" as SymbolCodepoints,
    text: "Apply",
  },
  {
    text: "Cancel",
  },
];

export default function StatisticsFilterModal() {
  const formElements = (
    <Container>
      <h3>Select One</h3>
      <div className="radio-buttons-container">
        <Radio id="this-month" labelText="This month" name="this-month" />
        <Radio
          id="last-six-months"
          labelText="Last 6 months"
          name="Last 6 months"
        />
        <Radio id="this-year" labelText="This year" name="This year" />
        <Radio id="none" labelText="None" name="None" />
      </div>
    </Container>
  );

  return (
    <Modal
      mainTitle="Time Period"
      subtitle={"Select the time period you wish to apply on your statistics."}
      actionButtonsContent={buttonsData}
      modalForm={formElements}
    />
  );
}

const Container = styled.section`
  padding: 1.25rem;
  min-width: 29.125rem;
  border-radius: 0.625rem;
  background: var(--darker-component);

  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  .radio-buttons-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  @media (max-width: 432px) {
    min-width: 100%;
  }
`;
