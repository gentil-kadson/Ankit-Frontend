import { SymbolCodepoints } from "react-material-symbols";
import Modal from "./Modal";

const buttonsData = [
  {
    symbolIcon: "exit_to_app" as SymbolCodepoints,
    text: "Yes",
  },
  {
    text: "No",
  },
];

export default function FinishStudySessionModal() {
  return (
    <div>Hello word</div>
    // <Modal
    //   actionButtonsContent={buttonsData}
    //   mainTitle="End Study Session"
    //   subtitle={
    //     <>
    //       If you download the vocabulary file, your study session will end, and
    //       you'll <strong>lose access</strong> to the session. Are you sure?
    //     </>
    //   }
    //   modalForm={<></>}
    // />
  );
}
