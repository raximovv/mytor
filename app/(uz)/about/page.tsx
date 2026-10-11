import Shell from "@/components/Shell";
import View from "@/views/About";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("uz", "about");

export default function Page() {
  return <Shell lang="uz" page="about"><View lang="uz" /></Shell>;
}
