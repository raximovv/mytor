import Shell from "@/components/Shell";
import View from "@/views/Home";
import { homeJsonLd } from "@/views/Home";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("ru", "home");

export default function Page() {
  return <Shell lang="ru" page="home" jsonld={homeJsonLd("ru")}><View lang="ru" /></Shell>;
}
