import styled from "styled-components";
import NoProfilePicture from "/public/noProfilePicture.svg";

import ProfilePicture from "@/components/ProfilePicture";
import Button from "@/components/Button";
import { MaterialSymbol } from "react-material-symbols";

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
      <div className="user-data"></div>
    </Main>
  );
}

const Main = styled.main`
  max-width: 1240px;
  margin: auto;
  border: 1px solid white;
  padding-top: 3.75rem;

  display: flex;
  flex-direction: column;
  align-items: center;

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
`;
