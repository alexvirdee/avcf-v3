import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DONATION_DESIGNATIONS } from "@/lib/constants";

/**
 * Donor information fields — UI only.
 * TODO(donations): wire these values into the payment provider's customer /
 * metadata fields (Stripe Checkout `customer_email`, Donorbox donor info, etc).
 */
export function DonorInfoForm() {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="designation">Designation</Label>
        <Select defaultValue={DONATION_DESIGNATIONS[0]}>
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
          <Label htmlFor="first-name">First name</Label>
          <Input id="first-name" name="firstName" autoComplete="given-name" placeholder="Jane" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="last-name">Last name</Label>
          <Input id="last-name" name="lastName" autoComplete="family-name" placeholder="Doe" required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="donor-email">Email</Label>
        <Input
          id="donor-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="jane@email.com"
          required
        />
      </div>
    </div>
  );
}
