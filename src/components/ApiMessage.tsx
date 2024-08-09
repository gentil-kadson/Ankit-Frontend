import styled from "styled-components";

type Props = {
  children: React.ReactNode;
  category: "success" | "error";
};

export default function ApiMessage({ children, category }: Props) {
  return <Message category={category}>{children}</Message>;
}

const Message = styled.p<{
  category: string
}>`
  font-size: 16px;
  background-color: ${(props) => {
    return props.category === "success" ? "var(--green)" : "var(--red)"
  }};
  border-radius: 10px;
  padding: 10px;
`;
