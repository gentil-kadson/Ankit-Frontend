import styled from "styled-components";

import { MaterialSymbol } from "react-material-symbols";

export default function SearchInput() {
  return (
    <Container>
      <input
        type="text"
        name="study_session_name"
        id="study_session_name"
        placeholder="The Whale..."
      />
      <div className="search-icon-container">
        <MaterialSymbol icon="search" color="var(--white)" size={24} />
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;

  position: relative;

  input {
    display: flex;
    align-items: center;

    width: 100%;
    padding: 0.75rem;
    padding-right: 2.2rem;

    font-weight: normal;
  }

  .search-icon-container {
    position: absolute;
    right: 4%;
  }

  @media (max-width: 432px) {
    width: 100%;
    input {
      width: 100%;
    }
  }
`;
