import { ReactNode } from "react";
import { StepWrapper } from "./StepWrapper";
import { OptionCard } from "./OptionCard";

interface Option {
  value: string;
  label: string;
  icon?: ReactNode;
}

interface Props {
  title: string;
  subtitle?: string;
  options: Option[];
  value?: string;
  onSelect: (v: string) => void;
  footer?: ReactNode;
  exploTag?: string;
}

export function ChoiceStep({ title, subtitle, options, value, onSelect, footer, exploTag }: Props) {
  return (
    <StepWrapper exploTag={exploTag}>
      <div className="mx-auto max-w-xl">
        <h2 className="text-balance text-2xl font-extrabold leading-tight tracking-tight text-foreground sm:text-3xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-[15px] text-muted-foreground">{subtitle}</p>
        )}
        <div className="mt-6 grid gap-3">
          {options.map((o) => (
            <OptionCard
              key={o.value}
              label={o.label}
              icon={o.icon}
              selected={value === o.value}
              onClick={() => onSelect(o.value)}
            />
          ))}
        </div>
        {footer && <div className="mt-5">{footer}</div>}
      </div>
    </StepWrapper>
  );
}
