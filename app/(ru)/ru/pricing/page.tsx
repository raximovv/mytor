import Shell from "@/components/Shell";
import View from "@/views/Pricing";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("ru", "pricing");

export default function Page() {
  return <Shell lang="ru" page="pricing"><View lang="ru" /></Shell>;
}
