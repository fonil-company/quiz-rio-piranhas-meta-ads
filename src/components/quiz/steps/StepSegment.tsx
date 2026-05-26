import { Sparkles, Pill, ShoppingBasket, Package, Scissors, Repeat, MoreHorizontal } from "lucide-react";
import { ChoiceStep } from "../ChoiceStep";

export function StepSegment({
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
      title="Qual segmento mais combina com seu negócio?"
      value={value}
      onSelect={onSelect}
      options={[
        { value: "cosmeticos", label: "Loja de cosméticos", icon: <Sparkles className="h-5 w-5" /> },
        { value: "farmacia", label: "Farmácia", icon: <Pill className="h-5 w-5" /> },
        { value: "mercado", label: "Mercado / Mercadinho", icon: <ShoppingBasket className="h-5 w-5" /> },
        { value: "variedades", label: "Loja de variedades", icon: <Package className="h-5 w-5" /> },
        { value: "salao", label: "Salão de beleza", icon: <Scissors className="h-5 w-5" /> },
        { value: "revenda", label: "Revenda", icon: <Repeat className="h-5 w-5" /> },
        { value: "outro", label: "Outro", icon: <MoreHorizontal className="h-5 w-5" /> },
      ]}
    />
  );
}
