import styled from "styled-components";
import SimpleInput from "@/components/SimpleInput";
import { MaterialSymbol } from "react-material-symbols";

export default function Login() {
  return (
    <MainWrapper>
      <div className="logo-and-title-section">
        <div className="title-container">
          <h1>Ankit</h1>
          <MaterialSymbol icon="package_2" size={134} color="var(--blue)" />
        </div>
        <p>
          Seu kit para aprender idiomas de forma{" "}
          <span className="blue-text">pronto para uso.</span>
        </p>
      </div>
      <form action="">
        <fieldset>
          <SimpleInput
            label="Email"
            type="text"
            id="email"
            name="email"
            symbol={
              <MaterialSymbol icon="mail" size={24} color="var(--blue)" />
            }
          />
          <SimpleInput
            label="Senha"
            type="password"
            id="passwrd"
            name="passwrd"
            symbol={
              <MaterialSymbol icon="password" size={24} color="var(--blue)" />
            }
          />
        </fieldset>
      </form>
    </MainWrapper>
  );
}

const MainWrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4.3125rem;

  height: 100vh;

  h1 {
    font-weight: bold;
    font-size: 80px;
    color: var(--blue);
  }

  .logo-and-title-section {
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
      font-weight: bold;
      font-size: 1.5rem;
      max-width: 23.38875rem;
    }
  }

  .title-container {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  fieldset {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }
`;
