import styled from "styled-components";

export default function ShowMoreButton() {
  return <Button>Mostar mais</Button>;
}

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

  @media (max-width: 431px) {
    display: none;
  }
`;
