"use client";

import { type ReactNode } from "react";
import { useUser } from "@clerk/nextjs";

interface HomeGateProps {
  memberHome: ReactNode;
  marketingHome: ReactNode;
}

export function HomeGate({ memberHome, marketingHome }: HomeGateProps) {
  const { isLoaded, isSignedIn } = useUser();

  if (isLoaded && isSignedIn) {
    return <>{memberHome}</>;
  }

  return <>{marketingHome}</>;
}
