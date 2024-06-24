import styled from "styled-components";
import FormGroup from "./FormGroup";
import Label from "./Label";
import Select from "./Select";

export default function ProfileInputsArea() {
  return (
    <Container>
      <FormGroup>
        <Label symbolIcon="signature" inputId="first-name">
          First Name
        </Label>
        <input type="text" name="first-name" id="first-name" />
      </FormGroup>
      <FormGroup>
        <Label symbolIcon="crib" inputId="nationality">
          Nationality
        </Label>
        <Select>
          <option value="canadian">Canadense</option>
          <option value="canadian">Canadense</option>
          <option value="canadian">Canadense</option>
          <option value="canadian">Canadense</option>
        </Select>
      </FormGroup>
      <FormGroup>
        <Label symbolIcon="signature" inputId="last-name">
          Last Name
        </Label>
        <input type="text" name="signature" id="signature" />
      </FormGroup>
      <FormGroup>
        <Label symbolIcon="school" inputId="educational-level">
          Educational Level
        </Label>
        <Select>
          <option value="life-starts-now">Life Starts Now</option>
          <option value="life-starts-now">Life Starts Now</option>
          <option value="life-starts-now">Life Starts Now</option>
          <option value="life-starts-now">Life Starts Now</option>
        </Select>
      </FormGroup>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 3.75rem;
  grid-row-gap: 2.5rem;

  @media (max-width: 1000px) {
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;
  }

  @media (max-width: 432px) {
    div {
      width: 100%;
    }
  }
`;
