import styled from "styled-components";
import { MaterialSymbol } from "react-material-symbols";

import Navbar from "@/components/Navbar";
import Button from "@/components/Button";
import FormGroup from "@/components/FormGroup";
import Select from "@/components/Select";
import LanguageStatisticsSection from "@/components/statistics/LanguageStatisticsSection";
import StreakHoursSection from "@/components/statistics/StreakHoursSection";

export default function Statistics() {
  return (
    <>
      <Navbar />
      <Main>
        <Header>
          <h2>Statistics</h2>
          <form method="get">
            <FormGroup>
              <Select>
                <option value="">Neste mês</option>
                <option value="">Últimos 6 meses</option>
                <option value="">Ano passado</option>
                <option value="">Nenhum</option>
              </Select>
            </FormGroup>
            <Button width="125px">
              <MaterialSymbol icon="filter_list" size={30} />
              Filtrar
            </Button>
          </form>
        </Header>
        <StreakHoursSection />
        <LanguageStatisticsSection />
      </Main>
    </>
  );
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 3.125rem;
  max-width: 77.5rem;
  margin: auto;
  padding: 3.75rem 0px;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;

  @media (max-width: 875px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  form {
    display: flex;
    align-items: center;
    gap: 1rem;

    @media (max-width: 875px) {
      flex-direction: column;
    }
  }
`;
