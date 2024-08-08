import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";

import { MaterialSymbol } from "react-material-symbols";
import styled from "styled-components";

import Button from "@/components/Button";
import Select from "@/components/Select";
import FormGroup from "@/components/FormGroup";
import Label from "@/components/Label";
import ErrorMessage from "@/components/ErrorMessage";

import AuthService from "@/services/AuthService";
import { HTTP_201_CREATED } from "@/utils/constants";

export default function SignUp() {
  const [currentFormStep, setCurrentFormStep] = useState<number>(1);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    console.log(errorMessages);
  }, []);

  async function handleUserCreation(data: any) {
    const authService = new AuthService();
    const response = await authService.createUser(data);
    if (response.status === HTTP_201_CREATED) {
      setSuccessMessage(
        "Usuário criado com sucesso! Preencha os dados de estudante"
      );
      setCurrentFormStep(2);
    } else {
      const errors = Object.values(response.data).flat();
      setErrorMessages(errors as string[]);
    }
  }

  function renderUserDataForm() {
    return (
      <Form
        method="post"
        id="user-form"
        onSubmit={handleSubmit(handleUserCreation)}
      >
        <fieldset>
          <FormGroup>
            <Label inputId="email" symbolIcon="email">
              Email
            </Label>
            <input
              {...register("email")}
              type="email"
              name="email"
              id="email"
              required
            />
          </FormGroup>
          <FormGroup>
            {errors.password2 && (
              <p style={{ color: "var(--red)" }}>As senhas devem ser iguais</p>
            )}
            <Label inputId="password1" symbolIcon="password">
              Senha
            </Label>
            <input
              {...register("password1")}
              type="password"
              name="password1"
              id="password1"
              defaultValue=""
              required
            />
          </FormGroup>
          <FormGroup>
            <Label inputId="password2" symbolIcon="password">
              Repetir Senha
            </Label>
            <input
              {...register("password2", {
                validate: (value: string) => {
                  if (watch("password1") != value) {
                    return "As senhas não são iguais";
                  }
                },
              })}
              type="password"
              name="password2"
              id="password2"
              defaultValue=""
              required
            />
          </FormGroup>
          <Button type="submit" id="submit-form-button" width="59px">
            <MaterialSymbol icon="arrow_forward" size={33} />
          </Button>
        </fieldset>
      </Form>
    );
  }

  function renderStudentDataForm() {
    return (
      <Form id="student-form" action="post">
        <StudentFormFields>
          <fieldset id="fieldset-1">
            <FormGroup>
              <Label inputId="first_name" symbolIcon="signature">
                Nome
              </Label>
              <input type="text" name="first_name" id="first_name" required />
            </FormGroup>
            <FormGroup>
              <Label inputId="last_name" symbolIcon="signature">
                Sobrenome
              </Label>
              <input type="text" name="last_name" id="last_name" required />
            </FormGroup>
            <FormGroup>
              <Label inputId="educational_level" symbolIcon="school">
                Nível Educacional
              </Label>
              <Select name="educational_level" id="educational_level">
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
              <Select required name="nationality" id="nationality">
                <option value="brazilian">Brasileiro</option>
                <option value="north-american">Estadunidense</option>
                <option value="french">Francês</option>
              </Select>
            </FormGroup>
          </fieldset>
          <StudentFormButtons>
            <Button type="submit" width="59px">
              <MaterialSymbol icon="check" size={33} />
            </Button>
          </StudentFormButtons>
        </StudentFormFields>
      </Form>
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
        {errorMessages && (
          <ErrorMessages>
            {errorMessages.map((value, idx) => (
              <ErrorMessage key={idx}>{value}</ErrorMessage>
            ))}
          </ErrorMessages>
        )}
        {successMessage && <p>{successMessage}</p>}
      </header>
      {renderForm()}
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

const ErrorMessages = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 40px;
`;
