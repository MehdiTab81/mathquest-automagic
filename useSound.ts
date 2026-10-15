import { useEffect, useState } from "react";
import { isMuted, onMutedChange, setMuted } from "@/lib/sound";

/** État « son coupé / son actif », partagé par tous les composants. */
export function useMuted(): [boolean, (value: boolean) => void] {
  const [muted, setLocal] = useState(isMuted());
  useEffect(() => onMutedChange(setLocal), []);
  return [muted, setMuted];
}
