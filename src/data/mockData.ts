export interface Resident {
  id: string;
  name: string;
  room: string;
  emails: string[];
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  requiresPrescription: boolean;
  controlledSubstance: boolean;
  unitPrice: number;
}

export interface PrescriptionItem {
  id: string;
  residentId: string;
  medicationId: string;
  quantity: number;
  notes?: string;
}

export interface FamilyMember {
  id: string;
  residentId: string;
  name: string;
  email: string;
  sharePercent: number;
}

export const residents: Resident[] = [
  { id: "r1", name: "Maria da Silva", room: "101", emails: ["filha.maria@email.com"] },
  { id: "r2", name: "João Santos", room: "102", emails: ["filho.joao@email.com", "neta.joao@email.com"] },
  { id: "r3", name: "Ana Oliveira", room: "103", emails: ["sobrinha.ana@email.com"] },
  { id: "r4", name: "Carlos Pereira", room: "201", emails: ["filho.carlos@email.com"] },
];

export const medications: Medication[] = [
  { id: "m1", name: "Losartana 50mg", dosage: "50mg", requiresPrescription: true, controlledSubstance: false, unitPrice: 12.90 },
  { id: "m2", name: "Metformina 850mg", dosage: "850mg", requiresPrescription: true, controlledSubstance: false, unitPrice: 8.50 },
  { id: "m3", name: "Omeprazol 20mg", dosage: "20mg", requiresPrescription: true, controlledSubstance: false, unitPrice: 15.00 },
  { id: "m4", name: "Clonazepam 2mg", dosage: "2mg", requiresPrescription: true, controlledSubstance: true, unitPrice: 22.30 },
  { id: "m5", name: "Vitamina D 1000UI", dosage: "1000UI", requiresPrescription: false, controlledSubstance: false, unitPrice: 35.00 },
  { id: "m6", name: "Cálcio 600mg", dosage: "600mg", requiresPrescription: false, controlledSubstance: false, unitPrice: 28.00 },
  { id: "m7", name: "Dipirona 500mg", dosage: "500mg", requiresPrescription: false, controlledSubstance: false, unitPrice: 6.50 },
  { id: "m8", name: "Rivotril 0,5mg", dosage: "0,5mg", requiresPrescription: true, controlledSubstance: true, unitPrice: 18.90 },
];

export const prescriptionItems: PrescriptionItem[] = [
  { id: "p1", residentId: "r1", medicationId: "m1", quantity: 30 },
  { id: "p2", residentId: "r1", medicationId: "m3", quantity: 30 },
  { id: "p3", residentId: "r1", medicationId: "m5", quantity: 1 },
  { id: "p4", residentId: "r2", medicationId: "m2", quantity: 60 },
  { id: "p5", residentId: "r2", medicationId: "m4", quantity: 30, notes: "Uso contínuo" },
  { id: "p6", residentId: "r3", medicationId: "m1", quantity: 30 },
  { id: "p7", residentId: "r3", medicationId: "m6", quantity: 1 },
  { id: "p8", residentId: "r4", medicationId: "m7", quantity: 20 },
  { id: "p9", residentId: "r4", medicationId: "m8", quantity: 30 },
];

export const familyMembers: FamilyMember[] = [
  { id: "f1", residentId: "r1", name: "Juliana Silva", email: "filha.maria@email.com", sharePercent: 100 },
  { id: "f2", residentId: "r2", name: "Pedro Santos", email: "filho.joao@email.com", sharePercent: 60 },
  { id: "f3", residentId: "r2", name: "Camila Santos", email: "neta.joao@email.com", sharePercent: 40 },
  { id: "f4", residentId: "r3", name: "Fernanda Oliveira", email: "sobrinha.ana@email.com", sharePercent: 100 },
  { id: "f5", residentId: "r4", name: "Roberto Pereira", email: "filho.carlos@email.com", sharePercent: 100 },
];
