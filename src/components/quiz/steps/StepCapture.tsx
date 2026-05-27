import { useState } from "react";
import { ArrowRight, Truck, Wallet } from "lucide-react";
import { StepWrapper } from "../StepWrapper";
import { Answers } from "../types";

const STATES = [
  { value: "PI", label: "Piauí" },
  { value: "MA", label: "Maranhão" },
];

function maskPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 10) {
    return d.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{4})(\d)/, "$1-$2");
  }
  return d.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");
}

interface Props {
  answers: Answers;
  onSubmit: (v: Partial<Answers>) => Promise<void> | void;
  exploTag?: string;
}

export function StepCapture({ answers, onSubmit, exploTag }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [form, setForm] = useState({
    name: answers.name ?? "",
    whatsapp: answers.whatsapp ?? "",
    email: answers.email ?? "",
    city: answers.city ?? "",
    state: answers.state ?? "",
  });

  const valid =
    form.name.trim().length >= 3 &&
    form.whatsapp.replace(/\D/g, "").length >= 10 &&
    /\S+@\S+\.\S+/.test(form.email) &&
    form.city.trim().length >= 2 &&
    form.state.length === 2;

  return (
    <StepWrapper exploTag={exploTag}>
      <div className="mx-auto max-w-xl">
        <div className="text-center">
          <span className="inline-flex rounded-full bg-brand-yellow/30 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-foreground">
            Análise pronta
          </span>
          <h2 className="mt-3 text-balance text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            Sua análise está pronta
          </h2>
          <p className="mt-2 text-[15px] text-muted-foreground">
            Preencha seus dados para liberar seu acesso às oportunidades de maior giro disponíveis para sua região.
          </p>
        </div>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (!valid || isSubmitting) return;
            setSubmitError("");
            setIsSubmitting(true);
            try {
              await onSubmit(form);
            } catch {
              setSubmitError("Nao foi possivel enviar agora. Confira sua conexao e tente novamente.");
              setIsSubmitting(false);
            }
          }}
          className="mt-6 grid gap-3 rounded-3xl border border-border bg-white/80 p-5 shadow-soft backdrop-blur sm:p-6"
        >
          <Field label="Nome completo">
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Seu nome"
              className={inputCls}
              maxLength={120}
            />
          </Field>
          <Field label="WhatsApp">
            <input
              inputMode="numeric"
              value={form.whatsapp}
              onChange={(e) => setForm({ ...form, whatsapp: maskPhone(e.target.value) })}
              placeholder="(00) 00000-0000"
              className={inputCls}
            />
          </Field>
          <Field label="E-mail">
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="voce@empresa.com"
              className={inputCls}
              maxLength={160}
            />
          </Field>
          <div className="grid grid-cols-[1fr_110px] gap-3">
            <Field label="Cidade">
              <input
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                placeholder="Sua cidade"
                className={inputCls}
                maxLength={80}
              />
            </Field>
            <Field label="Estado">
              <select
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
                className={inputCls}
              >
                <option value="">UF</option>
                {STATES.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </Field>
          </div>

          <button
            type="submit"
            disabled={!valid || isSubmitting}
            className="group mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-cta px-6 py-4 text-base font-extrabold uppercase tracking-wide text-foreground shadow-cta transition-all duration-200 hover:-translate-y-0.5 hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
          >
            {isSubmitting ? "Liberando sua análise" : "Liberar minha análise"}
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
          {submitError && (
            <p className="text-center text-sm font-semibold text-red-600">
              {submitError}
            </p>
          )}
        </form>

        <div className="mt-5 rounded-3xl border border-border bg-white/70 p-5 shadow-soft backdrop-blur">
          <p className="text-[11px] font-bold uppercase tracking-wider text-brand-blue-deep">
            O que você vai receber
          </p>
          <ul className="mt-3 grid gap-1.5 text-sm font-medium text-foreground">
            {[
              "Catálogo atualizado",
              "Produtos com alta procura",
              "Sugestões de categorias",
              "Condições comerciais",
              "Atendimento especializado",
            ].map((b) => (
              <li key={b} className="flex items-center gap-2">
                <span className="text-brand-blue">✓</span> {b}
              </li>
            ))}
          </ul>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Pill icon={<Wallet className="h-4 w-4" />} label="Pedido inicial R$ 1.000" />
            <Pill icon={<Truck className="h-4 w-4" />} label="Frete grátis MA e PI" />
          </div>
        </div>
      </div>
    </StepWrapper>
  );
}

const inputCls =
  "w-full rounded-xl border border-border bg-white px-4 py-3 text-[15px] font-medium text-foreground outline-none transition focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/15";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-1.5">
      <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}

function Pill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-xl bg-brand-yellow/25 px-3 py-2 text-[12px] font-bold text-foreground">
      <span className="text-foreground">{icon}</span>
      {label}
    </div>
  );
}
