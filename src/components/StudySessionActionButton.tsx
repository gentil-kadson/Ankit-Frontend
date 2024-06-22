import styled from "styled-components";

type Props = {
  children: React.ReactNode;
  onClick: () => {};
};

export default function StudySessionActionButton({ children, onClick }: Props) {
  return <Button onClick={onClick}>{children}</Button>;
}

const Button = styled.button`
  min-width: 1.5rem;
  min-height: 1.5rem;
  background: var(--component);

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  :hover {
    background: var(--material-grey);
    border-radius: 20%;
  }
`;
