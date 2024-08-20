import styled from "styled-components";

type Props = {
  children: React.ReactNode;
  $black?: boolean;
  width: string;
  onClick: () => void;
};

export default function StudySessionButton({
  children,
  width,
  onClick,
  ...props
}: Props) {
  return (
    <Button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      width={width}
      {...props}
    >
      {children}
    </Button>
  );
}

const Button = styled.button<{ $black?: boolean; width: string }>`
  border: none;
  border-radius: 0.625rem;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  background: ${(props) => (props.$black ? "var(--component)" : "var(--blue)")};
  width: ${(props) => props.width};
  padding: 0.8125rem 0rem;

  color: var(--white);
  font-size: 1.25rem;
  font-weight: bold;
`;
