import Shell from "@/components/Shell";
import View from "@/views/Privacy";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("ru", "privacy");

export default function Page() {
  return <Shell lang="ru" page="privacy"><View lang="ru" /></Shell>;
}
