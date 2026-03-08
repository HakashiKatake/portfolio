import PageIntro from "@/components/simple-site/PageIntro";
import ProjectCard from "@/components/simple-site/ProjectCard";
import { getPortfolioData } from "@/data/loader";
import { getSortedProjects, isPublicAssetAvailable } from "@/lib/simple-site";

export default function ProjectsPage() {
  const data = getPortfolioData();
  const projects = getSortedProjects(data);

  return (
    <div>
      <PageIntro
        label="Project Archive"
        title="Production logs across mobile, jam, and personal work."
        summary="Every entry includes context, stack, role, and key implementation takeaways."
        aside={<p>The archive is sorted by year, then alphabetically. Each project has its own detailed page.</p>}
      />

      <section className="simple-section">
        <h2 className="simple-section-title">All Projects</h2>
        <div className="simple-grid simple-grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id ?? project.name}
              project={project}
              hrefBase="/simple/projects"
              hasCover={isPublicAssetAvailable(project.cover)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
