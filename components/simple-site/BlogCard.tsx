import Link from "next/link";
import type { Blog } from "@/components/types";
import { formatDate, resolveBlogSlug } from "@/lib/simple-site";

interface BlogCardProps {
  blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
  const slug = resolveBlogSlug(blog);

  return (
    <article className="simple-card simple-blog-card">
      <Link href={`/simple/blog/${slug}`} className="simple-card-link" aria-label={`Open post ${blog.title}`}>
        <div className="simple-card-content">
          <p className="simple-kicker">{formatDate(blog.date)}</p>
          <h2 className="simple-card-title">{blog.title}</h2>
          <p className="simple-card-text">{blog.description}</p>
          <div className="simple-tag-row">
            {(blog.tags ?? []).map((tag) => (
              <span key={tag} className="simple-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}
