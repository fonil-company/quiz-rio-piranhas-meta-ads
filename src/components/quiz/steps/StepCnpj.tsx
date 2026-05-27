import { useMemo, useState } from "react";
import { ArrowRight, Lock, Truck, Package, ShieldCheck } from "lucide-react";
import { StepWrapper } from "../StepWrapper";

function maskCnpj(v: string) {
  const digits = v.replace(/\D/g, "").slice(0, 14);
  return digits
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
}

function isValid(v: string) {
  return v.replace(/\D/g, "").length === 14;
}

export function StepCnpj({
  value,
  onSubmit,
  exploTag,
}: {
  value?: string;
  onSubmit: (v: string) => void;
  exploTag?: string;
}) {
  const [v, setV] = useState(value ?? "");
  const valid = useMemo(() => isValid(v), [v]);

  return (
    <StepWrapper exploTag={exploTag}>
      <div className="mx-auto max-w-xl">
        <h2 className="text-balance text-2xl font-extrabold leading-tight tracking-tight text-foreground sm:text-3xl">
          Para liberar sua análise, informe seu CNPJ
        </h2>
        <p className="mt-2 text-[15px] text-muted-foreground">
          Atendimento destinado a empresas e revendedores formalizados.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (valid) onSubmit(v);
          }}
          className="mt-6 grid gap-4"
        >
          <div className="relative">
            <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              inputMode="numeric"
              autoComplete="off"
              placeholder="00.000.000/0000-00"
              value={v}
              onChange={(e) => setV(maskCnpj(e.target.value))}
              className="w-full rounded-2xl border border-border bg-white py-4 pl-11 pr-4 text-base font-semibold tracking-wide text-foreground shadow-soft outline-none transition focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/15"
            />
            {valid && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-brand-blue px-2 py-0.5 text-[10px] font-bold text-white">
                OK
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={!valid}
            className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-cta px-6 py-4 text-base font-extrabold text-foreground shadow-cta transition-all duration-200 hover:-translate-y-0.5 hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
          >
            Continuar
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>

          <div className="grid grid-cols-3 gap-2 pt-2">
            {[
              { icon: <ShieldCheck className="h-4 w-4" />, label: "Dados protegidos" },
              { icon: <Truck className="h-4 w-4" />, label: "Frete grátis MA e PI" },
              { icon: <Package className="h-4 w-4" />, label: "Direto da distribuidora" },
            ].map((b) => (
              <div
                key={b.label}
                className="flex flex-col items-center gap-1 rounded-xl border border-border bg-white/70 px-2 py-3 text-center text-[11px] font-semibold text-muted-foreground shadow-soft backdrop-blur"
              >
                <span className="text-brand-blue">{b.icon}</span>
                {b.label}
              </div>
            ))}
          </div>
        </form>
      </div>
    </StepWrapper>
  );
}
