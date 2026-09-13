import type { Blog } from "../services/api";
import BlogCard from "./BlogCard";

type BlogListProps = {
  blogs: Blog[];
  onView: (blog: Blog) => void;
  onEdit: (blog: Blog) => void;
  onDelete: (id: number) => void;
};

export default function BlogList({ blogs, onView, onEdit, onDelete }: BlogListProps) {
  if (blogs.length === 0) {
    return <p className="empty-state">No blogs yet. Create your first post.</p>;
  }

  return (
    <section className="blog-grid">
      {blogs.map((blog) => (
        <BlogCard
          key={blog.id}
          blog={blog}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
}
