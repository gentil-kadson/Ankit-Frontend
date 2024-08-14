import styled from "styled-components";

import SearchInput from "./SearchInput";
import Select from "./Select";
import Button from "./Button";
import { MaterialSymbol } from "react-material-symbols";

import { Language } from "@/services/LanguageService";
import StudySessionService, {
  StudySession,
} from "@/services/StudySessionService";
import { cookies } from "@/context/AuthContext";
import { FormEvent, useRef } from "react";

type Props = {
  languages: Language[];
  setSessions: (sessions: StudySession[]) => void;
};

export default function HomepageFilters({ languages, setSessions }: Props) {
  const filterFormRef = useRef<HTMLFormElement>(null);

  async function handleStudySessionsFilter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (filterFormRef.current) {
      const accessToken = cookies.get("accessToken");
      const studySessionService = new StudySessionService(accessToken);

      const {
        language: languageInput,
        study_session_name: studySessionNameInput,
      } = filterFormRef.current;
      const { data } = await studySessionService.getStudySessions({
        language: languageInput.value,
        name: studySessionNameInput.value,
      });

      for (const session of data) {
        session.duration_in_minutes =
          studySessionService.getDisplayDuration(session);
      }
      setSessions(data);
    }
  }

  return (
    <Container>
      <form
        onSubmit={handleStudySessionsFilter}
        className="language-filter-container"
        ref={filterFormRef}
        action="get"
      >
        <SearchInput />
        <Select name="language" width="12rem">
          <option value="">-------</option>
          {languages.map((language) => {
            return (
              <option key={language.id} value={language.id}>
                {language.name}
              </option>
            );
          })}
        </Select>
        <Button type="submit" width="7.8125rem">
          <MaterialSymbol icon="filter_list" size={22.5} fill />
          Filtrar
        </Button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 1rem;

  .language-filter-container {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  @media (max-width: 432px) {
    &,
    .language-filter-container {
      flex-direction: column;
      width: 100%;
    }
  }
`;
