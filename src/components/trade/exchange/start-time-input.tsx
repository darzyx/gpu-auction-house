import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function StartTimeInput() {
    const formatTime = (hour: number) => {
        const period = hour >= 12 ? "PM" : "AM";
        const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
        return `${String(displayHour)}:00 ${period}`;
    };

    return (
        <div>
            <Label htmlFor="start-time" className="text-xs">
                Start Time
            </Label>
            <Select>
                <SelectTrigger id="start-time">
                    <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {Array.from({ length: 24 }, (_, i) => (
                            <SelectItem key={i} value={String(i).padStart(2, "0")} className="px-2">
                                <div className="w-[200px] flex justify-between">
                                    <span>{formatTime(i)}</span>
                                    <span>${(456234).toLocaleString()}</span>
                                </div>
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
