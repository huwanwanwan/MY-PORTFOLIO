import SiteShell from "../../components/site-shell";
import { AboutSection } from "../../components/portfolio-sections";

export default function AboutPage() {
  return (
    <SiteShell activePage="about">
      <AboutSection />
    </SiteShell>
  );
}
