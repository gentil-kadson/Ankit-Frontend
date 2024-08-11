import Modal from "./Modal";
import Select from "../Select";
import Label from "../Label";
import FormGroup from "../FormGroup";

import { useEffect, useState } from "react";
import api from "@/services/api";
import { cookies } from "@/context/AuthContext";
import Router from "next/router";

const buttonsData = [
  {
    symbolIcon: "note_stack" as SymbolCodepoints,
    text: "Iniciar",
  },
  {
    text: "Cancelar",
  },
];

import { SymbolCodepoints } from "react-material-symbols";
type Props = {
  onClick: () => void;
};

type Language = {
  id: number;
  name: string;
};

type StudySessionData = {
  name: string;
  language: number;
};

export default function CreateStudySessionModal({ onClick }: Props) {
  const accessToken = cookies.get("accessToken");
  const [availableLanguages, setAvailableLanguages] = useState<Language[]>([]);
  const [studySessionData, setStudySessionData] = useState<StudySessionData>({
    name: "",
    language: 0,
  });
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    async function getData() {
      const { data: languages } = await api.get("/languages/", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      setAvailableLanguages(languages);
    }

    getData();
  }, []);

  const formInputs = (
    <>
      <FormGroup>
        <Label inputId="study-session-name" symbolIcon="signature">
          Nome da Sessão
        </Label>
        <input
          onChange={(e) =>
            setStudySessionData((prevData) => {
              return { ...prevData, name: e.target.value };
            })
          }
          type="text"
          name="study-session-name"
          id="study-session-name"
          value={studySessionData.name}
        />
      </FormGroup>
      <FormGroup>
        <Label inputId="study-session-language" symbolIcon="g_translate">
          Selecione um Idioma
        </Label>
        <Select
          id="study-session-language"
          onChange={(e) =>
            setStudySessionData((prevData) => {
              return { ...prevData, language: e.target.value };
            })
          }
        >
          <option value="">Selecione</option>
          {availableLanguages.map((language) => (
            <option value={language.id} key={language.id}>
              {language.name}
            </option>
          ))}
        </Select>
      </FormGroup>
    </>
  );

  function handleStudySessionCreation() {
    if (!studySessionData.name || studySessionData.language === 0) {
      setErrorMessage("Um dos campos não está preenchido.");
    } else {
      api
        .post(
          "/study_sessions/",
          {
            language: studySessionData.language,
            name: studySessionData.name,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => Router.push("/study-session"));
    }
  }

  return (
    <Modal
      errorMessage={errorMessage}
      mainTitle="Sessão de Estudos"
      onCancelButton={onClick}
      onMainButton={handleStudySessionCreation}
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
