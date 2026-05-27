import { createFileRoute } from "@tanstack/react-router";
import { Quiz } from "@/components/quiz/Quiz";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rio Piranhas — Análise gratuita de oportunidades comerciais" },
      {
        name: "description",
        content:
          "Distribuidora Rio Piranhas: descubra produtos de alto giro, compre direto da distribuidora com frete grátis MA e PI. Pedido inicial a partir de R$ 800.",
      },
      { property: "og:title", content: "Rio Piranhas — Análise gratuita" },
      {
        property: "og:description",
        content:
          "Quiz rápido para lojistas e revendedores: descubra oportunidades de faturamento com produtos de alto giro.",
      },
    ],
    links: [
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <Quiz />;
}
