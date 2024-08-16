import styled from "styled-components";

type Props = {
  labelText: string;
  id: string;
  name: string;
  onClick?: () => void;
  defaultChecked?: boolean;
};

export default function Radio({
  labelText,
  id,
  onClick,
  defaultChecked,
  ...props
}: Props) {
  return (
    <RadioGroup onClick={onClick && onClick}>
      <CustomRadio
        type="radio"
        id={id}
        {...props}
        defaultChecked={defaultChecked ? true : false}
      />
      <CustomRadioLabel htmlFor={id}>{labelText}</CustomRadioLabel>
    </RadioGroup>
  );
}

const RadioGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  width: fit-content;
`;

const CustomRadioLabel = styled.label`
  font-weight: bold;
`;

const CustomRadio = styled.input`
  -webkit-appearance: none;
  appearance: none;
  background-color: initial;
  margin: 0;

  font: inherit;
  color: currentColor;
  width: 1.875rem;
  height: 1.875rem;
  border: 0.125rem solid var(--grey);
  border-radius: 50%;

  transform: translateY(0.1em);

  display: grid;
  place-content: center;

  &::before {
    content: "";
    width: 0.65em;
    height: 0.65em;
    border-radius: 50%;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em var(--blue);
  }

  &:checked::before {
    transform: scale(1);
  }

  &:hover {
    cursor: pointer;
  }
`;
