import { ArrowRight, Truck, ShieldCheck, Package, BadgeCheck } from "lucide-react";
import { StepWrapper } from "../StepWrapper";

const benefits = [
  "Produtos com alta procura",
  "Compra direto da distribuidora",
  "Frete grátis MA e PI",
  "Atendimento especializado",
  "Pedido inicial a partir de R$ 1.000",
];

export function StepIntro({ onStart, exploTag }: { onStart: () => void; exploTag?: string }) {
  return (
    <StepWrapper exploTag={exploTag}>
      <div className="grid gap-8 sm:gap-10">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-blue/20 bg-white/70 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-blue-deep shadow-soft backdrop-blur">
            <BadgeCheck className="h-3.5 w-3.5 text-brand-blue" />
            Distribuidora Autorizada
          </span>
          <h1 className="mt-4 text-balance text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
            Descubra oportunidades de{" "}
            <span className="relative inline-block">
              <span className="relative z-10">faturamento</span>
              <span className="absolute inset-x-0 bottom-1 -z-0 h-3 bg-brand-yellow/70 sm:bottom-2 sm:h-4" />
            </span>{" "}
            com produtos de alto giro
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-balance text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            Responda algumas perguntas rápidas e descubra como aumentar suas vendas
            comprando direto da distribuidora.
          </p>
        </div>

        <ul className="mx-auto grid w-full max-w-md gap-2">
          {benefits.map((b) => (
            <li
              key={b}
              className="flex items-center gap-3 rounded-xl border border-border bg-white/70 px-4 py-2.5 text-sm font-medium text-foreground shadow-soft backdrop-blur"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-yellow text-foreground">
                <BadgeCheck className="h-4 w-4" />
              </span>
              {b}
            </li>
          ))}
        </ul>

        <div className="flex flex-col items-center gap-4">
          <button
            type="button"
            onClick={onStart}
            className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-cta px-8 py-4 text-base font-extrabold text-foreground shadow-cta transition-all duration-200 hover:-translate-y-0.5 hover:shadow-glow active:translate-y-0"
          >
            Fazer análise gratuita
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] font-semibold text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-brand-blue" />Dados protegidos</span>
            <span className="inline-flex items-center gap-1.5"><Truck className="h-3.5 w-3.5 text-brand-blue" />Frete grátis MA e PI</span>
            <span className="inline-flex items-center gap-1.5"><Package className="h-3.5 w-3.5 text-brand-blue" />Direto da distribuidora</span>
          </div>
        </div>
      </div>
    </StepWrapper>
  );
}
