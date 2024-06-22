import styled from "styled-components";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

type Props = {
  src: string | StaticImport;
  alt: string;
  language: string;
};

export default function FlagItem({ src, alt, language }: Props) {
  return (
    <LanguageFlagItem>
      <Image width={60} height={60} src={src} alt={alt} />
      <span>{language}</span>
    </LanguageFlagItem>
  );
}

const LanguageFlagItem = styled.p`
  color: var(--white);
  font-weight: bold;

  span {
    padding-left: 1.125rem;
  }
`;
