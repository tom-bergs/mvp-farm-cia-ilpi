import { Link } from "react-router-dom";
import {
  Stethoscope, Users, Settings, ArrowRight, Shield, Heart, Clock,
  CheckCircle, Package, FileText, CreditCard, Phone, Mail, MapPin,
  ChevronRight, Star, Truck, AlertTriangle, Pill
} from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const steps = [
  {
    number: "01",
    icon: FileText,
    title: "Prescrição Digital",
    description: "O médico ou enfermeiro registra os medicamentos de cada residente diretamente na plataforma, de forma simples e segura.",
  },
  {
    number: "02",
    icon: CheckCircle,
    title: "Lista Fechada",
    description: "Ao finalizar, a lista mensal é gerada automaticamente e enviada para a família acompanhar e aprovar.",
  },
  {
    number: "03",
    icon: CreditCard,
    title: "Pagamento Transparente",
    description: "Familiares visualizam os medicamentos, valores e podem dividir os custos entre si com total transparência.",
  },
  {
    number: "04",
    icon: Truck,
    title: "Entrega na ILPI",
    description: "Os medicamentos são separados, conferidos e entregues diretamente na instituição, prontos para uso.",
  },
];

const differentials = [
  {
    icon: Shield,
    title: "Controle de Substâncias",
    description: "Rastreabilidade total de medicamentos controlados, em conformidade com a Anvisa e Portaria 344/98.",
  },
  {
    icon: Pill,
    title: "Dose Unitária",
    description: "Medicamentos separados por residente e por horário, reduzindo erros de administração em até 80%.",
  },
  {
    icon: Users,
    title: "Transparência Familiar",
    description: "Familiares acompanham em tempo real a lista de medicamentos e os custos, sem surpresas.",
  },
  {
    icon: Clock,
    title: "Automatização Mensal",
    description: "Listas recorrentes são geradas automaticamente. Menos burocracia para a equipe de saúde.",
  },
  {
    icon: AlertTriangle,
    title: "Alertas Inteligentes",
    description: "Notificações de interações medicamentosas, vencimentos e medicamentos em falta.",
  },
  {
    icon: Star,
    title: "Atendimento Dedicado",
    description: "Farmacêutico responsável exclusivo para cada ILPI, disponível para dúvidas e orientações.",
  },
];

const plans = [
  {
    name: "Essencial",
    description: "Para ILPIs de pequeno porte",
    price: "R$ 490",
    period: "/mês",
    features: [
      "Até 20 residentes",
      "Plataforma completa",
      "Entrega mensal",
      "Suporte por e-mail",
      "Relatórios básicos",
    ],
    highlight: false,
  },
  {
    name: "Profissional",
    description: "Para ILPIs de médio porte",
    price: "R$ 890",
    period: "/mês",
    features: [
      "Até 60 residentes",
      "Tudo do Essencial",
      "Entregas quinzenais",
      "Farmacêutico dedicado",
      "Relatórios avançados",
      "Alertas inteligentes",
    ],
    highlight: true,
  },
  {
    name: "Enterprise",
    description: "Para redes e grandes ILPIs",
    price: "Sob consulta",
    period: "",
    features: [
      "Residentes ilimitados",
      "Tudo do Profissional",
      "Entregas sob demanda",
      "API de integração",
      "Múltiplas unidades",
      "SLA personalizado",
    ],
    highlight: false,
  },
];

const faqs = [
  {
    question: "Como funciona a entrega dos medicamentos?",
    answer: "Os medicamentos são separados individualmente por residente, etiquetados e entregues diretamente na ILPI conforme o plano contratado (mensal, quinzenal ou sob demanda). Todo o processo é rastreado pela plataforma.",
  },
  {
    question: "Vocês trabalham com medicamentos controlados?",
    answer: "Sim. Somos autorizados pela Anvisa para dispensação de medicamentos controlados (Portaria 344/98). Todos os medicamentos são rastreados com receita digital e controle rigoroso de lotes e validades.",
  },
  {
    question: "Como os familiares acompanham os medicamentos?",
    answer: "Os familiares recebem acesso à plataforma onde podem visualizar a lista completa de medicamentos do residente, os valores, dividir custos entre responsáveis e acompanhar o status de cada pedido mensal.",
  },
  {
    question: "Qual a diferença para uma farmácia comum?",
    answer: "Somos especializados em ILPIs. Oferecemos dose unitária por residente, entrega na instituição, plataforma digital para profissionais e familiares, controle rigoroso de controlados e farmacêutico dedicado. Tudo pensado para a rotina de uma casa de repouso.",
  },
  {
    question: "É necessário trocar de farmácia de uma vez?",
    answer: "Não. Podemos começar com um grupo de residentes e expandir gradualmente. Nossa equipe faz a transição de forma tranquila, garantindo que nenhum residente fique sem medicamento.",
  },
  {
    question: "Como é feito o pagamento?",
    answer: "O pagamento é mensal e pode ser dividido entre familiares responsáveis. Emitimos nota fiscal e oferecemos pagamento via boleto, Pix ou cartão de crédito. A plataforma detalha exatamente o que está sendo cobrado.",
  },
  {
    question: "Vocês atendem em quais regiões?",
    answer: "Atualmente atendemos ILPIs na região metropolitana. Estamos em expansão — entre em contato para verificar disponibilidade na sua região.",
  },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/90 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-black text-primary-foreground">+</span>
              <Heart className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 text-accent fill-accent" />
            </div>
            <span className="text-lg font-bold text-foreground">SeniorCare Farma</span>
          </Link>
          <nav className="hidden items-center gap-6 sm:flex">
            <a href="#como-funciona" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Como Funciona</a>
            <a href="#diferenciais" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Diferenciais</a>
            <a href="#planos" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Planos</a>
            <a href="#faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">FAQ</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/profissionais">
              <Button variant="ghost" size="sm">Entrar</Button>
            </Link>
            <a href="#planos">
              <Button size="sm">Começar agora</Button>
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="container py-20 sm:py-28">
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
              <Pill className="h-4 w-4" />
              Farmácia especializada em ILPIs
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl leading-tight">
              Medicamentos certos, no tempo certo, para quem{" "}
              <span className="text-primary">você mais ama</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
              Gestão completa de medicamentos para instituições de longa permanência.
              Conectamos profissionais de saúde, famílias e administração em uma plataforma única, segura e transparente.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a href="#planos">
                <Button size="lg" className="text-base px-8 h-12">
                  Conhecer planos <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <a href="#como-funciona">
                <Button variant="outline" size="lg" className="text-base px-8 h-12">
                  Como funciona
                </Button>
              </a>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-primary" /> +500 residentes atendidos</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-primary" /> Anvisa autorizada</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-primary" /> Dose unitária</span>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section id="como-funciona" className="bg-card border-y border-border">
        <div className="container py-20">
          <div className="mx-auto max-w-2xl text-center mb-14">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Como funciona</h2>
            <p className="mt-3 text-muted-foreground text-lg">
              Do receituário à entrega, tudo digital e simplificado.
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div key={step.number} className="group relative rounded-2xl border border-border bg-background p-6 transition-all hover:shadow-lg hover:border-primary/30 hover:-translate-y-1">
                <span className="text-4xl font-black text-primary/15 absolute top-4 right-4">{step.number}</span>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section id="diferenciais" className="container py-20">
        <div className="mx-auto max-w-2xl text-center mb-14">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Por que escolher a SeniorCare?</h2>
          <p className="mt-3 text-muted-foreground text-lg">
            Não somos apenas uma farmácia. Somos parceiros no cuidado.
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {differentials.map((d) => (
            <div key={d.title} className="rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-md">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                <d.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">{d.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{d.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="planos" className="bg-card border-y border-border">
        <div className="container py-20">
          <div className="mx-auto max-w-2xl text-center mb-14">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Planos que cabem na sua ILPI</h2>
            <p className="mt-3 text-muted-foreground text-lg">
              Sem taxa de adesão. Cancele quando quiser.
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl border p-8 transition-all hover:shadow-lg ${
                  plan.highlight
                    ? "border-primary bg-background shadow-md scale-[1.03]"
                    : "border-border bg-background"
                }`}
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold text-primary-foreground">
                    Mais popular
                  </span>
                )}
                <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 shrink-0 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  className="mt-8 w-full"
                  variant={plan.highlight ? "default" : "outline"}
                >
                  {plan.price === "Sob consulta" ? "Falar com vendas" : "Começar agora"}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="container py-20">
        <div className="mx-auto max-w-2xl text-center mb-14">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Perguntas Frequentes</h2>
          <p className="mt-3 text-muted-foreground text-lg">
            Tire suas dúvidas sobre nossos serviços.
          </p>
        </div>
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="rounded-xl border border-border bg-card px-6 data-[state=open]:shadow-sm"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary">
        <div className="container py-16 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground sm:text-4xl">
            Pronto para transformar a gestão de medicamentos da sua ILPI?
          </h2>
          <p className="mt-4 text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Fale com nossa equipe e descubra como simplificar a rotina da sua instituição.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="secondary" className="text-base px-8 h-12">
                <Phone className="mr-2 h-5 w-5" /> Falar no WhatsApp
              </Button>
            </a>
            <a href="mailto:contato@seniorcarefarma.com.br">
              <Button size="lg" variant="outline" className="text-base px-8 h-12 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                <Mail className="mr-2 h-5 w-5" /> Enviar e-mail
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="container py-12">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <span className="text-base font-black text-primary-foreground">+</span>
                  <Heart className="absolute -bottom-0.5 -right-0.5 h-3 w-3 text-accent fill-accent" />
                </div>
                <span className="font-bold text-foreground">SeniorCare Farma</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Farmácia especializada no atendimento de Instituições de Longa Permanência para Idosos (ILPIs).
              </p>
              <div className="flex items-center gap-2 rounded-lg border border-border bg-background p-3">
                <Shield className="h-8 w-8 text-primary shrink-0" />
                <div>
                  <p className="text-xs font-bold text-foreground">ANVISA</p>
                  <p className="text-xs text-muted-foreground">AFE nº 0.00000.0 — Autorização de Funcionamento</p>
                </div>
              </div>
            </div>

            {/* Acesso rápido */}
            <div>
              <h4 className="font-bold text-foreground mb-4">Acesso Rápido</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/profissionais" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"><ChevronRight className="h-3 w-3" /> Profissionais de Saúde</Link></li>
                <li><Link to="/familia" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"><ChevronRight className="h-3 w-3" /> Área da Família</Link></li>
                <li><Link to="/admin" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"><ChevronRight className="h-3 w-3" /> Administração</Link></li>
                <li><a href="#como-funciona" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"><ChevronRight className="h-3 w-3" /> Como Funciona</a></li>
                <li><a href="#planos" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"><ChevronRight className="h-3 w-3" /> Planos</a></li>
              </ul>
            </div>

            {/* Contato */}
            <div>
              <h4 className="font-bold text-foreground mb-4">Contato</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Phone className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                  <span>(11) 99999-9999</span>
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                  <span>contato@seniorcarefarma.com.br</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                  <span>Rua Exemplo, 123 — São Paulo, SP<br />CEP 01000-000</span>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-bold text-foreground mb-4">Informações Legais</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><strong className="text-foreground">CNPJ:</strong> 00.000.000/0001-00</li>
                <li><strong className="text-foreground">Razão Social:</strong> SeniorCare Farma Ltda.</li>
                <li><strong className="text-foreground">Farmacêutico Resp.:</strong> Dr(a). Nome — CRF/SP 00000</li>
                <li><strong className="text-foreground">Alvará:</strong> nº 000/2024 — Vigilância Sanitária</li>
                <li><strong className="text-foreground">Horário:</strong> Seg. a Sex. 8h às 18h</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} SeniorCare Farma. Todos os direitos reservados.
            </p>
            <p className="text-xs text-muted-foreground text-center">
              Medicamentos sob prescrição só podem ser dispensados mediante apresentação de receita médica.
              Imagens meramente ilustrativas. Preços e condições por tempo limitado.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
