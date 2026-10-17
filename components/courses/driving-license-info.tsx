import { CheckCircle2, IdCard } from "lucide-react";

const licenseClasses = [
  { code: "A1", vehicles: "Small motorcycles up to 125cc" },
  { code: "A", vehicles: "Motorcycles" },
  { code: "B1", vehicles: "Quadricycles, including quad bikes and motorised tricycles" },
  { code: "B", vehicles: "Light motor vehicles, including cars and minibuses up to 3,500kg" },
  { code: "BE", vehicles: "Class B vehicles towing a trailer" },
  { code: "C1", vehicles: "Light trucks, 3,500kg to 7,500kg" },
  { code: "C", vehicles: "Heavy trucks over 7,500kg" },
  { code: "CE", vehicles: "Class C vehicles towing a trailer" },
  { code: "D1", vehicles: "Light buses / minibuses with up to 16 seats" },
  { code: "D", vehicles: "Heavy buses with more than 16 seats" },
  { code: "DE", vehicles: "Class D vehicles towing a trailer" },
];

const licenseSteps = [
  {
    title: "Apply for a Provisional Learner's Licence",
    detail: "Apply at a Vehicle Inspection Department (VID) branch with valid identification and pass the computer-based theory test covering road signs, rules of the road, and hazard awareness.",
  },
  {
    title: "Complete practical driving lessons",
    detail: "Learn with a licensed instructor or supervised driver while holding your Provisional Learner's Licence, building the hours and skill needed for the practical test.",
  },
  {
    title: "Pass the practical driving test",
    detail: "Sit the practical road test with a VID examiner, along with a basic vision test. Passing on an automatic-transmission vehicle restricts the licence to automatic vehicles only.",
  },
  {
    title: "Receive your full driver's licence",
    detail: "Once you pass the practical test, VID issues your full licence for the vehicle class you tested in (most learners start with Class B for light motor vehicles).",
  },
];

export function DrivingLicenseInfo() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <h3 className="flex items-center gap-2 text-2xl font-bold text-card-foreground">
          <IdCard className="h-6 w-6 text-primary" />
          Driver&apos;s Licence in Zimbabwe
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          General guidance on licence classes and the path from a Provisional Learner&apos;s Licence to a
          full licence, administered by the Vehicle Inspection Department (VID). Zimbabwe&apos;s licence
          categories follow SADC-aligned classes — confirm current requirements and fees with your
          nearest VID branch.
        </p>

        <h4 className="mt-6 text-sm font-bold uppercase tracking-wider text-muted-foreground">
          Licence Classes
        </h4>
        <div className="mt-3 overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-left text-sm">
            <tbody>
              {licenseClasses.map((item, idx) => (
                <tr
                  key={item.code}
                  className={idx % 2 === 0 ? "bg-background/50" : "bg-card"}
                >
                  <td className="w-20 border-b border-border p-3 font-bold text-card-foreground">
                    {item.code}
                  </td>
                  <td className="border-b border-border p-3 text-muted-foreground">
                    {item.vehicles}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <h4 className="text-lg font-bold text-card-foreground">How to get your licence</h4>
        <div className="mt-5 space-y-3">
          {licenseSteps.map((step, idx) => (
            <div key={step.title} className="flex items-start gap-3 rounded-2xl border border-border bg-background/50 p-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                {idx + 1}
              </span>
              <div>
                <p className="font-bold text-card-foreground">{step.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-start gap-2 rounded-2xl border border-primary/20 bg-primary/5 p-4 text-sm text-muted-foreground">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <p>
            This course&apos;s Road Signs, Intersection Rules, and Practise/Mock Test tabs prepare you
            for the VID theory test — the first step toward your Provisional Learner&apos;s Licence.
          </p>
        </div>
      </div>
    </div>
  );
}
