import styled from "styled-components";

import SearchInput from "./SearchInput";
import Select from "./Select";
import Button from "./Button";
import { MaterialSymbol } from "react-material-symbols";

export default function HomepageFilters() {
  return (
    <Container>
      <SearchInput />
      <form className="language-filter-container">
        <Select width="12rem">
          <option value="english">Inglês</option>
          <option value="german">Alemão</option>
          <option value="japanese">Japonês</option>
        </Select>
        <Button width="7.8125rem">
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
