import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import styled from "styled-components";
import FormGroup from "./FormGroup";
import Label from "./Label";
import Select from "./Select";
import Button from "./Button";

import { User } from "@/services/UserService";
import { StudentService } from "@/services/StudentService";
import AuthService from "@/services/AuthService";
import { NationalityData } from "@/services/NationalityService";
import { cookies } from "@/context/AuthContext";
import { HTTP_200_OK, SUCCESS_MESSAGE_TIMEOUT } from "@/utils/constants";

import GoogleLogo from "../../public/images/googleLogo.svg";

type Props = {
  user: User;
  nationalities: NationalityData[];
  setSuccessMessage: (message: string) => void;
  setErrorMessages: (messages: string[]) => void;
  setShowModal: (showModal: boolean) => void;
};

type FormData = {
  first_name: string;
  last_name: string;
  educational_level: "Middle School" | "High School" | "University";
  nationality: number;
};

export default function ProfileInputsArea({
  user,
  nationalities,
  setErrorMessages,
  setSuccessMessage,
  setShowModal,
}: Props) {
  const [formData, setFormData] = useState<FormData>({
    first_name: user.student.first_name,
    last_name: user.student.last_name,
    educational_level: user.student.educational_level,
    nationality: user.student.nationality,
  });
  const [linkGoogleButtonText, setLinkGoogleButtonText] =
    useState<string>("Vincular");
  const router = useRouter();

  useEffect(() => {
    getGoogleLinkAccountText();
  }, []);

  useEffect(() => {
    async function linkGoogleUser() {
      if (router.query.code) {
        const authService = new AuthService();
        const response = await authService.connectUserToGoogle(
          router.query.code as string,
          cookies.get("accessToken")
        );
        if (response.status === 200) {
          setLinkGoogleButtonText("Desvincular");
          router.push("/me");
          setSuccessMessage("Conta vinculada com sucesso!");
        }
      }
    }

    linkGoogleUser();
  }, [router.query]);

  async function handleChangeStudentInfo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const accessToken = cookies.get("accessToken");
    const studentService = new StudentService(accessToken);
    const response = await studentService.updateStudent(
      formData,
      user.student.id
    );
    if (response.status === HTTP_200_OK) {
      setSuccessMessage("Alterações feitas com sucesso!");
      setTimeout(() => {
        setSuccessMessage("");
      }, SUCCESS_MESSAGE_TIMEOUT);
    } else {
      const errors = Object.values(response.data)
        .flat()
        .filter((message) => typeof message === "string");
      setErrorMessages(errors);
    }
  }

  function handleFirstNameChange(event: ChangeEvent<HTMLInputElement>) {
    setFormData((prevState) => {
      return { ...prevState, first_name: event.target.value };
    });
  }

  function handleLastNameChange(event: ChangeEvent<HTMLInputElement>) {
    setFormData((prevState) => {
      return { ...prevState, last_name: event.target.value };
    });
  }

  function handleNationalityChange(event: ChangeEvent<HTMLSelectElement>) {
    setFormData((prevState) => {
      return { ...prevState, nationality: Number(event.target.value) };
    });
  }

  function handleEducationLevelChange(event: ChangeEvent<HTMLSelectElement>) {
    setFormData((prevState) => {
      return {
        ...prevState,
        educational_level: event.target.value as
          | "Middle School"
          | "High School"
          | "University",
      };
    });
  }

  async function getGoogleLinkAccountText() {
    const authService = new AuthService();
    const response = await authService.getUserSocialAccounts(
      cookies.get("accessToken")
    );
    const userHasNoSocialAccounts = response.data.length === 0;
    if (userHasNoSocialAccounts) {
      setLinkGoogleButtonText("Vincular");
    } else {
      setLinkGoogleButtonText("Desvincular");
    }
  }

  async function handleGoogleLinkButton() {
    const authService = new AuthService();
    const response = await authService.getUserSocialAccounts(
      cookies.get("accessToken")
    );
    if (response.data.length === 0) {
      router.push(process.env.NEXT_PUBLIC_GOOGLE_LINK_URL as string);
    } else {
      const disconnectResponse = await authService.disconnectUserFromGoogle(
        response.data[0].id,
        cookies.get("accessToken")
      );
      if (disconnectResponse.status === 200) {
        setLinkGoogleButtonText("Vincular");
        setSuccessMessage("Conta desvinculada com sucesso!");
        setTimeout(() => {
          setSuccessMessage("");
        }, SUCCESS_MESSAGE_TIMEOUT);
      } else {
        setErrorMessages([
          "Você precisa definir uma senha para desvincular a conta",
        ]);
      }
    }
  }

  async function handleResetPasswordButton() {
    const authService = new AuthService();
    const response = await authService.resetPassword(user.email);
    if (response.status === HTTP_200_OK) {
      setSuccessMessage("Um email com as instruções foi enviado para você");
      setTimeout(() => {
        setSuccessMessage("");
      }, SUCCESS_MESSAGE_TIMEOUT);
    } else {
      setErrorMessages([
        "Não foi possível enviar o email para troca de senha. Tente novamente mais tarde",
      ]);
    }
  }

  return (
    <>
      <Container id="student-update-form" onSubmit={handleChangeStudentInfo}>
        <FormGroup>
          <Label symbolIcon="signature" inputId="first-name">
            Nome
          </Label>
          <input
            onChange={handleFirstNameChange}
            type="text"
            name="first-name"
            id="first-name"
            value={formData.first_name}
          />
        </FormGroup>
        <FormGroup>
          <Label symbolIcon="crib" inputId="nationality">
            Nacionalidade
          </Label>
          <Select
            onChange={handleNationalityChange}
            value={formData.nationality}
          >
            {nationalities.map((nationality) => {
              return (
                <option key={nationality.id} value={nationality.id}>
                  {nationality.name}
                </option>
              );
            })}
          </Select>
        </FormGroup>
        <FormGroup>
          <Label symbolIcon="signature" inputId="last-name">
            Sobrenome
          </Label>
          <input
            onChange={handleLastNameChange}
            type="text"
            name="signature"
            id="signature"
            value={formData.last_name}
          />
        </FormGroup>
        <FormGroup>
          <Label symbolIcon="school" inputId="educational-level">
            Escolaridade
          </Label>
          <Select
            onChange={handleEducationLevelChange}
            value={formData.educational_level}
          >
            <option value="Middle School">Ensino Fundamental II</option>
            <option value="High School">Ensino Médio</option>
            <option value="University">Ensino Superior</option>
          </Select>
        </FormGroup>
      </Container>
      <ActionButtonsContainer>
        <div className="left-side-buttons">
          <Button
            onClick={() => setShowModal(true)}
            width="12.375rem"
            className="danger-button"
          >
            Deletar Conta
          </Button>
          <Button
            onClick={() => handleGoogleLinkButton()}
            width="12.375rem"
            $inverted
          >
            {linkGoogleButtonText}
            <Image
              src={GoogleLogo}
              width={24}
              height={24}
              alt="G com cores da empresa Google"
            />
          </Button>
        </div>
        <div className="right-side-buttons">
          <Button
            onClick={() => handleResetPasswordButton()}
            type="button"
            width="12.0625rem"
            $inverted
          >
            Resetar Senha
          </Button>
          <Button form="student-update-form" type="submit" width="12.0625rem">
            Salvar Alterações
          </Button>
        </div>
      </ActionButtonsContainer>
    </>
  );
}

const Container = styled.form`
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

const ActionButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;

  .left-side-buttons,
  .right-side-buttons {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  @media (max-width: 1000px) {
    flex-direction: column;
    gap: 1rem;

    .left-side-buttons,
    .right-side-buttons {
      flex-direction: column;
      width: 100%;
    }
  }
`;
