import { Link } from "react-router-dom";
import { Stethoscope, Users, Settings, ArrowRight, Shield, Heart, Clock } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";

const roles = [
  {
    title: "Profissionais de Saúde",
    description: "Gerencie prescrições e medicamentos dos residentes",
    icon: Stethoscope,
    path: "/profissionais",
    color: "bg-primary",
  },
  {
    title: "Família",
    description: "Visualize a lista de medicamentos e realize pagamentos",
    icon: Users,
    path: "/familia",
    color: "bg-accent",
  },
  {
    title: "Administração",
    description: "Cadastre residentes e gerencie contatos",
    icon: Settings,
    path: "/admin",
    color: "bg-info",
  },
];

const features = [
  { icon: Shield, title: "Segurança", desc: "Controle de substâncias e prescrições" },
  { icon: Heart, title: "Cuidado", desc: "Medicamentos certos para cada residente" },
  { icon: Clock, title: "Agilidade", desc: "Listas mensais automatizadas" },
];

export default function Index() {
  return (
    <Layout>
      <div className="mx-auto max-w-4xl space-y-12">
        {/* Hero */}
        <section className="text-center space-y-4 pt-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Farmácia especializada em{" "}
            <span className="text-primary">ILPIs</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Gestão simplificada de medicamentos para instituições de longa permanência. 
            Conectamos profissionais de saúde, famílias e administração em uma única plataforma.
          </p>
        </section>

        {/* Features */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{f.title}</p>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Role Cards */}
        <section className="space-y-4">
          <h2 className="text-center text-2xl font-bold text-foreground">Selecione seu perfil</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {roles.map((role) => (
              <Link key={role.path} to={role.path} className="group">
                <div className="flex h-full flex-col items-center gap-4 rounded-2xl border border-border bg-card p-6 text-center transition-all hover:shadow-lg hover:border-primary/30 hover:-translate-y-1">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${role.color}`}>
                    <role.icon className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-foreground">{role.title}</h3>
                    <p className="text-sm text-muted-foreground">{role.description}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="mt-auto text-primary group-hover:bg-primary/10">
                    Acessar <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
