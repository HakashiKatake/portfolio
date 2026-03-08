import PageIntro from "@/components/simple-site/PageIntro";
import BlogCard from "@/components/simple-site/BlogCard";
import { getPortfolioData } from "@/data/loader";
import { getSortedBlogs } from "@/lib/simple-site";

export default function BlogListPage() {
  const data = getPortfolioData();
  const blogs = getSortedBlogs(data);

  return (
    <div>
      <PageIntro
        label="Dev Journal"
        title="Design notes, architecture decisions, and postmortems."
        summary="Long-form writeups focused on system design, game programming patterns, and production lessons."
        aside={<p>Posts are sorted newest-first. Each page supports local markdown content and external references.</p>}
      />

      <section className="simple-section">
        <h2 className="simple-section-title">All Posts</h2>
        <div className="simple-grid simple-grid-cols-2">
          {blogs.map((blog) => (
            <BlogCard key={blog.slug ?? blog.title} blog={blog} />
          ))}
        </div>
      </section>
    </div>
  );
}
