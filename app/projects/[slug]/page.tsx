import Link from "next/link";
import { notFound } from "next/navigation";
import SiteShell from "../../../components/site-shell";
import ProjectsShowcase from "../../../components/projects-showcase";
import { projectsData } from "../../../data/projects-data";

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectsData.find((item) => item.id === slug);
  if (!project) notFound();

  return (
    <SiteShell activePage="projects">
      <section className="section-block content-section project-detail-page" id="projects" aria-labelledby="project-heading">
        <Link className="intro-link" href="/projects">All projects</Link>
        <header className="project-detail-heading">
          <p className="editorial-eyebrow">{project.category}</p>
          <h1 id="project-heading" className="editorial-title">{project.title}</h1>
        </header>
        <ProjectsShowcase projectId={slug} />
      </section>
    </SiteShell>
  );
}
