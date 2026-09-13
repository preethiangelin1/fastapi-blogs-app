import { useEffect, useState } from "react";
import type { BlogInput } from "../services/api";

type BlogFormProps = {
  initialValues?: BlogInput;
  submitLabel: string;
  onSubmit: (blog: BlogInput) => Promise<void>;
  onCancel?: () => void;
};

const emptyBlog: BlogInput = {
  title: "",
  content: "",
  author: "",
  published: "draft",
};

export default function BlogForm({
  initialValues,
  submitLabel,
  onSubmit,
  onCancel,
}: BlogFormProps) {
  const [form, setForm] = useState<BlogInput>(initialValues ?? emptyBlog);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm(initialValues ?? emptyBlog);
  }, [initialValues]);

  const updateField = (field: keyof BlogInput, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    try {
      await onSubmit(form);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="blog-form" onSubmit={handleSubmit}>
      <label>
        Title
        <input
          required
          value={form.title}
          onChange={(event) => updateField("title", event.target.value)}
          placeholder="Enter a title"
        />
      </label>

      <label>
        Author
        <input
          required
          value={form.author}
          onChange={(event) => updateField("author", event.target.value)}
          placeholder="Your name"
        />
      </label>

      <label>
        Status
        <select
          value={form.published}
          onChange={(event) => updateField("published", event.target.value)}
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </label>

      <label>
        Content
        <textarea
          required
          rows={8}
          value={form.content}
          onChange={(event) => updateField("content", event.target.value)}
          placeholder="Write your blog post..."
        />
      </label>

      <div className="form-actions">
        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : submitLabel}
        </button>
        {onCancel && (
          <button type="button" className="secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
