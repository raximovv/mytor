import Shell from "@/components/Shell";
import View from "@/views/Pricing";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("uz", "pricing");

export default function Page() {
  return <Shell lang="uz" page="pricing"><View lang="uz" /></Shell>;
}
