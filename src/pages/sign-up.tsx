import { useRef, useState } from "react";
import Link from "next/link";

import { MaterialSymbol } from "react-material-symbols";
import styled from "styled-components";

import Button from "@/components/Button";
import Select from "@/components/Select";
import FormGroup from "@/components/FormGroup";
import Label from "@/components/Label";

type FormData = {
  email: string;
  password1: string;
  password2: string;
  first_name: string;
  last_name: string;
  educational_level: string;
  nationality: string;
};

export default function SignUp() {
  const [currentFormStep, setCurrentFormStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password1: "",
    password2: "",
    first_name: "",
    last_name: "",
    educational_level: "",
    nationality: "",
  });

  function renderUserDataForm() {
    return (
      <fieldset>
        <FormGroup>
          <Label inputId="email" symbolIcon="email">
            Email
          </Label>
          <input
            type="email"
            name="email"
            id="email"
            required
            value={formData.email}
            onChange={(event) =>
              setFormData((prevState) => {
                return { ...prevState, email: event.target.value };
              })
            }
          />
        </FormGroup>
        <FormGroup>
          <Label inputId="password1" symbolIcon="password">
            Senha
          </Label>
          <input
            type="password"
            name="password1"
            id="password1"
            required
            value={formData.password1}
            onChange={(event) =>
              setFormData((prevState) => {
                return { ...prevState, password1: event.target.value };
              })
            }
          />
        </FormGroup>
        <FormGroup>
          <Label inputId="password2" symbolIcon="password">
            Repetir Senha
          </Label>
          <input
            type="password"
            name="password2"
            id="password2"
            required
            value={formData.password2}
            onChange={(event) =>
              setFormData((prevState) => {
                return { ...prevState, password2: event.target.value };
              })
            }
          />
        </FormGroup>
        <Button
          onClick={() => setCurrentFormStep(2)}
          id="submit-form-button"
          width="59px"
        >
          <MaterialSymbol icon="arrow_forward" size={33} />
        </Button>
      </fieldset>
    );
  }

  function renderStudentDataForm() {
    return (
      <StudentFormFields>
        <fieldset id="fieldset-1">
          <FormGroup>
            <Label inputId="first_name" symbolIcon="signature">
              Nome
            </Label>
            <input
              type="text"
              name="first_name"
              id="first_name"
              required
              value={formData.first_name}
              onChange={(event) =>
                setFormData((prevState) => {
                  return { ...prevState, first_name: event.target.value };
                })
              }
            />
          </FormGroup>
          <FormGroup>
            <Label inputId="last_name" symbolIcon="signature">
              Sobrenome
            </Label>
            <input
              type="text"
              name="last_name"
              id="last_name"
              required
              value={formData.last_name}
              onChange={(event) =>
                setFormData((prevState) => {
                  return { ...prevState, last_name: event.target.value };
                })
              }
            />
          </FormGroup>
          <FormGroup>
            <Label inputId="educational_level" symbolIcon="school">
              Nível Educacional
            </Label>
            <Select
              value={formData.educational_level}
              onChange={(event) => {
                setFormData((prevState) => {
                  return {
                    ...prevState,
                    educational_level: event.target.value,
                  };
                });
              }}
              name="educational_level"
              id="educational_level"
            >
              <option value="brazilian">Ensino Médio</option>
              <option value="north-american">Ensino Superior</option>
            </Select>
          </FormGroup>
        </fieldset>
        <fieldset id="fieldset-2">
          <FormGroup>
            <Label inputId="nationality" symbolIcon="crib">
              Nacionalidade
            </Label>
            <Select
              value={formData.nationality}
              onChange={(event) =>
                setFormData((prevState) => {
                  return { ...prevState, nationality: event.target.value };
                })
              }
              required
              name="nationality"
              id="nationality"
            >
              <option value="brazilian">Brasileiro</option>
              <option value="north-american">Estadunidense</option>
              <option value="french">Francês</option>
            </Select>
          </FormGroup>
        </fieldset>
        <StudentFormButtons>
          <Button width="59px" onClick={() => setCurrentFormStep(1)}>
            <MaterialSymbol icon="arrow_back" size={33} />
          </Button>
          <Button $htmlType="submit" width="59px">
            <MaterialSymbol icon="check" size={33} />
          </Button>
        </StudentFormButtons>
      </StudentFormFields>
    );
  }

  function renderForm() {
    if (currentFormStep == 1) {
      return renderUserDataForm();
    } else {
      return renderStudentDataForm();
    }
  }

  return (
    <Main>
      <header>
        <Link style={{ textDecoration: "none" }} href="login/" id="home-link">
          <Button $inverted width="59px">
            <MaterialSymbol icon="home" color="var(--blue)" size={33} />
          </Button>
        </Link>
        <span className="heading-title">
          <MaterialSymbol size={80} icon="package" color="var(--blue)" />
          <p>
            Nos conte mais sobre você para que possamos customizar sua
            experiência no <span>Ankit</span>
          </p>
        </span>
      </header>
      <Form action="post" id="user-form">
        {renderForm()}
      </Form>
    </Main>
  );
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 6.25rem;

  header {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    #home-link {
      align-self: flex-start;

      @media (max-width: 875px) {
        align-self: center;
      }
    }

    span.heading-title {
      display: flex;
      flex-direction: column;
      align-items: center;

      font-size: 2rem;
      font-weight: bold;
      text-align: center;

      span {
        color: var(--blue);
      }

      @media (max-width: 431px) {
        width: 70%;
      }
    }

    @media (max-width: 431px) {
      #home-link {
        width: 25%;
        align-self: center;
      }
    }
  }

  @media (min-width: 540px) {
    padding: 6.25rem;
  }

  @media (max-width: 431px) {
    > header {
      align-self: center;
      padding-bottom: 1.25rem;
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6.25rem;

  fieldset {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;

    #submit-form-button {
      align-self: flex-end;
    }

    @media (max-width: 431px) {
      width: 80%;
    }
  }
`;

const StudentFormFields = styled.div`
  display: grid;
  grid-template-areas:
    "fieldset-1 fieldset-2"
    "buttons buttons";
  gap: 2rem;

  #fieldset-1 {
    grid-area: fieldset-1;
  }

  #field-set-2 {
    grid-area: fieldset-2;
  }

  @media (max-width: 875px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

const StudentFormButtons = styled.div`
  grid-area: buttons;
  display: flex;
  width: 100%;
  justify-content: flex-end;
  gap: 1rem;

  @media (max-width: 875px) {
    width: 80%;
    justify-content: center;
  }
`;
