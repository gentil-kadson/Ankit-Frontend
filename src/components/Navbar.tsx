import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import Router from "next/router";
import AuthContext, { cookies } from "@/context/AuthContext";

import Link from "next/link";
import { MaterialSymbol } from "react-material-symbols";
import ProfilePicture from "./ProfilePicture";
import NavDropdown from "./NavDropdown";

import NoProfilePicture from "/public/noProfilePicture.svg";

export default function Navbar() {
  const [displayDropdown, setDisplayDropDown] = useState<boolean>(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!cookies.get("accessToken")) {
      Router.push("/login");
    }
  }, []);

  const handleDropdown = () => {
    setDisplayDropDown((prevState) => !displayDropdown);
  };

  const handleProfilePicture = () => {
    if (user) {
      return user.student.profile_picture;
    }
    return NoProfilePicture;
  };

  return (
    <NavbarContainer>
      <span className="site-logo">
        <MaterialSymbol
          icon="package_2"
          weight={700}
          color="var(--blue)"
          size={86.12}
        />
        <span className="site-title">Ankit</span>
      </span>
      <ProfilePicture
        onClick={handleDropdown}
        src={handleProfilePicture()}
        width={80}
        height={80}
      />
      {displayDropdown && (
        <NavDropdown>
          <Link href="/me">Meu perfil</Link>
          <Link href="/statistics">Estatísticas</Link>
        </NavDropdown>
      )}
    </NavbarContainer>
  );
}

const NavbarContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  width: 100%;
  padding: 1rem 2.25rem;

  background-color: var(--component);

  .site-logo {
    display: flex;
    align-items: center;
    gap: 0.625rem;
  }

  .site-title {
    font-size: 3rem;
    font-weight: bold;
  }

  @media (max-width: 431px) {
    .site-title {
      display: none;
    }
  }
`;
