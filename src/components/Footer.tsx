import styled from "styled-components";
import useScreenSize from "@/hooks/useScreenSize";

import { MaterialSymbol } from "react-material-symbols";
import Image from "next/image";

import FacebookLogo from "/public/FacebookLogo.png";
import InstagramLogo from "/public/InstagramLogo.png";
import XLogo from "/public/XLogo.png";

export default function Footer() {
  const { width } = useScreenSize();
  const ankitLogoSize = width < 432 ? 70 : 125;

  return (
    <FooterContentContainer>
      <section className="logo-container">
        <h1>Ankit</h1>
        <MaterialSymbol
          className="ankit-logo"
          icon="package_2"
          color="var(--blue)"
          size={ankitLogoSize}
        />
      </section>
      <section className="contact-info-and-socials">
        <div className="contact-info">
          <h1>Contato</h1>
          <ul>
            <li>fernandes.gentilalysonjac@gmail.com</li>
            <li>fernandes.gentilkadsonjac@gmail.com</li>
          </ul>
        </div>
        <div className="socials">
          <Image
            src={InstagramLogo}
            width={30}
            height={30}
            alt="Instagram's camera"
          />
          <Image
            src={FacebookLogo}
            width={30}
            height={30}
            alt="Facebook's f logo"
          />
          <Image src={XLogo} width={30} height={30} alt="Twitter's x" />
        </div>
      </section>
    </FooterContentContainer>
  );
}

const FooterContentContainer = styled.footer`
  background: var(--darker-component);
  padding: 4.6875rem 4.375rem;

  display: flex;
  justify-content: space-between;

  .logo-container {
    display: flex;
    align-items: center;
    gap: 2rem;

    h1 {
      font-size: 6rem;
      color: var(--blue);
    }
  }

  .contact-info-and-socials {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .contact-info {
      ul {
        list-style: none;
      }
    }

    .socials {
      display: flex;
      align-items: center;
      gap: 0.625rem;
    }
  }

  @media (max-width: 432px) {
    flex-direction: column;
    align-items: center;
    gap: 2rem;

    .logo-container {
      justify-content: center;
      gap: 1rem;

      h1 {
        font-size: 3rem;
      }
    }

    .contact-info-and-socials {
      gap: 1.5rem;

      .contact-info {
        h1 {
          text-align: center;
        }
      }

      align-items: center;
    }
  }
`;
