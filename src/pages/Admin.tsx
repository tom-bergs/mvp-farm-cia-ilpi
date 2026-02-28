import { useState } from "react";
import Layout from "@/components/Layout";
import { residents as initialResidents, familyMembers as initialMembers, type Resident, type FamilyMember } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Mail, UserPlus, BedDouble } from "lucide-react";
import { toast } from "sonner";

export default function Admin() {
  const [residents, setResidents] = useState<Resident[]>(initialResidents);
  const [members, setMembers] = useState<FamilyMember[]>(initialMembers);
  const [newName, setNewName] = useState("");
  const [newRoom, setNewRoom] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberPercent, setNewMemberPercent] = useState("");
  const [selectedResident, setSelectedResident] = useState<string | null>(null);

  const addResident = () => {
    if (!newName.trim() || !newRoom.trim()) {
      toast.error("Preencha nome e quarto");
      return;
    }
    const r: Resident = { id: `r${Date.now()}`, name: newName, room: newRoom, emails: [] };
    setResidents((prev) => [...prev, r]);
    setNewName("");
    setNewRoom("");
    toast.success("Residente cadastrado");
  };

  const addFamilyMember = () => {
    if (!selectedResident || !newEmail.trim() || !newMemberName.trim()) {
      toast.error("Preencha todos os campos");
      return;
    }
    const percent = Number(newMemberPercent) || 100;
    const fm: FamilyMember = {
      id: `f${Date.now()}`,
      residentId: selectedResident,
      name: newMemberName,
      email: newEmail,
      sharePercent: percent,
    };
    setMembers((prev) => [...prev, fm]);
    setNewEmail("");
    setNewMemberName("");
    setNewMemberPercent("");
    toast.success("Membro familiar adicionado");
  };

  const removeMember = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
    toast.success("Membro removido");
  };

  return (
    <Layout>
      <div className="mx-auto max-w-5xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Administração</h1>
          <p className="text-muted-foreground">Gerencie residentes e contatos familiares</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Residents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BedDouble className="h-5 w-5 text-primary" /> Residentes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input placeholder="Nome" value={newName} onChange={(e) => setNewName(e.target.value)} />
                <Input placeholder="Quarto" value={newRoom} onChange={(e) => setNewRoom(e.target.value)} className="w-24" />
                <Button onClick={addResident} size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {residents.map((r) => (
                  <div
                    key={r.id}
                    onClick={() => setSelectedResident(r.id)}
                    className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors ${
                      selectedResident === r.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:bg-secondary/50"
                    }`}
                  >
                    <div>
                      <p className="font-medium text-foreground">{r.name}</p>
                      <p className="text-xs text-muted-foreground">Quarto {r.room}</p>
                    </div>
                    <Badge variant="outline">
                      {members.filter((m) => m.residentId === r.id).length} contato(s)
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Family contacts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" /> Contatos Familiares
                {selectedResident && (
                  <Badge className="ml-2">
                    {residents.find((r) => r.id === selectedResident)?.name}
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedResident ? (
                <>
                  <div className="space-y-2">
                    <Input placeholder="Nome do familiar" value={newMemberName} onChange={(e) => setNewMemberName(e.target.value)} />
                    <div className="flex gap-2">
                      <Input placeholder="E-mail" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} className="flex-1" />
                      <Input placeholder="%" value={newMemberPercent} onChange={(e) => setNewMemberPercent(e.target.value)} className="w-20" type="number" />
                      <Button onClick={addFamilyMember} size="icon">
                        <UserPlus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>E-mail</TableHead>
                        <TableHead className="text-center">%</TableHead>
                        <TableHead className="w-10"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {members
                        .filter((m) => m.residentId === selectedResident)
                        .map((m) => (
                          <TableRow key={m.id}>
                            <TableCell className="font-medium">{m.name}</TableCell>
                            <TableCell className="text-muted-foreground">{m.email}</TableCell>
                            <TableCell className="text-center">
                              <Badge variant="outline">{m.sharePercent}%</Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="icon" onClick={() => removeMember(m.id)} className="text-destructive hover:text-destructive">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  Selecione um residente para gerenciar contatos
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
