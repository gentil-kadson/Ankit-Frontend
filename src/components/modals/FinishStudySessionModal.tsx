import { SymbolCodepoints } from "react-material-symbols";

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
          Se você encerrar sua sessão, você baixará o arquivo CSV com os cards,
          mas <strong>perderá o acesso</strong> a esta sessão. Tem certeza que
          deseja encerrar (você também pode baixar o arquivo CSV na tela
          principal)?
        </>
      }
      onCancelButton={onCancelButtonClick}
      modalForm={<></>}
      messageObj={message}
      onMainButton={() => onFinishStudySession(handleMessage)}
    />
  );
}
