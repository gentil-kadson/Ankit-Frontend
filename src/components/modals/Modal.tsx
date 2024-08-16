import React from "react";
import styled from "styled-components";
import { MaterialSymbol } from "react-material-symbols";
import { SymbolCodepoints } from "react-material-symbols";

import Button from "../Button";

type ActionButton = {
  symbolIcon?: SymbolCodepoints;
  className?: string;
  text: string;
};

type Message = {
  type: "success" | "error";
  message: string;
};

type Props = {
  mainTitle: string;
  subtitle: React.ReactNode;
  modalForm: React.ReactNode;
  actionButtonsContent: ActionButton[];
  onCancelButton: () => void;
  onMainButton: () => void;
  messageObj: Message;
};

export default function Modal({
  mainTitle,
  subtitle,
  modalForm,
  actionButtonsContent,
  messageObj,
  onCancelButton,
  onMainButton,
}: Props) {
  return (
    <Section className="modal">
      {messageObj.type === "success" && messageObj.message && (
        <p className="success-message">{messageObj.message}</p>
      )}
      <div className="titles">
        <h1>{mainTitle}</h1>
        <h2>{subtitle}</h2>
      </div>
      <main>{modalForm}</main>
      <div className="action-buttons">
        <Button
          width="11.625rem"
          onClick={onMainButton}
          className={
            actionButtonsContent[0].className
              ? actionButtonsContent[0].className
              : ""
          }
        >
          {actionButtonsContent[0].symbolIcon && (
            <MaterialSymbol
              icon={actionButtonsContent[0].symbolIcon}
              size={27.52}
            />
          )}
          {actionButtonsContent[0].text}
        </Button>
        <Button width="11.625rem" $inverted onClick={onCancelButton}>
          {actionButtonsContent[1].text}
        </Button>
      </div>
      {messageObj.type === "error" && messageObj.message && (
        <p className="error-message">{messageObj.message}</p>
      )}
    </Section>
  );
}

const Section = styled.section`
  max-width: 646px;
  min-height: 604px;
  border-radius: 1.25rem;
  padding: 2.8125rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  position: fixed;
  transform: translateX(85%);
  background-color: var(--darker-component);
  z-index: 3;
  top: 15%;

  -webkit-box-shadow: 0px 0.375rem 0.3125 0.1875rem rgba(0, 0, 0, 0.43);
  -moz-box-shadow: 0px 0.375rem 0.3125 0.1875rem rgba(0, 0, 0, 0.43);
  box-shadow: 0px 0.375rem 0.3125 0.1875rem rgba(0, 0, 0, 0.43);

  main {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    min-height: 16.3125rem;
  }

  strong {
    color: var(--blue);
  }

  .titles {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;

    h1 {
      font-size: 2rem;
    }
    h2 {
      font-size: 1.25rem;
    }
  }

  .action-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4.6875rem;
  }

  .error-message {
    padding: 0.5rem;
    border-radius: 0.5rem;
    background: var(--red);
  }

  .success-message {
    padding: 0.5rem;
    border-radius: 0.5rem;
    background: var(--green);
  }

  @media (max-width: 432px) {
    max-height: 400px;
    max-width: 100%;
    top: 10%;
    right: 85%;

    .titles {
      h1 {
        font-size: 1.5rem;
      }

      h2 {
        font-size: 1rem;
      }
    }

    &,
    .action-buttons,
    button,
    main {
      width: 100%;
    }

    main {
      justify-content: center;
      gap: 1rem;
      overflow: auto;

      div {
        width: 100%;
      }
    }

    .action-buttons {
      flex-direction: column;
      gap: 0.5rem;
    }
  }
`;
