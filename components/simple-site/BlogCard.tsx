import type { Blog } from "@/components/types";
import RetroLinkButton from "@/components/simple-site/RetroLinkButton";
import { Card } from "pixel-retroui";
import { RETRO_CARD_PROPS } from "@/components/simple-site/theme";
import { formatDate, resolveBlogSlug } from "@/lib/simple-site";

interface BlogCardProps {
  blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
  const slug = resolveBlogSlug(blog);

  return (
    <Card {...RETRO_CARD_PROPS} className="simple-retro-card simple-blog-card">
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
        <RetroLinkButton href={`/simple/blog/${slug}`} variant="primary" className="simple-card-button">
          Read Post
        </RetroLinkButton>
      </div>
    </Card>
  );
}
