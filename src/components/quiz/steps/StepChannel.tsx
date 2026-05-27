import { Store, Globe, Users, Rocket, Building2 } from "lucide-react";
import { ChoiceStep } from "../ChoiceStep";

export function StepChannel({
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
      title="Como você pretende vender esses produtos?"
      value={value}
      onSelect={onSelect}
      options={[
        { value: "fisica", label: "Tenho loja física", icon: <Store className="h-5 w-5" /> },
        { value: "online", label: "Tenho loja online", icon: <Globe className="h-5 w-5" /> },
        { value: "revendo", label: "Revendo para clientes", icon: <Users className="h-5 w-5" /> },
        { value: "comecar", label: "Quero começar a revender", icon: <Rocket className="h-5 w-5" /> },
        { value: "estabelecimento", label: "Compro para meu estabelecimento", icon: <Building2 className="h-5 w-5" /> },
      ]}
    />
  );
}
