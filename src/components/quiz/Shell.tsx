import { ReactNode } from "react";
import logo from "@/assets/logo-rio-piranhas.png";
import { ArrowLeft, ShieldCheck } from "lucide-react";

interface ShellProps {
  step: number;
  totalSteps: number;
  children: ReactNode;
  showProgress?: boolean;
  onBack?: () => void;
}


export function Shell({ step, totalSteps, children, showProgress = true, onBack }: ShellProps) {
  const pct = Math.round((step / totalSteps) * 100);
  return (
    <div className="min-h-screen bg-gradient-soft bg-gradient-hero">
      <header className="mx-auto flex max-w-3xl items-center justify-between px-4 pt-5 sm:pt-8">
        <div className="flex items-center gap-2.5">
          <img
            src={logo}
            alt="Rio Piranhas Distribuidora"
            className="h-10 w-10 rounded-full shadow-soft"
            width={40}
            height={40}
          />
          <div className="leading-tight">
            <p className="text-[15px] font-extrabold tracking-tight text-foreground">
              Rio Piranhas
            </p>
            <p className="text-[11px] font-medium text-muted-foreground">
              Distribuidora Atacadista
            </p>
          </div>
        </div>
        <div className="hidden items-center gap-1.5 rounded-full border border-border bg-white/70 px-3 py-1.5 text-[11px] font-semibold text-brand-blue-deep shadow-soft backdrop-blur sm:inline-flex">
          <ShieldCheck className="h-3.5 w-3.5" />
          Distribuidora Autorizada
        </div>
      </header>

      {showProgress && (
        <div className="mx-auto mt-5 max-w-3xl px-4">
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onBack}
              disabled={!onBack}
              className="group inline-flex items-center gap-1.5 rounded-full border border-border bg-white/70 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-blue-deep shadow-soft backdrop-blur transition-all duration-200 hover:-translate-x-0.5 hover:border-brand-blue hover:text-brand-blue disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-x-0"
              aria-label="Voltar"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
              Voltar
            </button>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Etapa {step} de {totalSteps} · {pct}%
            </span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="relative h-full rounded-full bg-gradient-brand transition-[width] duration-700 ease-out"
              style={{ width: `${pct}%` }}
            >
              <span className="absolute inset-y-0 right-0 w-12 animate-pulse bg-white/30 blur-sm" />
            </div>
          </div>
        </div>
      )}


      <main className="mx-auto max-w-3xl px-4 py-6 sm:py-10">{children}</main>

      <footer className="mx-auto max-w-3xl px-4 pb-8 pt-2 text-center text-[11px] text-muted-foreground">
        © {new Date().getFullYear()} Rio Piranhas Distribuidora — Atendimento para empresas e revendedores.
      </footer>
    </div>
  );
}
