import { useState } from "react";
import Layout from "@/components/Layout";
import { residents, medications, prescriptionItems, familyMembers as initialMembers, type FamilyMember } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard, QrCode, CheckCircle2, Users, UserPlus, Trash2, Crown, CalendarClock, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

export default function Familia() {
  const [selectedResident, setSelectedResident] = useState(residents[0].id);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [paid, setPaid] = useState(false);
  const [members, setMembers] = useState<FamilyMember[]>(initialMembers);
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newMemberPercent, setNewMemberPercent] = useState("");
  const [editingPercent, setEditingPercent] = useState<Record<string, string>>({});

  const resident = residents.find((r) => r.id === selectedResident)!;
  const residentItems = prescriptionItems.filter((i) => i.residentId === selectedResident);
  const residentMembers = members.filter((f) => f.residentId === selectedResident);

  // First member is admin
  const adminMember = residentMembers[0];

  const totalValue = residentItems.reduce((sum, item) => {
    const med = medications.find((m) => m.id === item.medicationId);
    return sum + (med ? med.unitPrice * item.quantity : 0);
  }, 0);

  // Order step-by-step
  const today = new Date();
  const closingDate = new Date(today.getFullYear(), today.getMonth(), 25);
  if (today.getDate() > 25) closingDate.setMonth(closingDate.getMonth() + 1);
  const daysLeft = Math.ceil((closingDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const isPaid = paid;

  const handlePayment = () => {
    toast.success(`Pagamento via ${paymentMethod === "pix" ? "Pix" : "Cartão"} processado!`);
    setPaymentMethod(null);
    setPaid(true);
  };

  const addMember = () => {
    if (!newMemberName.trim() || !newMemberEmail.trim()) {
      toast.error("Preencha nome e e-mail");
      return;
    }
    const percent = Number(newMemberPercent) || 0;
    const fm: FamilyMember = {
      id: `f${Date.now()}`,
      residentId: selectedResident,
      name: newMemberName,
      email: newMemberEmail,
      relation: "",
      sharePercent: percent,
    };
    setMembers((prev) => [...prev, fm]);
    setNewMemberName("");
    setNewMemberEmail("");
    setNewMemberPercent("");
    toast.success("Membro adicionado");
  };

  const removeMember = (id: string) => {
    if (adminMember && id === adminMember.id) {
      toast.error("Não é possível remover o administrador");
      return;
    }
    setMembers((prev) => prev.filter((m) => m.id !== id));
    toast.success("Membro removido");
  };

  const updatePercent = (id: string, value: string) => {
    setEditingPercent((prev) => ({ ...prev, [id]: value }));
  };

  const commitPercent = (id: string) => {
    const val = Number(editingPercent[id]);
    if (!isNaN(val) && val >= 0 && val <= 100) {
      setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, sharePercent: val } : m)));
    }
    setEditingPercent((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  return (
    <Layout>
      <div className="mx-auto max-w-5xl space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Área da Família</h1>
          <p className="text-muted-foreground">Visualize medicamentos e realize pagamentos</p>
        </div>

        {/* Resident selector */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">Residente:</span>
          <Select value={selectedResident} onValueChange={setSelectedResident}>
            <SelectTrigger className="w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {residents.map((r) => (
                <SelectItem key={r.id} value={r.id}>
                  {r.name} — Quarto {r.room}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Medication list */}
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="flex items-center justify-between bg-secondary/50 px-6 py-3">
                <h3 className="font-semibold text-foreground">Lista de Medicamentos — Fev/2026</h3>
                <Badge className="bg-success text-success-foreground">Fechada</Badge>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produto</TableHead>
                    <TableHead className="text-center">Qtd</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {residentItems.map((item) => {
                    const med = medications.find((m) => m.id === item.medicationId)!;
                    return (
                      <TableRow key={item.id}>
                        <TableCell>
                          <p className="font-medium text-foreground">{med.name}</p>
                        </TableCell>
                        <TableCell className="text-center">{item.quantity}</TableCell>
                        <TableCell className="text-right font-medium">
                          R$ {(med.unitPrice * item.quantity).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              <div className="flex items-center justify-between border-t border-border bg-secondary/30 px-6 py-4">
                <span className="text-sm text-muted-foreground">{residentItems.length} item(ns)</span>
                <span className="text-xl font-bold text-foreground">Total: R$ {totalValue.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Sidebar: family members + payment */}
          <div className="space-y-4">
            {/* Family members */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Users className="h-4 w-4 text-primary" /> Membros da Família
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {residentMembers.map((m, index) => {
                  const isAdmin = index === 0;
                  const isEditing = editingPercent[m.id] !== undefined;
                  return (
                    <div key={m.id} className="flex items-center justify-between rounded-lg bg-secondary/50 p-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <p className="text-sm font-medium text-foreground truncate">{m.name}</p>
                          {isAdmin && (
                            <Crown className="h-3.5 w-3.5 text-accent shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{m.email}</p>
                      </div>
                      <div className="flex items-center gap-2 ml-2 shrink-0">
                        <div className="flex items-center gap-1">
                          {isEditing ? (
                            <Input
                              type="number"
                              min={0}
                              max={100}
                              value={editingPercent[m.id]}
                              onChange={(e) => updatePercent(m.id, e.target.value)}
                              onBlur={() => commitPercent(m.id)}
                              onKeyDown={(e) => e.key === "Enter" && commitPercent(m.id)}
                              className="w-16 h-7 text-center text-xs"
                              autoFocus
                            />
                          ) : (
                            <Badge
                              variant="outline"
                              className="cursor-pointer hover:bg-secondary"
                              onClick={() => setEditingPercent((prev) => ({ ...prev, [m.id]: String(m.sharePercent) }))}
                            >
                              {m.sharePercent}%
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm font-bold text-foreground whitespace-nowrap">
                          R$ {((totalValue * m.sharePercent) / 100).toFixed(2)}
                        </p>
                        {!isAdmin && (
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => removeMember(m.id)}>
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Add member form */}
                <div className="space-y-2 border-t border-border pt-3">
                  <Input placeholder="Nome" value={newMemberName} onChange={(e) => setNewMemberName(e.target.value)} className="h-8 text-sm" />
                  <div className="flex gap-1.5">
                    <Input placeholder="E-mail" value={newMemberEmail} onChange={(e) => setNewMemberEmail(e.target.value)} className="h-8 text-sm flex-1" />
                    <Input placeholder="%" type="number" value={newMemberPercent} onChange={(e) => setNewMemberPercent(e.target.value)} className="h-8 text-sm w-16" />
                    <Button size="icon" className="h-8 w-8 shrink-0" onClick={addMember}>
                      <UserPlus className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Pagamento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant={paymentMethod === "card" ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setPaymentMethod("card")}
                >
                  <CreditCard className="mr-2 h-4 w-4" /> Cartão de Crédito
                </Button>
                <Button
                  variant={paymentMethod === "pix" ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setPaymentMethod("pix")}
                >
                  <QrCode className="mr-2 h-4 w-4" /> Pix
                </Button>
                {paymentMethod && (
                  <Button className="w-full" size="lg" onClick={handlePayment}>
                    <CheckCircle2 className="mr-2 h-4 w-4" /> Confirmar Pagamento
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
