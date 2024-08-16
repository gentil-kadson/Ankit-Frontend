import styled from "styled-components";
import { FormEvent, useContext, useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import AuthContext from "@/context/AuthContext";

import Image from "next/image";
import Link from "next/link";
import { MaterialSymbol } from "react-material-symbols";
import Label from "@/components/Label";
import FormGroup from "@/components/FormGroup";
import Button from "@/components/Button";
import ApiMessage from "@/components/ApiMessage";

import googleLogo from "/public/googleLogo.svg";
import Router from "next/router";
import { HTTP_200_OK, HTTP_201_CREATED } from "@/utils/constants";

const googleLoginURL = process.env.NEXT_PUBLIC_GOOGLE_LOGIN_URL || "";

export default function Login() {
  const { user, loginUser, loginUserByGoogle } = useContext(AuthContext);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function logUserInByGoogle() {
      if (router.query.code) {
        const response = await loginUserByGoogle(router.query.code as string);
        if (response.status === HTTP_200_OK || HTTP_201_CREATED) {
          if (response.data.user.student) {
            Router.push("/");
          } else {
            Router.push(`sign-up?code=${router.query.code}`);
          }
        } else {
          setErrorMessage(
            "Houve um erro ao logar com a Google. Tente novamente"
          );
        }
      }
    }

    logUserInByGoogle();
  }, [router.query]);

  async function handleUserLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (emailRef.current && passwordRef.current) {
      const response = await loginUser(
        emailRef.current.value,
        passwordRef.current.value
      );
      if (response.status === 200) {
        Router.push("/");
      } else {
        setErrorMessage(response.message);
      }
    }
  }

  return (
    <Main>
      <Header>
        <span className="main-heading">
          <h1>Ankit</h1>
          <MaterialSymbol
            size={135}
            icon="package_2"
            weight={700}
            color="var(--blue)"
          />
        </span>
        <h2>
          Sua ferramenta para aprender idiomas <span>de maneira prática</span>
        </h2>
        {errorMessage && (
          <ErrorMessageContainer>
            <ApiMessage category="error">{errorMessage}</ApiMessage>
          </ErrorMessageContainer>
        )}
      </Header>
      <LoginForm method="post" onSubmit={(e) => handleUserLogin(e)}>
        <fieldset>
          <FormGroup>
            <Label inputId="email" symbolIcon="email">
              Email
            </Label>
            <input ref={emailRef} type="email" name="email" id="email" />
          </FormGroup>
          <FormGroup>
            <Label inputId="password" symbolIcon="password">
              Senha
            </Label>
            <input
              ref={passwordRef}
              type="password"
              name="password"
              id="password"
            />
          </FormGroup>
        </fieldset>
        <div id="buttons">
          <Button width="25.9375rem">Entrar</Button>
          <Link href={googleLoginURL}>
            <Button type="button" width="25.9375rem" $inverted>
              <Image src={googleLogo} alt="G from Google" />
            </Button>
          </Link>
        </div>
        <span id="sign-up-link">
          Não possui conta?
          <Link id="sign-up-link" href="/sign-up">
            <span> Crie agora mesmo</span>
          </Link>
        </span>
      </LoginForm>
      <p>{!user && user}</p>
    </Main>
  );
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;

  padding-top: 4.75rem;
  padding-bottom: 4rem;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: 4.3125rem;

  .main-heading {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 1.875rem;

    h1 {
      color: var(--blue);
      font-size: 6rem;
      text-align: center;
    }

    @media (max-width: 431px) {
      flex-direction: column;
      text-align: center;
    }
  }

  h2 {
    padding: 0px 0.625rem;
  }

  h2,
  h2 span {
    text-align: center;
  }

  h2 span {
    color: var(--blue);
  }
`;

const LoginForm = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;

  fieldset {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3rem;
    width: 100%;

    @media (max-width: 431px) {
      width: 80%;
    }
  }

  #buttons {
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    width: 100%;

    @media (max-width: 431px) {
      width: 80%;
    }
  }

  #sign-up-link {
    text-decoration: none;
    padding-top: 1.5rem;
    font-weight: bold;

    span {
      color: var(--blue);
    }
  }
`;

const ErrorMessageContainer = styled.div`
  margin-top: 2rem;
`;
