import styled from "styled-components"

import StatisticsCard from "./StatisticsCard"
import LanguageStatisticRow from "./LanguageStatisticRow"

import brazilFlag from "/public/brazilFlag.svg"

export default function LanguageStatisticsSection() {
    return (
        <Container>
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
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    gap: 15.625rem;

    @media(max-width: 875px) {
        flex-direction: column;
        align-items: center;
    }
`