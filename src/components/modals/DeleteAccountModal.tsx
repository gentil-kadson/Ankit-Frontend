import styled from "styled-components";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { SymbolCodepoints } from "react-material-symbols";

import Modal from "./Modal";
import AuthContext from "@/context/AuthContext";
import UserService from "@/services/UserService";
import { cookies } from "@/context/AuthContext";
import { HTTP_204_NO_CONTENT } from "@/utils/constants";

const buttonsData = [
  {
    text: "Excluir",
    className: "danger-button",
    symbolIcon: "delete" as SymbolCodepoints,
  },
  {
    text: "Cancelar",
  },
];

type Props = {
  onCancelButtonClick: () => void;
};

export default function DeleteAccountModal({ onCancelButtonClick }: Props) {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { user } = useContext(AuthContext);
  const router = useRouter();

  async function handleAccountDeletion() {
    const accessToken = cookies.get("accessToken");
    const userService = new UserService(accessToken);
    if (user) {
      const response = await userService.delete(user.id);
      if (response.status !== HTTP_204_NO_CONTENT) {
        setErrorMessage("Não foi possível deletar a conta");
      } else {
        cookies.remove("accessToken");
        cookies.remove("refreshToken");
        router.push("/");
      }
    }
  }

  const formElements = (
    <Section>
      <h3>Tem certeza que deseja excluir a sua conta?</h3>
      <p>
        Após a exclusão, não será possível recuperá-la. Entretanto, você pode
        criar a conta novamente.
      </p>
    </Section>
  );

  return (
    <Modal
      mainTitle="Exclusão de Conta"
      subtitle="Apagar sua conta é irreversível"
      onMainButton={handleAccountDeletion}
      actionButtonsContent={buttonsData}
      onCancelButton={onCancelButtonClick}
      modalForm={formElements}
      messageObj={{
        type: "error",
        message: errorMessage,
      }}
    />
  );
}

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.8125;
`;
