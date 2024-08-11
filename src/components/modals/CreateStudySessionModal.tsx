import { SymbolCodepoints } from "react-material-symbols";

import Modal from "./Modal";
import Select from "../Select";
import Label from "../Label";
import FormGroup from "../FormGroup";

const buttonsData = [
  {
    symbolIcon: "note_stack" as SymbolCodepoints,
    text: "Iniciar",
  },
  {
    text: "Cancelar",
  },
];

type Props = {
  onClick: () => void;
};

export default function CreateStudySessionModal({ onClick }: Props) {
  const formInputs = (
    <FormGroup>
      <Label inputId="study-session-language" symbolIcon="g_translate">
        Selecione um Idioma
      </Label>
      <Select id="study-session-language">
        <option value="">Selecione</option>
        <option value="Inglês">Inglês</option>
        <option value="Libras">Libras</option>
      </Select>
    </FormGroup>
  );

  return (
    <Modal
      mainTitle="Study Session Info"
      onCancelButton={onClick}
      subtitle={
        <>
          Qual <strong> idioma </strong> você vai estudar?
        </>
      }
      actionButtonsContent={buttonsData}
      modalForm={formInputs}
    />
  );
}
