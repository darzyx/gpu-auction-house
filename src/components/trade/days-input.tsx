import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DaysInput({
    id = "days",
    label = "DAYS",
    placeholder = "0",
    value,
    onChange,
}: {
    id?: string;
    label?: string;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
}) {
    return (
        <div className="space-y-1">
            <Label htmlFor={id} className="text-xs">
                {label}
            </Label>
            <Input
                id={id}
                type="number"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}
