import { useState } from "react";
import Layout from "@/components/Layout";
import { residents, medications, prescriptionItems, familyMembers } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard, QrCode, CheckCircle2, FileText, AlertTriangle, Users } from "lucide-react";
import { toast } from "sonner";

export default function Familia() {
  const [selectedResident, setSelectedResident] = useState(residents[0].id);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);

  const resident = residents.find((r) => r.id === selectedResident)!;
  const residentItems = prescriptionItems.filter((i) => i.residentId === selectedResident);
  const members = familyMembers.filter((f) => f.residentId === selectedResident);

  const totalValue = residentItems.reduce((sum, item) => {
    const med = medications.find((m) => m.id === item.medicationId);
    return sum + (med ? med.unitPrice * item.quantity : 0);
  }, 0);

  const handlePayment = () => {
    toast.success(`Pagamento via ${paymentMethod === "pix" ? "Pix" : "Cartão"} processado!`);
    setPaymentMethod(null);
  };

  return (
    <Layout>
      <div className="mx-auto max-w-5xl space-y-6">
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
                    <TableHead className="text-center">Flags</TableHead>
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
                        <TableCell className="text-center">
                          <div className="flex justify-center gap-1 flex-wrap">
                            {med.requiresPrescription && (
                              <Badge variant="secondary" className="text-xs">
                                <FileText className="mr-1 h-3 w-3" /> Prescrição
                              </Badge>
                            )}
                            {med.controlledSubstance && (
                              <Badge variant="destructive" className="text-xs">
                                <AlertTriangle className="mr-1 h-3 w-3" /> Controlado
                              </Badge>
                            )}
                          </div>
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

          {/* Sidebar: payment + family split */}
          <div className="space-y-4">
            {/* Family members */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Users className="h-4 w-4 text-primary" /> Responsáveis Financeiros
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {members.map((m) => (
                  <div key={m.id} className="flex items-center justify-between rounded-lg bg-secondary/50 p-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">{m.name}</p>
                      <p className="text-xs text-muted-foreground">{m.email}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">{m.sharePercent}%</Badge>
                      <p className="text-sm font-bold text-foreground mt-1">
                        R$ {((totalValue * m.sharePercent) / 100).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
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
