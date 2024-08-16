import styled from "styled-components";
import { useForm } from "react-hook-form";

import Navbar from "@/components/Navbar";
import Label from "@/components/Label";
import FormGroup from "@/components/FormGroup";
import Button from "@/components/Button";

const unmatchingPasswordsMessage = "As senhas não são iguais";

export default function ResetPassword() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function handleChangePasswordForm(data: any) {
    // Change password or display errors
  }

  return (
    <Content>
      <Navbar />
      <Main>
        <header>
          <h1>Resete Sua Senha</h1>
        </header>

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

  form {
    margin-top: 1.875rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;
