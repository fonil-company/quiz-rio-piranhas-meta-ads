import { TrendingUp, Store, Percent, Layers, Handshake } from "lucide-react";
import { ChoiceStep } from "../ChoiceStep";

export function StepGoal({
  value,
  onSelect,
  exploTag,
}: {
  value?: string;
  onSelect: (v: string) => void;
  exploTag?: string;
}) {
  return (
    <ChoiceStep
      exploTag={exploTag}
      title="O que você busca hoje?"
      subtitle="Escolha a opção que mais combina com seu momento."
      value={value}
      onSelect={onSelect}
      options={[
        { value: "renda", label: "Aumentar minha renda revendendo produtos", icon: <TrendingUp className="h-5 w-5" /> },
        { value: "loja", label: "Comprar para abastecer minha loja", icon: <Store className="h-5 w-5" /> },
        { value: "margem", label: "Encontrar produtos com maior margem", icon: <Percent className="h-5 w-5" /> },
        { value: "mix", label: "Ampliar meu mix de produtos", icon: <Layers className="h-5 w-5" /> },
        { value: "fornecedor", label: "Encontrar um fornecedor de confiança", icon: <Handshake className="h-5 w-5" /> },
      ]}
    />
  );
}
