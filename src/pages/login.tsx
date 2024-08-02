import Image from "next/image";
import Link from "next/link";

import { MaterialSymbol } from "react-material-symbols";
import styled from "styled-components";

import Label from "@/components/Label";
import FormGroup from "@/components/FormGroup";
import Button from "@/components/Button";

import googleLogo from "/public/googleLogo.svg";

export default function Login() {
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
      </Header>
      <LoginForm method="post">
        <fieldset>
          <FormGroup>
            <Label inputId="email" symbolIcon="email">
              Email
            </Label>
            <input type="email" name="email" id="email" />
          </FormGroup>
          <FormGroup>
            <Label inputId="password" symbolIcon="password">
              Senha
            </Label>
            <input type="password" name="password" id="password" />
          </FormGroup>
        </fieldset>
        <div id="buttons">
          <Button width="25.9375rem">Entrar</Button>
          <Button width="25.9375rem" $inverted>
            <Image src={googleLogo} alt="G from Google" />
          </Button>
        </div>
        <span id="sign-up-link">
          Não possui conta?
          <Link id="sign-up-link" href="/sign-up">
            <span> Crie agora mesmo</span>
          </Link>
        </span>
      </LoginForm>
    </Main>
  );
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;

  padding-top: 2.5rem;
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
