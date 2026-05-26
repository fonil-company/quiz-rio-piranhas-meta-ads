import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface OptionCardProps {
  label: string;
  icon?: React.ReactNode;
  selected?: boolean;
  onClick: () => void;
}

export function OptionCard({ label, icon, selected, onClick }: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative flex w-full items-center gap-3 rounded-2xl border bg-white/80 p-4 text-left text-[15px] font-semibold text-foreground shadow-soft backdrop-blur transition-all duration-200",
        "hover:-translate-y-0.5 hover:border-brand-blue hover:shadow-glow",
        selected
          ? "border-brand-blue bg-brand-blue-soft ring-2 ring-brand-blue/40"
          : "border-border"
      )}
    >
      {icon && (
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-blue-soft text-brand-blue-deep transition group-hover:bg-brand-blue group-hover:text-white">
          {icon}
        </span>
      )}
      <span className="flex-1">{label}</span>
      <span
        className={cn(
          "flex h-6 w-6 items-center justify-center rounded-full border-2 transition",
          selected
            ? "border-brand-blue bg-brand-blue text-white"
            : "border-border text-transparent"
        )}
      >
        <Check className="h-3.5 w-3.5" strokeWidth={3} />
      </span>
    </button>
  );
}
