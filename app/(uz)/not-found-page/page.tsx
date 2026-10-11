import Shell from "@/components/Shell";
import View from "@/views/NotFound";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("uz", "notfound");

export default function Page() {
  return <Shell lang="uz" page="notfound" noindex><View lang="uz" /></Shell>;
}
