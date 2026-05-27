import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { StepWrapper } from "../StepWrapper";

const phrases = [
  "Identificando categorias com alta procura",
  "Avaliando potencial de revenda",
  "Verificando disponibilidade logística",
  "Cruzando oportunidades comerciais",
  "Finalizando análise",
];

export function StepProcessing({ onDone, exploTag }: { onDone: () => void; exploTag?: string }) {
  const [progress, setProgress] = useState(0);
  const [idx, setIdx] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setProgress((p) => {
        const next = p + 2;
        if (next >= 100) {
          clearInterval(t);
          setDone(true);
          return 100;
        }
        return next;
      });
    }, 90);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % phrases.length), 1400);
    return () => clearInterval(t);
  }, []);

  return (
    <StepWrapper exploTag={exploTag}>
      <div className="mx-auto max-w-xl text-center">
        <h2 className="text-balance text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
          {done ? "Análise concluída" : "Estamos analisando seu perfil"}
        </h2>
        <p className="mt-2 text-[15px] text-muted-foreground">
          Comparando suas respostas com oportunidades de maior giro disponíveis para sua região.
        </p>

        <div className="mt-8 rounded-3xl border border-border bg-white/70 p-6 shadow-soft backdrop-blur">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <span>Processando</span>
            <span className="text-brand-blue-deep">{progress}%</span>
          </div>
          <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-gradient-brand transition-[width] duration-200 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <ul className="mt-6 space-y-2 text-left">
            {phrases.map((p, i) => {
              const completed = i < idx || done;
              const active = i === idx && !done;
              return (
                <li
                  key={p}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition ${
                    active
                      ? "bg-brand-blue-soft text-brand-blue-deep"
                      : completed
                        ? "text-foreground"
                        : "text-muted-foreground/60"
                  }`}
                >
                  {completed ? (
                    <CheckCircle2 className="h-4 w-4 text-brand-blue" />
                  ) : active ? (
                    <Loader2 className="h-4 w-4 animate-spin text-brand-blue" />
                  ) : (
                    <span className="h-4 w-4 rounded-full border border-border" />
                  )}
                  {p}
                </li>
              );
            })}
          </ul>
        </div>

        {done && (
          <div className="mt-6 grid gap-4">
            <div className="rounded-2xl border border-brand-blue/30 bg-brand-blue-soft px-4 py-3 text-sm font-semibold text-brand-blue-deep">
              ✅ Encontramos oportunidades compatíveis com seu perfil.
            </div>
            <button
              type="button"
              onClick={onDone}
              className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-cta px-6 py-4 text-base font-extrabold text-foreground shadow-cta transition-all duration-200 hover:-translate-y-0.5 hover:shadow-glow"
            >
              Continuar
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        )}
      </div>
    </StepWrapper>
  );
}
