import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DONATION_DESIGNATIONS } from "@/lib/constants";

/**
 * Donor information fields. Name and message are optional — Stripe Checkout
 * collects payment details and a verified email on its own page.
 */
export function DonorInfoForm() {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="designation">Designation</Label>
        <Select name="designation" defaultValue={DONATION_DESIGNATIONS[0]}>
          <SelectTrigger id="designation" className="w-full rounded-md">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {DONATION_DESIGNATIONS.map((designation) => (
              <SelectItem key={designation} value={designation}>
                {designation}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="donor-name">
            Name{" "}
            <span className="font-normal text-muted-foreground">(optional)</span>
          </Label>
          <Input
            id="donor-name"
            name="donorName"
            autoComplete="name"
            placeholder="Jane Doe"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="donor-email">
            Email{" "}
            <span className="font-normal text-muted-foreground">(optional)</span>
          </Label>
          <Input
            id="donor-email"
            name="donorEmail"
            type="email"
            autoComplete="email"
            placeholder="jane@email.com"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="donor-message">
          Message of support{" "}
          <span className="font-normal text-muted-foreground">(optional)</span>
        </Label>
        <Textarea
          id="donor-message"
          name="message"
          rows={2}
          placeholder="In memory of…, with love from…"
        />
      </div>
    </div>
  );
}
