import styled from "styled-components";
import { MaterialSymbol, SymbolCodepoints } from "react-material-symbols";

type Props = {
  onClick: () => {};
  icon: SymbolCodepoints;
  disabled?: boolean;
};

export default function StudySessionActionButton({
  onClick,
  icon,
  ...props
}: Props) {
  return (
    <Button onClick={onClick} {...props}>
      <MaterialSymbol icon={icon} size={24} fill />
    </Button>
  );
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
