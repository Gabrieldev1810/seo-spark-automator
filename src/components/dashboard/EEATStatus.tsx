
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, HelpCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface EEATItemProps {
  name: string;
  status: "good" | "warning" | "bad";
  description: string;
}

const eeatItems: EEATItemProps[] = [
  {
    name: "Experience",
    status: "good",
    description: "First-hand experience signals detected",
  },
  {
    name: "Expertise",
    status: "good",
    description: "Author credentials and expertise signals found",
  },
  {
    name: "Authoritativeness",
    status: "warning",
    description: "More backlinks from authority sites needed",
  },
  {
    name: "Trustworthiness",
    status: "bad",
    description: "Missing citations and fact-checking",
  },
];

export function EEATStatus() {
  return (
    <Card className="seo-card">
      <CardHeader>
        <CardTitle>E-E-A-T Signals</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {eeatItems.map((item) => (
            <div key={item.name} className="flex items-start gap-3">
              {item.status === "good" && (
                <CheckCircle2 className="h-5 w-5 text-seo-green flex-shrink-0 mt-0.5" />
              )}
              {item.status === "warning" && (
                <HelpCircle className="h-5 w-5 text-seo-yellow flex-shrink-0 mt-0.5" />
              )}
              {item.status === "bad" && (
                <XCircle className="h-5 w-5 text-seo-red flex-shrink-0 mt-0.5" />
              )}
              <div>
                <h4 className="text-sm font-medium">{item.name}</h4>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
