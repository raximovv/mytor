import Shell from "@/components/Shell";
import View from "@/views/Privacy";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("uz", "privacy");

export default function Page() {
  return <Shell lang="uz" page="privacy"><View lang="uz" /></Shell>;
}
