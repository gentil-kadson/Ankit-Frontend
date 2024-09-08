import { useState, useContext, FormEvent, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Link from "next/link";

import { MaterialSymbol } from "react-material-symbols";
import styled from "styled-components";

import Button from "@/components/Button";
import Select from "@/components/Select";
import FormGroup from "@/components/FormGroup";
import Label from "@/components/Label";
import ApiMessage from "@/components/ApiMessage";
import AuthContext from "@/context/AuthContext";

import { CreateStudentData } from "@/services/StudentService";
import AuthService from "@/services/AuthService";
import NationalityService, {
  NationalityData,
} from "@/services/NationalityService";
import { HTTP_200_OK, HTTP_201_CREATED } from "@/utils/constants";

import { cookies } from "@/context/AuthContext";
import { StudentService } from "@/services/StudentService";
import UserService from "@/services/UserService";

export default function SignUp() {
  const { loginUser, setUser } = useContext(AuthContext);
  const [nationalities, setNationalities] = useState<NationalityData[]>([]);
  const [currentFormStep, setCurrentFormStep] = useState<number>(0);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  useEffect(() => {
    setFormInitialStep();
  }, [router.query]);

  useEffect(() => {
    getNationalities();
  }, []);

  function setFormInitialStep() {
    if (router.query.code) {
      setCurrentFormStep(2);
    } else {
      setCurrentFormStep(1);
    }
  }

  async function getNationalities() {
    const nationalityService = new NationalityService();
    const response = await nationalityService.getNationalities();
    if (response.status === HTTP_200_OK) {
      setNationalities(response.data);
    } else {
      const errors = Object.values(response.data).flat();
      setErrorMessages(errors as string[]);
    }
  }

  async function handleUserCreation(data: any) {
    const authService = new AuthService();
    const response = await authService.createUser(data);
    if (response.status === HTTP_201_CREATED) {
      setSuccessMessage(
        "Usuário criado com sucesso! Preencha os dados de estudante"
      );
      setCurrentFormStep(2);
      await loginUser(data.email, data.password1);
      setErrorMessages([]);
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
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

  async function handleStudentCreation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const accessToken = cookies.get("accessToken");
      const studentService = new StudentService(accessToken);

      const response = await studentService.createStudent(
        formData as unknown as CreateStudentData
      );
      if (response.status === HTTP_201_CREATED) {
        const userService = new UserService(accessToken);
        const response = await userService.getMe();

        if (response.status === HTTP_200_OK) {
          setUser(response.data);
          setErrorMessages([]);
          router.push("/");
        } else {
          const errors = Object.values(response.data)
            .flat()
            .filter((value) => typeof value === "string");
          setErrorMessages(errors as string[]);
        }
      } else {
        const errors = Object.values(response.data)
          .flat()
          .filter((value) => typeof value === "string");
        setErrorMessages(errors as string[]);
      }
    }
  }

  function renderStudentDataForm() {
    return (
      <Form
        id="student-form"
        ref={formRef}
        action="post"
        onSubmit={handleStudentCreation}
      >
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
                <option value="Middle School">Ensino Fundamental II</option>
                <option value="High School">Ensino Médio</option>
                <option value="University">Ensino Superior</option>
              </Select>
            </FormGroup>
          </fieldset>
          <fieldset id="fieldset-2">
            <FormGroup>
              <Label inputId="nationality" symbolIcon="crib">
                Nacionalidade
              </Label>
              <Select required name="nationality" id="nationality">
                {nationalities &&
                  nationalities.map((nationality) => {
                    return (
                      <option key={nationality.id} value={nationality.id}>
                        {nationality.name}
                      </option>
                    );
                  })}
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
              <ApiMessage category="error" key={idx}>
                {value}
              </ApiMessage>
            ))}
          </ErrorMessages>
        )}
        {successMessage && (
          <ApiMessage category="success">{successMessage}</ApiMessage>
        )}
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
        align-self: flex-start;
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
        font-size: 1.625rem;
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
      gap: 2rem;
    }

    gap: 1rem;
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
      width: 100%;
      padding-bottom: 2rem;
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
