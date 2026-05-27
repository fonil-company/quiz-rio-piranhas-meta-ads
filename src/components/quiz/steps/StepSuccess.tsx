import { CheckCircle2, MessageCircle, Phone } from "lucide-react";
import { StepWrapper } from "../StepWrapper";
import { Answers } from "../types";

const CONSULTANTS = {
  PI: "558694271798",
  MA: "558695319157",
} as const;

const labels = {
  goal: {
    renda: "Aumentar minha renda revendendo produtos",
    loja: "Comprar para abastecer minha loja",
    margem: "Encontrar produtos com maior margem",
    mix: "Ampliar meu mix de produtos",
    fornecedor: "Encontrar um fornecedor de confiança",
  },
  channel: {
    fisica: "Tenho loja física",
    online: "Tenho loja online",
    revendo: "Revendo para clientes",
    comecar: "Quero começar a revender",
    estabelecimento: "Compro para meu estabelecimento",
  },
  segment: {
    cosmeticos: "Loja de cosméticos",
    farmacia: "Farmácia",
    mercado: "Mercado / Mercadinho",
    variedades: "Loja de variedades",
    salao: "Salão de beleza",
    revenda: "Revenda",
    outro: "Outro",
  },
  budget: {
    ate1k: "Até R$ 1.000",
    "1k3k": "Entre R$ 1.000 e R$ 3.000",
    "3k10k": "Entre R$ 3.000 e R$ 10.000",
    "10k+": "Acima de R$ 10.000",
  },
} as const;

function getLabel<T extends keyof typeof labels>(group: T, value?: string) {
  if (!value) return "-";
  return labels[group][value as keyof (typeof labels)[T]] ?? value;
}

function buildWhatsAppLink(answers: Answers) {
  const state = (answers.state === "MA" ? "MA" : "PI") as keyof typeof CONSULTANTS;
  const message = [
    "Olá! Acabei de preencher o quiz da Rio Piranhas e quero falar com um consultor.",
    "",
    `Nome: ${answers.name || "-"}`,
    `WhatsApp: ${answers.whatsapp || "-"}`,
    `E-mail: ${answers.email || "-"}`,
    `Cidade/UF: ${answers.city || "-"} - ${answers.state || "-"}`,
    `CNPJ: ${answers.cnpj || "-"}`,
    "",
    "Respostas do quiz:",
    `Objetivo: ${getLabel("goal", answers.goal)}`,
    `Canal de venda: ${getLabel("channel", answers.channel)}`,
    `Segmento: ${getLabel("segment", answers.segment)}`,
    `Investimento: ${getLabel("budget", answers.budget)}`,
  ].join("\n");

  return `https://wa.me/${CONSULTANTS[state]}?text=${encodeURIComponent(message)}`;
}

export function StepSuccess({ answers, exploTag }: { answers: Answers; exploTag?: string }) {
  const first = (answers.name ?? "").split(" ")[0];
  const whatsappLink = buildWhatsAppLink(answers);

  return (
    <StepWrapper exploTag={exploTag}>
      <div className="mx-auto max-w-xl text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-brand shadow-glow">
          <CheckCircle2 className="h-10 w-10 text-white" />
        </div>
        <h2 className="mt-6 text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          {first ? `${first}, sua análise foi liberada!` : "Sua análise foi liberada!"}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-balance text-[15px] text-muted-foreground">
          Em instantes, um especialista comercial da Rio Piranhas entrará em contato pelo seu
          WhatsApp com as oportunidades selecionadas para o seu perfil.
        </p>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
          className="mx-auto mt-6 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-6 py-4 text-base font-extrabold text-white shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1fb85a]"
        >
          <MessageCircle className="h-5 w-5" />
          Falar com consultor agora
        </a>

        <div className="mt-8 grid gap-3 rounded-3xl border border-border bg-white/80 p-5 text-left shadow-soft backdrop-blur sm:p-6">
          <p className="text-[11px] font-bold uppercase tracking-wider text-brand-blue-deep">
            Próximos passos
          </p>
          {[
            { n: 1, t: "Contato pelo WhatsApp", d: "Você recebe a mensagem do nosso atendimento comercial." },
            { n: 2, t: "Envio do catálogo", d: "Catálogo atualizado com produtos de alto giro." },
            { n: 3, t: "Condições liberadas", d: "Frete grátis MA e PI e condições para pedidos a partir de R$ 1.000." },
          ].map((s) => (
            <div key={s.n} className="flex gap-3 rounded-2xl bg-brand-blue-soft/60 p-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-brand text-sm font-extrabold text-white">
                {s.n}
              </span>
              <div>
                <p className="text-sm font-bold text-foreground">{s.t}</p>
                <p className="text-[13px] text-muted-foreground">{s.d}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-[11px] font-semibold text-muted-foreground">
          <span className="inline-flex items-center gap-1.5"><MessageCircle className="h-3.5 w-3.5 text-brand-blue" />Atendimento via WhatsApp</span>
          <span className="inline-flex items-center gap-1.5"><Phone className="h-3.5 w-3.5 text-brand-blue" />Equipe comercial especializada</span>
        </div>
      </div>
    </StepWrapper>
  );
}
