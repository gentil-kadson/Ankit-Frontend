import styled from "styled-components";
import { MaterialSymbol } from "react-material-symbols";

import Navbar from "@/components/Navbar";
import Button from "@/components/Button";
import ProfilePicture from "@/components/ProfilePicture";
import StatisticsCard from "@/components/statistics/StatisticsCard";
import LanguageStatisticRow from "@/components/statistics/LanguageStatisticRow";
import StreakStudyRow from "@/components/statistics/StreakStudy";

import brazilFlag from "/public/brazilFlag.svg";

export default function Statistics() {
    return (
    <>
        <Navbar />
        <Main>
            <Header>
                <h2>Statistics</h2>
                <Button width="125px">
                    <MaterialSymbol icon="filter_list" size={30}/>
                    Filtrar
                </Button>
            </Header>
            <StreakHoursSection>
                <ProfilePicture src={brazilFlag} width={194} height={194}/>
                <StatisticsCard>
                    <StreakStudyRow icon="trending_flat" text="Maior Ofensiva" number={25}/>
                    <StreakStudyRow icon="local_fire_department" text="Ofensiva Atual" number={25}/>
                    <StreakStudyRow icon="alarm" text="Tempo de Estudo (min)" number={25}/>
                </StatisticsCard>
            </StreakHoursSection>
            <LanguageStatisticsSection>
                <StatisticsCard title="Quantidade de Cards por Idioma">
                    <LanguageStatisticRow flagSrc={brazilFlag} alt="brazil-flag" language="Portuguese" number={25}/>
                    <LanguageStatisticRow flagSrc={brazilFlag} alt="brazil-flag" language="Portuguese" number={25}/>
                    <LanguageStatisticRow flagSrc={brazilFlag} alt="brazil-flag" language="Portuguese" number={25}/>
                    <LanguageStatisticRow flagSrc={brazilFlag} alt="brazil-flag" language="Portuguese" number={25}/>
                </StatisticsCard>
                <StatisticsCard title="Sessões de Estudo por Idioma">
                    <LanguageStatisticRow flagSrc={brazilFlag} alt="brazil-flag" language="Portuguese" number={25}/>
                    <LanguageStatisticRow flagSrc={brazilFlag} alt="brazil-flag" language="Portuguese" number={25}/>
                    <LanguageStatisticRow flagSrc={brazilFlag} alt="brazil-flag" language="Portuguese" number={25}/>
                    <LanguageStatisticRow flagSrc={brazilFlag} alt="brazil-flag" language="Portuguese" number={25}/>
                </StatisticsCard>
            </LanguageStatisticsSection>
        </Main>
    </> 
    )
}

const Main = styled.main`
    display: flex;
    flex-direction: column;
    gap: 3.125rem;
    max-width: 77.5rem;
    margin: auto;
    padding: 3.75rem 0px;
`

const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    
    @media(max-width: 875px) {
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }
`

const StreakHoursSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.9375rem;
`

const LanguageStatisticsSection = styled.div`
    display: flex;
    justify-content: center;
    gap: 15.625rem;

    @media(max-width: 875px) {
        flex-direction: column;
        align-items: center;
    }
`