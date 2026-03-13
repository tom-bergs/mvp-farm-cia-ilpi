import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { residents as initialResidents, familyMembers as initialMembers, healthProfessionals as initialProfessionals, type Resident, type FamilyMember, type HealthProfessional } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Mail, UserPlus, BedDouble, Stethoscope, Crown, Search, Package, CreditCard, CircleDot, Phone } from "lucide-react";
import { toast } from "sonner";
import PhoneInput, { emptyPhone, formatPhone, type PhoneValue } from "@/components/PhoneInput";

export default function Admin() {
  const [residents, setResidents] = useState<Resident[]>(initialResidents);
  const [members, setMembers] = useState<FamilyMember[]>(initialMembers);
  const [professionals, setProfessionals] = useState<HealthProfessional[]>(initialProfessionals);
  const [newName, setNewName] = useState("");
  const [newRoom, setNewRoom] = useState("");
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newMemberRelation, setNewMemberRelation] = useState("");
  const [newMemberPhone, setNewMemberPhone] = useState<PhoneValue>(emptyPhone);
  const [newProfName, setNewProfName] = useState("");
  const [newProfEmail, setNewProfEmail] = useState("");
  const [newProfRole, setNewProfRole] = useState("");
  const [newProfPhone, setNewProfPhone] = useState<PhoneValue>(emptyPhone);
  const [selectedResident, setSelectedResident] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [orderStatuses, setOrderStatuses] = useState<Record<string, { products: string; payment: string }>>({});

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedResident(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredResidents = residents.filter((r) => {
    const q = searchQuery.toLowerCase();
    return r.name.toLowerCase().includes(q) || r.room.toLowerCase().includes(q);
  });

  const getOrderStatus = (residentId: string) => {
    return orderStatuses[residentId] || { products: "Pendente", payment: "Pendente" };
  };




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

  const removeResident = (id: string) => {
    setResidents((prev) => prev.filter((r) => r.id !== id));
    setMembers((prev) => prev.filter((m) => m.residentId !== id));
    setProfessionals((prev) => prev.filter((p) => p.residentId !== id));
    if (selectedResident === id) setSelectedResident(null);
    toast.success("Residente removido");
  };

  const addFamilyMember = () => {
    if (!selectedResident || !newMemberEmail.trim() || !newMemberName.trim()) {
      toast.error("Preencha todos os campos");
      return;
    }
    const fm: FamilyMember = {
      id: `f${Date.now()}`,
      residentId: selectedResident,
      name: newMemberName,
      email: newMemberEmail,
      relation: newMemberRelation,
      phone: formatPhone(newMemberPhone),
      sharePercent: 100,
    };
    setMembers((prev) => [...prev, fm]);
    setNewMemberEmail("");
    setNewMemberName("");
    setNewMemberRelation("");
    setNewMemberPhone(emptyPhone);
    toast.success("Membro familiar adicionado");
  };

  const setAdminMember = (memberId: string) => {
    setMembers((prev) =>
      prev.map((m) => {
        if (m.residentId !== selectedResident) return m;
        return { ...m, isAdmin: m.id === memberId };
      })
    );
    toast.success("Administrador alterado");
  };

  const removeMember = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
    toast.success("Membro removido");
  };

  const addProfessional = () => {
    if (!selectedResident || !newProfEmail.trim() || !newProfName.trim() || !newProfRole.trim()) {
      toast.error("Preencha todos os campos");
      return;
    }
    const hp: HealthProfessional = {
      id: `hp${Date.now()}`,
      residentId: selectedResident,
      name: newProfName,
      email: newProfEmail,
      role: newProfRole,
      phone: formatPhone(newProfPhone),
    };
    setProfessionals((prev) => [...prev, hp]);
    setNewProfName("");
    setNewProfEmail("");
    setNewProfRole("");
    setNewProfPhone(emptyPhone);
    toast.success("Profissional adicionado");
  };

  const removeProfessional = (id: string) => {
    setProfessionals((prev) => prev.filter((p) => p.id !== id));
    toast.success("Profissional removido");
  };

  return (
    <Layout>
      <div className="mx-auto max-w-5xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Administração</h1>
          <p className="text-muted-foreground">Gerencie residentes e contatos</p>
        </div>

        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar residente por nome ou quarto..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
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
                {filteredResidents.map((r) => (
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
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        {members.filter((m) => m.residentId === r.id).length} contato(s)
                      </Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeResident(r.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {filteredResidents.length === 0 && (
                  <p className="text-center text-sm text-muted-foreground py-4">
                    Nenhum residente encontrado
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
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
                      <div className="flex gap-2">
                        <Input placeholder="Nome do familiar" value={newMemberName} onChange={(e) => setNewMemberName(e.target.value)} className="flex-1" />
                        <Input placeholder="Relação" value={newMemberRelation} onChange={(e) => setNewMemberRelation(e.target.value)} className="w-28" />
                      </div>
                      <div className="flex gap-2">
                        <Input placeholder="E-mail" value={newMemberEmail} onChange={(e) => setNewMemberEmail(e.target.value)} className="flex-1" />
                        <Button onClick={addFamilyMember} size="icon">
                          <UserPlus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead></TableHead>
                          <TableHead>Nome</TableHead>
                          <TableHead>Relação</TableHead>
                          <TableHead>E-mail</TableHead>
                          <TableHead className="w-10"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {members
                          .filter((m) => m.residentId === selectedResident)
                          .map((m) => (
                            <TableRow key={m.id}>
                              <TableCell>
                                <button
                                  onClick={() => setAdminMember(m.id)}
                                  title={m.isAdmin ? "Administrador" : "Tornar administrador"}
                                  className="transition-colors"
                                >
                                  <Crown className={`h-4 w-4 ${m.isAdmin ? "text-amber-500" : "text-muted-foreground/30 hover:text-amber-300"}`} />
                                </button>
                              </TableCell>
                              <TableCell className="font-medium">
                                <div className="flex items-center gap-2">
                                  {m.name}
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 text-muted-foreground hover:text-primary"
                                    title="Reenviar convite por e-mail"
                                    onClick={() => toast.info(`Convite reenviado para ${m.email}`)}
                                  >
                                    <Mail className="h-3.5 w-3.5" />
                                  </Button>
                                </div>
                              </TableCell>
                              <TableCell className="text-muted-foreground">{m.relation}</TableCell>
                              <TableCell className="text-muted-foreground">{m.email}</TableCell>
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

            {/* Health professionals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Stethoscope className="h-5 w-5 text-primary" /> Profissionais de Saúde
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
                      <Input placeholder="Nome do profissional" value={newProfName} onChange={(e) => setNewProfName(e.target.value)} />
                      <div className="flex gap-2">
                        <Input placeholder="E-mail" value={newProfEmail} onChange={(e) => setNewProfEmail(e.target.value)} className="flex-1" />
                        <Input placeholder="Função" value={newProfRole} onChange={(e) => setNewProfRole(e.target.value)} className="w-32" />
                        <Button onClick={addProfessional} size="icon">
                          <UserPlus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome</TableHead>
                          <TableHead>E-mail</TableHead>
                          <TableHead className="text-center">Função</TableHead>
                          <TableHead className="w-10"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {professionals
                          .filter((p) => p.residentId === selectedResident)
                          .map((p) => (
                            <TableRow key={p.id}>
                              <TableCell className="font-medium">{p.name}</TableCell>
                              <TableCell className="text-muted-foreground">{p.email}</TableCell>
                              <TableCell className="text-center">
                                <Badge variant="outline">{p.role}</Badge>
                              </TableCell>
                              <TableCell>
                                <Button variant="ghost" size="icon" onClick={() => removeProfessional(p.id)} className="text-destructive hover:text-destructive">
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
                    Selecione um residente para gerenciar profissionais
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Order Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" /> Status do Pedido
                  {selectedResident && (
                    <Badge className="ml-2">
                      {residents.find((r) => r.id === selectedResident)?.name}
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedResident ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-3">
                        <Package className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-foreground">Lista de Produtos</p>
                          <p className="text-xs text-muted-foreground">Status da confirmação da lista de produtos</p>
                        </div>
                      </div>
                      <Badge className={getOrderStatus(selectedResident).products === "Recebido"
                        ? "bg-green-600 text-white hover:bg-green-600"
                        : "bg-red-500 text-white hover:bg-red-500"
                      }>
                        {getOrderStatus(selectedResident).products}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-foreground">Status de Pagamento</p>
                          <p className="text-xs text-muted-foreground">Status do pagamento pela família</p>
                        </div>
                      </div>
                      <Badge className={getOrderStatus(selectedResident).payment === "Recebido"
                        ? "bg-green-600 text-white hover:bg-green-600"
                        : "bg-red-500 text-white hover:bg-red-500"
                      }>
                        {getOrderStatus(selectedResident).payment}
                      </Badge>
                    </div>
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    Selecione um residente para ver o status
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
