import Shell from "@/components/Shell";
import View from "@/views/About";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("ru", "about");

export default function Page() {
  return <Shell lang="ru" page="about"><View lang="ru" /></Shell>;
}
