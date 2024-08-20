import styled from "styled-components";

import Image from "next/image";
import SelectArrow from "/public/images/selectInputArrow.svg";

type Props = {
  width: number;
  onClick: () => void;
};

export default function ShowMoreButton({ width, onClick }: Props) {
  const showMoreElement =
    width <= 431 ? (
      <MobileButtonContainer>
        <button onClick={onClick} id="mobile-show-more">
          <Image
            src={SelectArrow}
            width={40}
            height={40}
            alt="Uma seta que aponta para baixo"
          />
        </button>
      </MobileButtonContainer>
    ) : (
      <Button onClick={onClick}>Mostar mais</Button>
    );

  return showMoreElement;
}

const MobileButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  button {
    background: transparent;
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  position: sticky;
  left: 42%;
  bottom: 0;

  width: 13rem;
  padding: 1.0625rem 0rem;
  border: none;
  border-radius: 0.625rem;

  background: var(--blue);
  -webkit-box-shadow: 0px 10px 19px -1px rgba(0, 0, 0, 0.34);
  -moz-box-shadow: 0px 10px 19px -1px rgba(0, 0, 0, 0.34);
  box-shadow: 0px 10px 19px -1px rgba(0, 0, 0, 0.34);

  color: var(--white);
  font-size: 1.25rem;
  font-weight: bold;

  @media (max-width: 432px) {
    align-self: center;
  }
`;
