import { Answers } from "@/components/quiz/types";

const LEAD_WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbyP-QbHP8R7abyDzqHiG3g-k8YmJhRrWk9rDeCpxEsPwROi82c5P1OfIzPO0paQa6Xo4Q/exec";
const TRACKING_LEADS_URL = "https://newtracking-sales-sys.vercel.app/api/public/leads";
const LEAD_CAPTURE_KEY = "u7hjat5pjvfs8m7ls2ndwefn";
const GOOGLE_ADS_CONVERSION_SEND_TO = "AW-17617048942/1PJBCMPPxp0cEO6qu9BB";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

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
  if (!value) return "";
  return labels[group][value as keyof (typeof labels)[T]] ?? value;
}

function getUtmParams() {
  if (typeof window === "undefined") {
    return {
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      utm_content: "",
      utm_term: "",
    };
  }

  const params = new URLSearchParams(window.location.search);

  return {
    utm_source: params.get("utm_source") ?? "",
    utm_medium: params.get("utm_medium") ?? "",
    utm_campaign: params.get("utm_campaign") ?? "",
    utm_content: params.get("utm_content") ?? "",
    utm_term: params.get("utm_term") ?? "",
  };
}

function getCookie(name: string) {
  if (typeof document === "undefined") return "";

  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));

  return cookie ? decodeURIComponent(cookie.split("=").slice(1).join("=")) : "";
}

function getTrackingParams(eventId: string) {
  const utms = getUtmParams();

  if (typeof window === "undefined") {
    return {
      ...utms,
      fbc: "",
      fbp: "",
      event_id: eventId,
    };
  }

  const params = new URLSearchParams(window.location.search);
  const fbclid = params.get("fbclid");
  const fbc = getCookie("_fbc") || (fbclid ? `fb.1.${Date.now()}.${fbclid}` : "");

  return {
    ...utms,
    fbc,
    fbp: getCookie("_fbp"),
    event_id: eventId,
  };
}

function createEventId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function fireAdEvents(eventId: string) {
  if (typeof window === "undefined") return;

  window.gtag?.("event", "conversion", {
    send_to: GOOGLE_ADS_CONVERSION_SEND_TO,
    event_id: eventId,
  });

  window.fbq?.("track", "Lead", {}, { eventID: eventId });
}

function buildLeadPayload(answers: Answers) {
  return {
    nomeCompleto: answers.name ?? "",
    nome: answers.name ?? "",
    email: answers.email ?? "",
    telefone: answers.whatsapp ?? "",
    documento: answers.cnpj ?? "",
    tipoDocumento: "cnpj",
    estado: answers.state ?? "",
    cidade: answers.city ?? "",
    faturamento: getLabel("goal", answers.goal),
    desempenho: getLabel("channel", answers.channel),
    produtos: [getLabel("segment", answers.segment)].filter(Boolean),
    mediaFaturamento: getLabel("budget", answers.budget),
  };
}

export async function submitLeadToSheet(answers: Answers) {
  const eventId = createEventId();
  const trackingParams = getTrackingParams(eventId);
  const payload = {
    ...buildLeadPayload(answers),
    ...trackingParams,
  };

  fireAdEvents(eventId);

  await Promise.allSettled([
    fetch(LEAD_WEBHOOK_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(payload),
    }),
    fetch(TRACKING_LEADS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-lead-capture-key": LEAD_CAPTURE_KEY,
      },
      body: JSON.stringify({
        name: answers.name ?? "",
        phone: answers.whatsapp ?? "",
        email: answers.email ?? "",
        document: answers.cnpj ?? "",
        document_type: "cnpj",
        state: answers.state ?? "",
        city: answers.city ?? "",
        ...trackingParams,
        quiz: {
          goal: getLabel("goal", answers.goal),
          channel: getLabel("channel", answers.channel),
          segment: getLabel("segment", answers.segment),
          budget: getLabel("budget", answers.budget),
        },
      }),
    }),
  ]);
}
