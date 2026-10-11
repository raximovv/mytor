import Shell from "@/components/Shell";
import View from "@/views/Demo";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("ru", "demo");

export default function Page() {
  return <Shell lang="ru" page="demo"><View lang="ru" /></Shell>;
}
