import { useEffect, useState } from "react";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import {
  createBlog,
  deleteBlog,
  getBlog,
  getBlogs,
  updateBlog,
  type Blog,
  type BlogInput,
} from "./services/api";
import "./App.css";

function App() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadBlogs = async () => {
    try {
      setError("");
      setLoading(true);
      setBlogs(await getBlogs());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadBlogs();
  }, []);

  const handleCreate = async (blog: BlogInput) => {
    try {
      await createBlog(blog);
      setShowForm(false);
      await loadBlogs();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create blog");
    }
  };

  const handleUpdate = async (blog: BlogInput) => {
    if (!editingBlog) return;

    try {
      await updateBlog(editingBlog.id, blog);
      setEditingBlog(null);
      await loadBlogs();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update blog");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this blog?")) return;

    try {
      await deleteBlog(id);
      if (selectedBlog?.id === id) setSelectedBlog(null);
      await loadBlogs();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete blog");
    }
  };

  const handleView = async (blog: Blog) => {
    try {
      setSelectedBlog(await getBlog(blog.id));
      setEditingBlog(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load blog");
    }
  };

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">FastAPI + React</p>
          <h1>My Blog</h1>
          <p className="subtitle">Create, read, update and delete blog posts.</p>
        </div>
        <button onClick={() => { setShowForm(true); setEditingBlog(null); setSelectedBlog(null); }}>
          + New Blog
        </button>
      </header>

      {error && <div className="error-banner">{error}</div>}

      {showForm && (
        <section className="panel">
          <h2>Create a blog</h2>
          <BlogForm submitLabel="Create blog" onSubmit={handleCreate} onCancel={() => setShowForm(false)} />
        </section>
      )}

      {editingBlog && (
        <section className="panel">
          <h2>Edit blog</h2>
          <BlogForm
            initialValues={{
              title: editingBlog.title,
              content: editingBlog.content,
              author: editingBlog.author,
              published: editingBlog.published,
            }}
            submitLabel="Save changes"
            onSubmit={handleUpdate}
            onCancel={() => setEditingBlog(null)}
          />
        </section>
      )}

      {selectedBlog && (
        <section className="panel blog-detail">
          <div className="detail-header">
            <div>
              <span className={`status ${selectedBlog.published.toLowerCase()}`}>
                {selectedBlog.published}
              </span>
              <h2>{selectedBlog.title}</h2>
              <p>By {selectedBlog.author} · {new Date(selectedBlog.date_created).toLocaleString()}</p>
            </div>
            <button className="secondary" onClick={() => setSelectedBlog(null)}>Close</button>
          </div>
          <p className="detail-content">{selectedBlog.content}</p>
        </section>
      )}

      <section>
        <div className="section-heading">
          <h2>All blogs</h2>
          <button className="secondary" onClick={() => void loadBlogs()}>Refresh</button>
        </div>
        {loading ? <p className="empty-state">Loading blogs...</p> : <BlogList blogs={blogs} onView={handleView} onEdit={(blog) => { setEditingBlog(blog); setSelectedBlog(null); setShowForm(false); }} onDelete={handleDelete} />}
      </section>
    </main>
  );
}

export default App;
