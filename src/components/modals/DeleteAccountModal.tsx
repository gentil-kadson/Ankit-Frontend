import styled from "styled-components";

import Modal from "./Modal";

const buttonsData = [
    {
        text: "Excluir",
        className: "danger-button",
        symbolIcon: "delete"
    },
    {
        text: "Cancelar"
    }
]

export default function DeleteAccountModal() {
    const formElements = (
        <Section>
            <h3>Tem certeza que deseja excluir a sua conta?</h3>
            <p>
                Após a exclusão, não será possível recuperá-la. Entretanto,
                você pode criar a conta novamente.
            </p>
        </Section>
    );

    return (
        <Modal
            mainTitle="Exclusão de Conta"
            subtitle="Apagar sua conta é irreversível"
            actionButtonsContent={buttonsData}
            modalForm={formElements}
        />
    )
}

const Section = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.8125;
`