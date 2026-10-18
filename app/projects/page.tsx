import SiteShell from "../../components/site-shell";
import { ProjectsSection } from "../../components/portfolio-sections";

export default function ProjectsPage() {
  return (
    <SiteShell activePage="projects">
      <ProjectsSection />
    </SiteShell>
  );
}
