import type { Blog } from "../services/api";

type BlogCardProps = {
  blog: Blog;
  onView: (blog: Blog) => void;
  onEdit: (blog: Blog) => void;
  onDelete: (id: number) => void;
};

export default function BlogCard({ blog, onView, onEdit, onDelete }: BlogCardProps) {
  return (
    <article className="blog-card">
      <div className="blog-card__header">
        <span className={`status ${blog.published.toLowerCase()}`}>
          {blog.published}
        </span>
        <time dateTime={blog.date_created}>
          {new Date(blog.date_created).toLocaleDateString()}
        </time>
      </div>

      <h2>{blog.title}</h2>
      <p className="blog-card__author">By {blog.author}</p>
      <p className="blog-card__excerpt">{blog.content}</p>

      <div className="blog-card__actions">
        <button onClick={() => onView(blog)}>View</button>
        <button onClick={() => onEdit(blog)}>Edit</button>
        <button className="danger" onClick={() => onDelete(blog.id)}>
          Delete
        </button>
      </div>
    </article>
  );
}
