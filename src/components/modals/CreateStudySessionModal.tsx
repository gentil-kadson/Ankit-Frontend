import { SymbolCodepoints } from "react-material-symbols";

import Modal from "./Modal";
import Select from "../Select";
import Label from "../Label";
import FormGroup from "../FormGroup";

const buttonsData = [
  {
    symbolIcon: "note_stack" as SymbolCodepoints,
    text: "Initiate",
  },
  {
    text: "Cancel",
  },
];

export default function CreateStudySessionModal() {
  const formInputs = (
    <FormGroup>
      <Label symbolIcon="g_translate">Select a Language</Label>
      <Select>
        <option value="">Selecione</option>
        <option value="Inglês">Inglês</option>
        <option value="Libras">Libras</option>
      </Select>
    </FormGroup>
  );

  return (
    <Modal
      mainTitle="Study Session Info"
      subtitle={
        <>
          What <strong>language</strong> are you going to study?
        </>
      }
      actionButtonsContent={buttonsData}
      modalForm={formInputs}
    />
  );
}
