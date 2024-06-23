import React from "react";
import styled from "styled-components";

type Props = {
  children: React.ReactNode;
};

export default function NavDropdown({ children }: Props) {
  return <NavDropdownContainer>{children}</NavDropdownContainer>;
}

const NavDropdownContainer = styled.nav`
  display: flex;
  flex-direction: column;
  position: absolute;
  gap: 1.1875rem;
  right: 2.5rem;
  top: 6.25rem;

  background-color: var(--darker-component);
  border-radius: 0.875rem;

  width: 14.6875rem;

  * {
    padding: 0.625rem;
    color: var(--white);
    font-weight: bold;
    text-decoration: none;
  }

  *:first-child {
    border-radius: 0.875rem 0px 0px;
  }

  *:last-child {
    border-radius: 0px 0px 0.875rem;
  }

  *:hover {
    background-color: var(--blue);
  }

  *:visited {
    text-decoration: none;
    color: var(--white);
  }
`;
