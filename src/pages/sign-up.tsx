import Link from "next/link";

import { MaterialSymbol } from "react-material-symbols";
import styled from "styled-components";

import Button from "@/components/Button";
import FormGroup from "@/components/FormGroup";
import Label from "@/components/Label";

export default function SignUp() {
  return (
    <Main>
      <header>
        <Link style={{ textDecoration: "none" }} href="login/">
          <Button $inverted width="59px">
            <MaterialSymbol icon="home" color="var(--blue)" size={33} />
          </Button>
        </Link>
      </header>
      <Form action="post" id="user-form">
        <header>
          <MaterialSymbol size={80} icon="package" color="var(--blue)" />
          <p>
            Nos conte mais sobre você para que possamos customizar sua
            experiência no <span>Ankit</span>
          </p>
        </header>
        <fieldset>
          <FormGroup>
            <Label inputId="email" symbolIcon="email">
              Email
            </Label>
            <input type="email" name="email" id="email" required />
          </FormGroup>
          <FormGroup>
            <Label inputId="password1" symbolIcon="password">
              Senha
            </Label>
            <input type="password" name="password1" id="password1" required />
          </FormGroup>
          <FormGroup>
            <Label inputId="password2" symbolIcon="password">
              Repetir Senha
            </Label>
            <input type="password" name="password2" id="password2" required />
          </FormGroup>
          <Button
            $htmlType="submit"
            id="submit-form-button"
            form="user-form"
            width="59px"
          >
            <MaterialSymbol icon="arrow_forward" size={33} />
          </Button>
        </fieldset>
      </Form>
    </Main>
  );
}

const Main = styled.main`
  display: flex;
  flex-direction: column;

  @media (min-width: 540px) {
    padding: 100px;
  }

  @media (max-width: 431px) {
    > header {
      width: 20%;
      align-self: center;
      padding-bottom: 20px;
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 100px;

  header {
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

  fieldset {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;

    #submit-form-button {
      align-self: flex-end;
    }

    @media (max-width: 431px) {
      width: 80%;
    }
  }
`;
