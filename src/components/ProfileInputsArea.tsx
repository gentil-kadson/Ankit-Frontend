import { ChangeEvent, useState } from "react";

import styled from "styled-components";
import FormGroup from "./FormGroup";
import Label from "./Label";
import Select from "./Select";

import { User } from "@/services/UserService";
import { NationalityData } from "@/services/NationalityService";

type Props = {
  user: User
  nationalities: NationalityData[]
}

type FormData = {
  first_name: string,
  last_name: string,
  educational_level: "Middle School" | "High School" | "University",
  nationality: number
}

export default function ProfileInputsArea({ user, nationalities }: Props) {
  const [formData, setFormData] = useState<FormData>({
    first_name: user.student.first_name,
    last_name: user.student.last_name,
    educational_level: user.student.educational_level,
    nationality: user.student.nationality
  });

  function handleFirstNameChange(event: ChangeEvent<HTMLInputElement>) {
    setFormData((prevState) => {
      return {...prevState, first_name: event.target.value}
    });
  }

  function handleLastNameChange(event: ChangeEvent<HTMLInputElement>) {
    setFormData((prevState) => {
      return {...prevState, last_name: event.target.value}
    });
  }

  function handleNationalityChange(event: ChangeEvent<HTMLSelectElement>) {
    setFormData((prevState) => {
      return {...prevState, nationality: Number(event.target.value)}
    });
  }

  function handleEducationLevelChange(event: ChangeEvent<HTMLSelectElement>) {
    setFormData((prevState) => {
      return {...prevState, educational_level: event.target.value as "Middle School" | "High School" | "University"}
    });
  }

  return (
    <Container>
      <FormGroup>
        <Label symbolIcon="signature" inputId="first-name">
          Nome
        </Label>
        <input onChange={handleFirstNameChange} type="text" name="first-name" id="first-name" value={formData.first_name}/>
      </FormGroup>
      <FormGroup>
        <Label symbolIcon="crib" inputId="nationality">
          Nationality
        </Label>
        <Select onChange={handleNationalityChange} value={formData.nationality}>
          {nationalities.map(nationality => {
            return <option key={nationality.id} value={nationality.id}>{nationality.name}</option>
          })}
        </Select>
      </FormGroup>
      <FormGroup>
        <Label symbolIcon="signature" inputId="last-name">
          Last Name
        </Label>
        <input onChange={handleLastNameChange} type="text" name="signature" id="signature" value={formData.last_name}/>
      </FormGroup>
      <FormGroup>
        <Label symbolIcon="school" inputId="educational-level">
          Educational Level
        </Label>
        <Select onChange={handleEducationLevelChange} value={formData.educational_level}>
          <option value="Middle School">Ensino Fundamental II</option>
          <option value="High School">Ensino Médio</option>
          <option value="University">Ensino Superior</option>
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
