import styled from "styled-components";
import NoProfilePicture from "/public/noProfilePicture.svg";

import ProfilePicture from "@/components/ProfilePicture";
import Button from "@/components/Button";
import { MaterialSymbol } from "react-material-symbols";
import ProfileInputsArea from "@/components/ProfileInputsArea";

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
        <Button width="12.0625rem">Save Changes</Button>
      </div>
    </Main>
  );
}

const Main = styled.main`
  max-width: 1240px;
  margin: auto;
  padding-top: 3.75rem;
  padding-bottom: 5.8125rem;

  border: 1px solid white;

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

    button {
      align-self: flex-end;
    }
  }
`;
