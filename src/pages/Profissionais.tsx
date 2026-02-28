import { useState } from "react";
import Layout from "@/components/Layout";
import { residents, medications, prescriptionItems as initialItems, type PrescriptionItem } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2, AlertTriangle, FileText, Pill, Upload, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function Profissionais() {
  const [selectedResident, setSelectedResident] = useState(residents[0].id);
  const [items, setItems] = useState<PrescriptionItem[]>(initialItems);
  const [newMedId, setNewMedId] = useState("");
  const [uploadedPrescriptions, setUploadedPrescriptions] = useState<Record<string, boolean>>({});

  const residentItems = items.filter((i) => i.residentId === selectedResident);
  const resident = residents.find((r) => r.id === selectedResident)!;

  const updateQuantity = (itemId: string, qty: number) => {
    if (qty < 1) return;
    setItems((prev) => prev.map((i) => (i.id === itemId ? { ...i, quantity: qty } : i)));
  };

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== itemId));
    toast.success("Medicamento removido");
  };

  const addMedication = () => {
    if (!newMedId) return;
    if (residentItems.some((i) => i.medicationId === newMedId)) {
      toast.error("Medicamento já adicionado");
      return;
    }
    setItems((prev) => [
      ...prev,
      { id: `p${Date.now()}`, residentId: selectedResident, medicationId: newMedId, quantity: 1 },
    ]);
    setNewMedId("");
    toast.success("Medicamento adicionado");
  };

  const handleUploadPrescription = (itemId: string) => {
    // Simula upload de receita digital
    setUploadedPrescriptions((prev) => ({ ...prev, [itemId]: true }));
    toast.success("Receita digital enviada com sucesso!");
  };

  return (
    <Layout>
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Prescrições</h1>
            <p className="text-muted-foreground">Gerencie medicamentos dos residentes</p>
          </div>
          <Badge variant="outline" className="text-sm">
            Fev/2026
          </Badge>
        </div>

        {/* Resident selector */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-foreground">Residente:</span>
          <div className="flex flex-wrap gap-2">
            {residents.map((r) => (
              <Button
                key={r.id}
                size="sm"
                variant={selectedResident === r.id ? "default" : "outline"}
                onClick={() => setSelectedResident(r.id)}
              >
                {r.name} — Quarto {r.room}
              </Button>
            ))}
          </div>
        </div>

        {/* Add medication */}
        <div className="flex gap-2 rounded-xl border border-border bg-card p-4">
          <Select value={newMedId} onValueChange={setNewMedId}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Selecione um medicamento para adicionar" />
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

        {/* Medications table */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/50">
                <TableHead>Medicamento</TableHead>
                <TableHead className="text-center">Flags</TableHead>
                <TableHead className="text-center w-32">Qtd</TableHead>
                <TableHead className="text-center">Upload de Prescrição</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {residentItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    <Pill className="mx-auto mb-2 h-8 w-8 opacity-40" />
                    Nenhum medicamento adicionado para {resident.name}
                  </TableCell>
                </TableRow>
              ) : (
                residentItems.map((item) => {
                  const med = medications.find((m) => m.id === item.medicationId)!;
                  const hasUploaded = uploadedPrescriptions[item.id];
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
                        {med.requiresPrescription ? (
                          hasUploaded ? (
                            <Badge className="bg-success text-success-foreground">
                              <CheckCircle2 className="mr-1 h-3 w-3" /> Enviada
                            </Badge>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleUploadPrescription(item.id)}
                            >
                              <Upload className="mr-1 h-3.5 w-3.5" /> Enviar Receita
                            </Button>
                          )
                        ) : (
                          <span className="text-xs text-muted-foreground">Não necessário</span>
                        )}
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
              <span className="text-sm text-muted-foreground">{residentItems.length} medicamento(s)</span>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <Button size="lg" onClick={() => toast.success("Lista salva com sucesso!")}>
            Salvar Lista do Mês
          </Button>
        </div>
      </div>
    </Layout>
  );
}
