import { MaterialSymbol, SymbolCodepoints } from "react-material-symbols";

import Modal from "./Modal";

import { useState } from "react";

const buttonsData = [
  {
    symbolIcon: "exit_to_app" as SymbolCodepoints,
    text: "Sim",
  },
  {
    text: "Não",
  },
];

type Message = {
  type: "success" | "error";
  message: string;
};

type Props = {
  onCancelButtonClick: () => void;
  onFinishStudySession: (handleMessage: (obj: Message) => void) => void;
};

export default function FinishStudySessionModal({
  onCancelButtonClick,
  onFinishStudySession,
}: Props) {
  const [message, setMessage] = useState<Message>({
    type: "success",
    message: "",
  });

  function handleMessage(msgObj: Message) {
    setMessage({
      type: msgObj.type,
      message: msgObj.message,
    });
  }

  return (
    <Modal
      actionButtonsContent={buttonsData}
      mainTitle="Encerrar Sessão de Estudos"
      subtitle={
        <>
          Se encerrar sua sessão de estudos,{" "}
          <strong>não vai poder entrar nela novamente</strong>. No entanto, com
          ela finalizada, você poderá gerar os cartões dessa sessão{" "}
          <strong>com áudio e adicioná-los ao Anki</strong> através do botão{" "}
          <MaterialSymbol icon="playing_cards" color="var(--white)" size={32} />
          .
        </>
      }
      onCancelButton={onCancelButtonClick}
      modalForm={<></>}
      messageObj={message}
      onMainButton={() => onFinishStudySession(handleMessage)}
    />
  );
}
