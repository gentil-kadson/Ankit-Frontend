import { useEffect, useState } from "react";
import styled from "styled-components";
import Router from "next/router";
import { cookies } from "@/context/AuthContext";

import Link from "next/link";
import { MaterialSymbol } from "react-material-symbols";
import ProfilePicture from "./ProfilePicture";
import NavDropdown from "./NavDropdown";

import brazilFlag from "/public/brazilFlag.svg";

export default function Navbar() {
  const [displayDropdown, setDisplayDropDown] = useState<boolean>(false);
  useEffect(() => {
    if (!cookies.get("accessToken")) {
      Router.push("/login");
    }
  }, []);

  const handleDropdown = () => {
    setDisplayDropDown((prevState) => !displayDropdown);
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
        src={brazilFlag}
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
