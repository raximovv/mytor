import Shell from "@/components/Shell";
import View from "@/views/NotFound";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("ru", "notfound");

export default function Page() {
  return <Shell lang="ru" page="notfound" noindex><View lang="ru" /></Shell>;
}
