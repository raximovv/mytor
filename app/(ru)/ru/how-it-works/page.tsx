import Shell from "@/components/Shell";
import View from "@/views/How";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("ru", "how");

export default function Page() {
  return <Shell lang="ru" page="how"><View lang="ru" /></Shell>;
}
