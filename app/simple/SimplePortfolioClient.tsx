"use client";

import { useState } from "react";
import { PortfolioData, Project } from "@/components/types";
import { RetroLayout } from "@/components/RetroLayout";
import { SkillCard } from "@/components/SkillCard";
import { ProjectCard } from "@/components/ProjectCard";
import { Card, Button } from "pixel-retroui";

interface Props {
  data: PortfolioData;
}

const projectTabs = [
  { key: "all", label: "🎮 All", filter: () => true },
  { key: "mobile", label: "📱 Mobile Games", filter: (p: Project) => p.category === "mobile" },
  { key: "gamejam", label: "🏆 Game Jams", filter: (p: Project) => p.category === "gamejam" },
  { key: "personal", label: "🌟 Personal", filter: (p: Project) => p.category === "personal" },
  { key: "pc", label: "🖥️ PC Games", filter: (p: Project) => p.category === "pc" },
  { key: "tools", label: "🔧 Tools", filter: (p: Project) => p.category === "tools" },
] as const;

export function SimplePortfolioClient({ data }: Props) {
  const [activeTab, setActiveTab] = useState("all");

  const currentFilter = projectTabs.find((t) => t.key === activeTab)?.filter ?? (() => true);
  const filteredProjects = data.projects.filter(currentFilter);

  return (
    <RetroLayout>
      {/* Header */}
      <section className="text-center mb-12">
        <Card
          bg="#1a1a2e"
          textColor="#c4b5fd"
          borderColor="#6d28d9"
          shadowColor="#4c1d95"
          className="p-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold neon-glow text-purple-300 mb-2">
            {data.name}
          </h1>
          <p className="text-xl text-purple-400">{data.title}</p>
          <p className="text-sm text-purple-500 mt-1">📍 {data.about.location}</p>
        </Card>
      </section>

      {/* About */}
      <section className="mb-10">
        <SectionTitle title="About" icon="📖" />
        <Card
          bg="#1a1a2e"
          textColor="#c4b5fd"
          borderColor="#6d28d9"
          shadowColor="#4c1d95"
          className="p-6"
        >
          <p className="text-purple-300 leading-relaxed">{data.about.bio}</p>
        </Card>
      </section>

      {/* Skills */}
      <section className="mb-10">
        <SectionTitle title="Skills" icon="⚔️" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.skills.map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </div>
      </section>

      {/* Projects — Tabbed by category */}
      <section className="mb-10">
        <SectionTitle title="Projects" icon="🏗️" />
        <div className="flex flex-wrap gap-2 mb-6">
          {projectTabs.map((tab) => {
            const count = tab.key === "all" ? data.projects.length : data.projects.filter(tab.filter).length;
            if (count === 0 && tab.key !== "all") return null;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded text-sm font-bold border-2 transition-all cursor-pointer ${
                  activeTab === tab.key
                    ? "bg-purple-700 border-purple-400 text-white"
                    : "bg-[#1a1a2e] border-purple-800 text-purple-400 hover:border-purple-500"
                }`}
              >
                {tab.label} ({count})
              </button>
            );
          })}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
          {filteredProjects.length === 0 && (
            <p className="text-purple-500 col-span-2 text-center py-8">No projects in this category yet.</p>
          )}
        </div>
      </section>

      {/* Blogs */}
      {data.blogs && data.blogs.length > 0 && (
        <section className="mb-10">
          <SectionTitle title="Blogs" icon="📝" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.blogs.map((blog) => (
              <Card
                key={blog.title}
                bg="#1a1a2e"
                textColor="#c4b5fd"
                borderColor="#6d28d9"
                shadowColor="#4c1d95"
                className="p-5"
              >
                <h3 className="text-lg font-bold text-purple-300 mb-2">{blog.title}</h3>
                <p className="text-sm text-purple-400 mb-4">{blog.description}</p>
                <div className="flex flex-wrap gap-2">
                  {blog.linkedin && (
                    <a href={blog.linkedin} target="_blank" rel="noopener noreferrer">
                      <Button
                        bg="#7c3aed"
                        textColor="#ffffff"
                        shadow="#4c1d95"
                        borderColor="#a855f7"
                        className="text-xs px-3 py-1"
                      >
                        📖 Read on LinkedIn
                      </Button>
                    </a>
                  )}
                  {blog.github && (
                    <a href={blog.github} target="_blank" rel="noopener noreferrer">
                      <Button
                        bg="#1e1b4b"
                        textColor="#c4b5fd"
                        shadow="#0f0a2e"
                        borderColor="#6d28d9"
                        className="text-xs px-3 py-1"
                      >
                        💻 GitHub
                      </Button>
                    </a>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Achievements */}
      <section className="mb-10">
        <SectionTitle title="Achievements" icon="🏅" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.achievements.map((achievement) => (
            <Card
              key={achievement.title}
              bg="#1a1a2e"
              textColor="#c4b5fd"
              borderColor="#6d28d9"
              shadowColor="#4c1d95"
              className="p-4"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🏆</span>
                <div>
                  <h3 className="text-purple-300 font-bold">{achievement.title}</h3>
                  <p className="text-xs text-purple-500">{achievement.year}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="mb-20">
        <SectionTitle title="Contact" icon="📬" />
        <Card
          bg="#1a1a2e"
          textColor="#c4b5fd"
          borderColor="#6d28d9"
          shadowColor="#4c1d95"
          className="p-6"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {data.contact.github && (
              <a href={data.contact.github} target="_blank" rel="noopener noreferrer">
                <Button
                  bg="#7c3aed"
                  textColor="#ffffff"
                  shadow="#4c1d95"
                  borderColor="#a855f7"
                  className="px-6 py-2 cursor-pointer"
                >
                  🐙 GitHub
                </Button>
              </a>
            )}
            {data.contact.linkedin && (
              <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer">
                <Button
                  bg="#7c3aed"
                  textColor="#ffffff"
                  shadow="#4c1d95"
                  borderColor="#a855f7"
                  className="px-6 py-2 cursor-pointer"
                >
                  💼 LinkedIn
                </Button>
              </a>
            )}
            {data.contact.email && (
              <a href={`mailto:${data.contact.email}`}>
                <Button
                  bg="#7c3aed"
                  textColor="#ffffff"
                  shadow="#4c1d95"
                  borderColor="#a855f7"
                  className="px-6 py-2 cursor-pointer"
                >
                  ✉️ Email
                </Button>
              </a>
            )}
          </div>
        </Card>
      </section>
    </RetroLayout>
  );
}

function SectionTitle({ title, icon }: { title: string; icon: string }) {
  return (
    <h2 className="text-2xl font-bold text-purple-300 mb-4 flex items-center gap-2">
      <span>{icon}</span> {title}
    </h2>
  );
}
