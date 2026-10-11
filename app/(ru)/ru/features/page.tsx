import Shell from "@/components/Shell";
import View from "@/views/Features";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("ru", "features");

export default function Page() {
  return <Shell lang="ru" page="features"><View lang="ru" /></Shell>;
}
