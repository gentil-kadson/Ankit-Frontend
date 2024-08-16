import { SymbolCodepoints } from "react-material-symbols";
import Modal from "./Modal";

const buttonsData = [
  {
    symbolIcon: "exit_to_app" as SymbolCodepoints,
    text: "Sim",
  },
  {
    text: "Não",
  },
];

type Props = {
  onCancelButtonClick: () => void;
  onFinishStudySession: () => void;
};

export default function FinishStudySessionModal({
  onCancelButtonClick,
  onFinishStudySession,
}: Props) {
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
      onMainButton={onFinishStudySession}
      errorMessage=""
    />
  );
}
