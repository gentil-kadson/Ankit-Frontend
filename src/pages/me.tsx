import { useState, useRef } from "react";

import styled from "styled-components";
import NoProfilePicture from "/public/noProfilePicture.svg";

import ProfilePicture from "@/components/ProfilePicture";
import Button from "@/components/Button";
import { MaterialSymbol } from "react-material-symbols";
import ProfileInputsArea from "@/components/ProfileInputsArea";
import Navbar from "@/components/Navbar";
import ApiMessage from "@/components/ApiMessage";

import UserService from "@/services/UserService";
import { StudentService } from "@/services/StudentService";
import NationalityService from "@/services/NationalityService";
import { HTTP_200_OK, SUCCESS_MESSAGE_TIMEOUT } from "@/utils/constants";
import { cookies } from "@/context/AuthContext";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const accessToken = ctx.req.cookies.accessToken
    ? ctx.req.cookies.accessToken
    : "";
  const userService = new UserService(accessToken);
  const response = await userService.getMe();

  const nationalityService = new NationalityService();
  const nationalitiesResponse = await nationalityService.getNationalities();

  if (response.status === HTTP_200_OK) {
    return {
      props: { user: response.data, nationalities: nationalitiesResponse.data },
    };
  } else {
    return { props: { user: null, nationalities: nationalitiesResponse.data } };
  }
};

export default function Me({
  user,
  nationalities,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const uploadPictureRef = useRef<HTMLInputElement>(null);

  async function handleProfilePictureUpload() {
    if (uploadPictureRef.current && uploadPictureRef.current.files) {
      const file = uploadPictureRef.current.files[0];
      const accessToken = cookies.get("accessToken");
      const studentService = new StudentService(accessToken);
      const response = await studentService.updateStudent(
        { profile_picture: file },
        user.student.id
      );

      if (response.status === HTTP_200_OK) {
        setSuccessMessage("Foto atualizada com sucesso!");
        setTimeout(() => {
          setSuccessMessage("");
        }, SUCCESS_MESSAGE_TIMEOUT);
      } else {
        const errors = Object.values(response.data)
          .flat()
          .filter((value) => typeof value === "string");
        setErrorMessages(errors);
      }
    }
  }

  return (
    <>
      <Navbar />
      {user && (
        <Main>
          {successMessage && (
            <ApiMessage category="success">{successMessage}</ApiMessage>
          )}
          {errorMessages &&
            errorMessages.map((message, idx) => {
              return (
                <ApiMessage key={idx} category="error">
                  {message}
                </ApiMessage>
              );
            })}
          <div className="profile-picture">
            <figure>
              <ProfilePicture
                width={150}
                height={150}
                src={user.student.profile_picture || NoProfilePicture}
              />
            </figure>
            <div className="buttons-container">
              <Button width="16.4375rem">
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    cursor: "pointer",
                  }}
                  htmlFor="profile_picture"
                >
                  <MaterialSymbol
                    icon="upload"
                    color="var(--white)"
                    fill
                    size={25}
                  />
                  Adicionar Foto
                </label>
              </Button>
              <input
                style={{ display: "none" }}
                type="file"
                name="profile_picture"
                id="profile_picture"
                onChange={handleProfilePictureUpload}
                ref={uploadPictureRef}
              />
              <Button width="16.4375rem" $inverted>
                <MaterialSymbol
                  icon="no_photography"
                  color="var(--blue)"
                  size={25}
                />
                Remover Foto
              </Button>
            </div>
          </div>
          <div className="user-data">
            <ProfileInputsArea
              setErrorMessages={setErrorMessages}
              setSuccessMessage={setSuccessMessage}
              user={user}
              nationalities={nationalities}
            />
          </div>
        </Main>
      )}
    </>
  );
}

const Main = styled.main`
  max-width: 1240px;
  margin: auto;
  padding-top: 4.75rem;
  padding-bottom: 4rem;

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
    }
  }
`;
