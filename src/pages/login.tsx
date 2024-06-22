import Select from "@/components/Select";

export default function Login() {
  return (
    <Select>
      <option value="">Escolha uma opção</option>
      <option value="camarão">Camarão</option>
      <option value="enguia">Enguia</option>
      <option value="peixe-espada">Peixe espada</option>
    </Select>
  );
}
