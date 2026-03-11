import { useState } from "react";
import Layout from "@/components/Layout";
import { residents, medications, prescriptionItems as initialItems, healthProfessionals, type PrescriptionItem } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, AlertTriangle, Pill, Upload, CalendarClock, Search } from "lucide-react";
import { toast } from "sonner";

export default function Profissionais() {
  const [selectedResident, setSelectedResident] = useState(residents[0].id);
  const [items, setItems] = useState<PrescriptionItem[]>(initialItems);
  const [newMedId, setNewMedId] = useState("");
  const [prescriptionSent, setPrescriptionSent] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [closedLists, setClosedLists] = useState<Record<string, boolean>>({});

  // Simulated logged-in professional
  const currentProfessional = healthProfessionals[0];

  const filteredResidents = residents.filter((r) =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.room.includes(searchQuery)
  );

  const residentItems = items.filter((i) => i.residentId === selectedResident);
  const resident = residents.find((r) => r.id === selectedResident)!;
  const isListClosed = !!closedLists[selectedResident];

  // Closing date: day 20 of current month
  const today = new Date();
  const closingDate = new Date(today.getFullYear(), today.getMonth(), 20);
  if (today.getDate() > 20) closingDate.setMonth(closingDate.getMonth() + 1);
  const daysLeft = Math.ceil((closingDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  const updateQuantity = (itemId: string, qty: number) => {
    if (qty < 1) return;
    setItems((prev) => prev.map((i) => (i.id === itemId ? { ...i, quantity: qty } : i)));
  };

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== itemId));
    toast.success("Produto removido");
  };

  const addMedication = () => {
    if (!newMedId) return;
    if (residentItems.some((i) => i.medicationId === newMedId)) {
      toast.error("Produto já adicionado");
      return;
    }
    setItems((prev) => [
      ...prev,
      { id: `p${Date.now()}`, residentId: selectedResident, medicationId: newMedId, quantity: 1 },
    ]);
    setNewMedId("");
    toast.success("Produto adicionado");
  };

  const togglePrescription = (itemId: string) => {
    setPrescriptionSent((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const handleUploadPrescriptions = () => {
    toast.success("Receitas digitais enviadas com sucesso!");
  };

  // Get professional name for an item (simulated: current professional for all)
  const getProfessionalForItem = (_itemId: string) => {
    return currentProfessional?.name || "—";
  };

  return (
    <Layout>
      <div className="mx-auto max-w-6xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Lista de Produtos</h1>
            <p className="text-muted-foreground">Gerencie a lista de produtos do residente</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleUploadPrescriptions}>
              <Upload className="mr-1 h-4 w-4" /> Enviar Receitas
            </Button>
            <Badge variant="outline" className="text-sm">
              {currentProfessional?.name}
            </Badge>
          </div>
        </div>

        {/* Resident search + selector */}
        <div className="space-y-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar residente por nome ou quarto..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {filteredResidents.map((r) => (
              <Button
                key={r.id}
                size="sm"
                variant={selectedResident === r.id ? "default" : "outline"}
                onClick={() => setSelectedResident(r.id)}
              >
                {r.name} — Quarto {r.room}
              </Button>
            ))}
            {filteredResidents.length === 0 && (
              <span className="text-sm text-muted-foreground py-1">Nenhum residente encontrado</span>
            )}
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-4">
          {/* Product list */}
          <div className="lg:col-span-3 space-y-4">
            {/* Add product */}
            <div className="flex gap-2 rounded-xl border border-border bg-card p-4">
              <Select value={newMedId} onValueChange={setNewMedId}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Selecione um produto para adicionar" />
                </SelectTrigger>
                <SelectContent>
                  {medications.map((m) => (
                    <SelectItem key={m.id} value={m.id}>
                      {m.name} — {m.dosage}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={addMedication} disabled={!newMedId}>
                <Plus className="mr-1 h-4 w-4" /> Adicionar
              </Button>
            </div>

            {/* Products table */}
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary/50">
                    <TableHead>Produto</TableHead>
                    <TableHead className="text-center">Flags</TableHead>
                    <TableHead className="text-center w-24">Qtd</TableHead>
                    <TableHead className="text-center">Prescrição Enviada</TableHead>
                    <TableHead>Solicitante</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {residentItems.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        <Pill className="mx-auto mb-2 h-8 w-8 opacity-40" />
                        Nenhum produto adicionado para {resident.name}
                      </TableCell>
                    </TableRow>
                  ) : (
                    residentItems.map((item) => {
                      const med = medications.find((m) => m.id === item.medicationId)!;
                      return (
                        <TableRow key={item.id}>
                          <TableCell>
                            <p className="font-medium text-foreground">{med.name}</p>
                            <p className="text-xs text-muted-foreground">{med.dosage}</p>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex justify-center gap-1 flex-wrap">
                              {med.requiresPrescription && (
                                <Badge variant="secondary" className="text-xs">
                                  Prescrição
                                </Badge>
                              )}
                              {med.controlledSubstance && (
                                <Badge variant="destructive" className="text-xs">
                                  <AlertTriangle className="mr-1 h-3 w-3" /> Controlado
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              min={1}
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                              className="text-center w-20 mx-auto"
                            />
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center gap-2">
                              <Switch
                                checked={!!prescriptionSent[item.id]}
                                onCheckedChange={() => togglePrescription(item.id)}
                              />
                              <span className="text-xs text-muted-foreground">
                                {prescriptionSent[item.id] ? "Sim" : "Não"}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm text-foreground">{getProfessionalForItem(item.id)}</span>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} className="text-destructive hover:text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
              {residentItems.length > 0 && (
                <div className="flex items-center justify-end border-t border-border bg-secondary/30 px-6 py-4">
                  <span className="text-sm text-muted-foreground">{residentItems.length} produto(s)</span>
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <Button
                size="lg"
                disabled={isListClosed}
                onClick={() => {
                  setClosedLists((prev) => ({ ...prev, [selectedResident]: true }));
                  toast.success("Lista fechada com sucesso!");
                }}
              >
                Salvar Lista do Mês
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <CalendarClock className="h-4 w-4 text-primary" /> Passo-a-passo do Pedido
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Data de hoje:</span>
                  <span className="font-medium text-foreground">{today.toLocaleDateString("pt-BR")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fechamento:</span>
                  <span className="font-medium text-foreground">{closingDate.toLocaleDateString("pt-BR")}</span>
                </div>
                {daysLeft > 0 ? (
                  <div className="flex items-center gap-2 rounded-md bg-amber-500/10 border border-amber-500/30 px-3 py-2 text-amber-700 dark:text-amber-400">
                    <AlertTriangle className="h-4 w-4 shrink-0" />
                    <span className="text-xs font-medium">Faltam {daysLeft} dia(s) para o fechamento da lista</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 rounded-md bg-destructive/10 border border-destructive/30 px-3 py-2 text-destructive">
                    <AlertTriangle className="h-4 w-4 shrink-0" />
                    <span className="text-xs font-medium">Prazo de fechamento encerrado</span>
                  </div>
                )}
                <div className="flex justify-between items-center pt-1">
                  <span className="text-muted-foreground">Status:</span>
                  {isListClosed ? (
                    <Badge variant="default">Lista Fechada</Badge>
                  ) : (
                    <Badge variant="secondary">Pendente</Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
