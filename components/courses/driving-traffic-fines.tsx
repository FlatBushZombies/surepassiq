import { AlertTriangle, Gavel, ScrollText } from "lucide-react";

const commonOffences = [
  "Speeding / exceeding the posted limit",
  "Driving without a valid licence or Provisional Learner's Licence",
  "Not wearing a seatbelt",
  "Using a mobile phone while driving",
  "Driving an unroadworthy or unlicensed vehicle",
  "Disregarding a robot, stop sign, or road marking",
  "Reckless or negligent driving",
  "Driving under the influence of alcohol or drugs",
];

export function DrivingTrafficFines() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <h3 className="flex items-center gap-2 text-2xl font-bold text-card-foreground">
          <Gavel className="h-6 w-6 text-primary" />
          Traffic Fines in Zimbabwe
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          How traffic offences are penalised under Zimbabwean law.
        </p>

        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-border bg-background/50 p-4">
          <ScrollText className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <div>
            <p className="font-bold text-card-foreground">Admission of guilt fines</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Under Section 356 of the Criminal Procedure and Evidence Act [Chapter 9:07], a police
              officer may offer an admission of guilt fine for minor traffic offences instead of
              taking the matter to court. Paying the fine is treated as an admission of guilt and
              settles the charge.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <h4 className="text-lg font-bold text-card-foreground">Common offences that attract a fine</h4>
        <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
          {commonOffences.map((offence) => (
            <div
              key={offence}
              className="rounded-xl border border-border bg-background/50 p-3 text-sm text-card-foreground"
            >
              {offence}
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-start gap-2 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-900 dark:text-amber-200">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <p>
            Fine amounts are set and periodically revised by statutory instrument, so this course does
            not list specific figures that could go out of date. Confirm current fine amounts with the
            Zimbabwe Republic Police (ZRP) or the Ministry of Home Affairs before relying on a number —
            the goal here is to understand which offences carry a fine and why, not to memorise a price
            list.
          </p>
        </div>
      </div>
    </div>
  );
}
