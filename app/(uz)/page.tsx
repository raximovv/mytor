import Shell from "@/components/Shell";
import View from "@/views/Home";
import { homeJsonLd } from "@/views/Home";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("uz", "home");

export default function Page() {
  return <Shell lang="uz" page="home" jsonld={homeJsonLd("uz")}><View lang="uz" /></Shell>;
}
