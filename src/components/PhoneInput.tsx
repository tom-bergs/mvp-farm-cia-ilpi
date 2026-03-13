import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const countryCodes = [
  { value: "+55", label: "🇧🇷 +55" },
  { value: "+1", label: "🇺🇸 +1" },
  { value: "+351", label: "🇵🇹 +351" },
  { value: "+54", label: "🇦🇷 +54" },
  { value: "+598", label: "🇺🇾 +598" },
];

export interface PhoneValue {
  countryCode: string;
  ddd: string;
  number: string;
}

interface PhoneInputProps {
  value: PhoneValue;
  onChange: (value: PhoneValue) => void;
  className?: string;
}

export default function PhoneInput({ value, onChange, className }: PhoneInputProps) {
  return (
    <div className={`flex gap-1.5 ${className ?? ""}`}>
      <Select
        value={value.countryCode}
        onValueChange={(v) => onChange({ ...value, countryCode: v })}
      >
        <SelectTrigger className="w-[100px] h-8 text-xs shrink-0">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {countryCodes.map((c) => (
            <SelectItem key={c.value} value={c.value}>
              {c.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        placeholder="DDD"
        maxLength={3}
        value={value.ddd}
        onChange={(e) => onChange({ ...value, ddd: e.target.value.replace(/\D/g, "") })}
        className="w-16 h-8 text-sm text-center shrink-0"
      />
      <Input
        placeholder="Número"
        maxLength={10}
        value={value.number}
        onChange={(e) => onChange({ ...value, number: e.target.value.replace(/\D/g, "") })}
        className="h-8 text-sm flex-1"
      />
    </div>
  );
}

export const emptyPhone: PhoneValue = { countryCode: "+55", ddd: "", number: "" };

export function formatPhone(p: PhoneValue): string {
  if (!p.ddd && !p.number) return "";
  return `${p.countryCode} (${p.ddd}) ${p.number}`;
}
