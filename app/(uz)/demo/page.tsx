import Shell from "@/components/Shell";
import View from "@/views/Demo";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("uz", "demo");

export default function Page() {
  return <Shell lang="uz" page="demo"><View lang="uz" /></Shell>;
}
