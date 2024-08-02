import styled from "styled-components";
import NoProfilePicture from "/public/noProfilePicture.svg";
import GoogleLogo from "/public/googleLogo.svg";

import ProfilePicture from "@/components/ProfilePicture";
import Button from "@/components/Button";
import { MaterialSymbol } from "react-material-symbols";
import ProfileInputsArea from "@/components/ProfileInputsArea";
import Image from "next/image";

export default function Me() {
  return (
    <Main>
      <div className="profile-picture">
        <figure>
          <ProfilePicture width={150} height={150} src={NoProfilePicture} />
        </figure>
        <div className="buttons-container">
          <Button width="16.4375rem">
            <MaterialSymbol icon="upload" color="var(--white)" fill size={25} />
            Upload Picture
          </Button>
          <Button width="16.4375rem" $inverted>
            <MaterialSymbol
              icon="no_photography"
              color="var(--blue)"
              size={25}
            />
            Remove Picture
          </Button>
        </div>
      </div>
      <div className="user-data">
        <ProfileInputsArea />
        <div className="action-buttons-container">
          <div className="left-side-buttons">
            <Button width="12.375rem" className="danger-button">
              Deletar Conta
            </Button>
            <Button width="12.375rem" $inverted>
              Remover Link{" "}
              <Image
                src={GoogleLogo}
                width={24}
                height={24}
                alt="G com cores da empresa Google"
              />
            </Button>
          </div>
          <Button width="12.0625rem">Save Changes</Button>
        </div>
      </div>
    </Main>
  );
}

const Main = styled.main`
  max-width: 1240px;
  margin: auto;
  padding-top: 3.75rem;
  padding-bottom: 5.8125rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5.375rem;

  figure {
    max-width: 12.5rem;
    max-height: 12.5rem;
  }

  .profile-picture {
    display: flex;
    flex-direction: column;
    gap: 1.75rem;
    align-items: center;

    .buttons-container {
      display: flex;
      gap: 1rem;
      align-items: center;
      justify-content: center;
    }
  }

  .user-data {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 7.6875rem;

    .action-buttons-container {
      display: flex;
      justify-content: space-between;
      align-items: center;

      width: 100%;

      .left-side-buttons {
        display: flex;
        align-items: center;
        gap: 1rem;
      }
    }
  }

  @media (max-width: 1000px) {
    gap: 2rem;

    .profile-picture {
      width: 100%;
      .buttons-container {
        width: inherit;
        flex-direction: column;
      }
    }

    .user-data {
      width: 100%;

      .action-buttons-container {
        flex-direction: column;
        gap: 1rem;

        .left-side-buttons {
          flex-direction: column;
          width: 100%;
        }
      }
    }
  }
`;
