import type { ReactNode } from "react";
import RootDocument, { sharedMetadata, sharedViewport } from "@/components/RootDocument";

export const metadata = sharedMetadata;
export const viewport = sharedViewport;

export default function Layout({ children }: { children: ReactNode }) {
  return <RootDocument lang="uz">{children}</RootDocument>;
}
