import Shell from "@/components/Shell";
import View from "@/views/Features";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("uz", "features");

export default function Page() {
  return <Shell lang="uz" page="features"><View lang="uz" /></Shell>;
}
