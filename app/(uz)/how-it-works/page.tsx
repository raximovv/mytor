import Shell from "@/components/Shell";
import View from "@/views/How";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("uz", "how");

export default function Page() {
  return <Shell lang="uz" page="how"><View lang="uz" /></Shell>;
}
