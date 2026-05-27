import { Wallet } from "lucide-react";
import { ChoiceStep } from "../ChoiceStep";

export function StepBudget({
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
      title="Quanto você pretende investir na sua próxima compra?"
      value={value}
      onSelect={onSelect}
      options={[
        { value: "ate800", label: "Até R$ 800", icon: <Wallet className="h-5 w-5" /> },
        { value: "800a3k", label: "Entre R$ 800 e R$ 3.000", icon: <Wallet className="h-5 w-5" /> },
        { value: "3k10k", label: "Entre R$ 3.000 e R$ 10.000", icon: <Wallet className="h-5 w-5" /> },
        { value: "10k+", label: "Acima de R$ 10.000", icon: <Wallet className="h-5 w-5" /> },
      ]}
      footer={
        <div className="rounded-2xl border border-brand-yellow/50 bg-brand-yellow/20 px-4 py-3 text-sm font-semibold text-foreground">
          As melhores condições comerciais são liberadas para pedidos a partir de R$ 800.
        </div>
      }
    />
  );
}
