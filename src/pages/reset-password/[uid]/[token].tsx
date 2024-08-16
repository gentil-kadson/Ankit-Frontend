import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useState } from "react";

import Navbar from "@/components/Navbar";
import Label from "@/components/Label";
import FormGroup from "@/components/FormGroup";
import Button from "@/components/Button";
import ApiMessage from "@/components/ApiMessage";

import AuthService from "@/services/AuthService";
import { HTTP_200_OK, SUCCESS_MESSAGE_TIMEOUT } from "@/utils/constants";

const unmatchingPasswordsMessage = "As senhas não são iguais";
const authService = new AuthService();

export default function ResetPassword() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  async function handleChangePasswordForm(data: any) {
    console.log(router.query.uid);
    // Change password or display errors
    const changePasswordData = { 
      new_password1: data.new_password1 as string,
      new_password2: data.new_password2 as string,
      token: router.query.token as string,
      uid: router.query.uid as string
    }
    const response = await authService.confirmResetPassword(changePasswordData);
    if (response.status === HTTP_200_OK) {
      setSuccessMessage("Senha alterada com sucesso! Redirecionando...");
      setTimeout(() => {
        router.push("/me");
      }, SUCCESS_MESSAGE_TIMEOUT);
    } else {
      const errors = Object.values(response.data).flat().filter(value => typeof(value) === "string");
      setErrorMessages(errors);
    }
  }

  return (
    <Content>
      <Navbar />
      <Main>
        <header>
          <h1>Resete Sua Senha</h1>
        </header>

        { successMessage && <ApiMessage category="success">{ successMessage }</ApiMessage> }

        { errorMessages && (
          <div className="error-messages">
            {errorMessages.map(message => {
              return <ApiMessage category="error">{ message }</ApiMessage>
            })}
          </div>
        ) }

        <form onSubmit={handleSubmit(handleChangePasswordForm)}>
          {errors.new_password2 && (
            <p style={{ color: "var(--red)" }}>As senhas devem ser iguais</p>
          )}
          <FormGroup>
            <Label symbolIcon="password" inputId="new_password1">
              Nova Senha
            </Label>
            <input
              {...register("new_password1")}
              type="password"
              name="new_password1"
              id="new_password1"
            />
          </FormGroup>

          <FormGroup>
            <Label symbolIcon="password" inputId="new_password2">
              Repita a Senha
            </Label>
            <input
              {...register("new_password2", {
                validate: (value: string) => {
                  if (watch("new_password1") != value) {
                    return unmatchingPasswordsMessage;
                  }
                },
              })}
              type="password"
              name="new_password2"
              id="new_password2"
            />
          </FormGroup>

          <Button width="10rem">Confirmar</Button>
        </form>
      </Main>
    </Content>
  );
}

const Main = styled.main`
  max-width: 1240px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6.25rem 0px;

  header {
    margin-bottom: 2rem;
  }

  form {
    margin-top: 1.875rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

  .error-messages {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;
