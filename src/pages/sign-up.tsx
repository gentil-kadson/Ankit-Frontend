import { useState } from "react";
import Link from "next/link";

import { MaterialSymbol } from "react-material-symbols";
import styled from "styled-components";

import Button from "@/components/Button";
import FormGroup from "@/components/FormGroup";
import Label from "@/components/Label";

export default function SignUp() {
  const [currentFormStep, setCurrentFormStep] = useState<number>(1);

  function renderUserDataForm() {
    return (
      <Form action="post" id="user-form">
        <header></header>
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
            onClick={() => setCurrentFormStep(2)}
            id="submit-form-button"
            width="59px"
          >
            <MaterialSymbol icon="arrow_forward" size={33} />
          </Button>
        </fieldset>
      </Form>
    );
  }

  function renderStudentDataForm() {
    return <h1>Hello Word</h1>;
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
      {renderForm()}
    </Main>
  );
}

const Main = styled.main`
  display: flex;
  flex-direction: column;

  header {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    #home-link {
      align-self: flex-start;
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
    padding: 100px;
  }

  @media (max-width: 431px) {
    > header {
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
