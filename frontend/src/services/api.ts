export type Blog = {
  id: number;
  title: string;
  content: string;
  author: string;
  published: string;
  date_created: string;
};

export type BlogInput = Omit<Blog, "id" | "date_created">;

const API_BASE_URL = "http://localhost:8000";

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.detail ?? "Something went wrong");
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

export const getBlogs = () => request<Blog[]>("/blogs/");

export const getBlog = (id: number) => request<Blog>(`/blogs/${id}`);

export const createBlog = (blog: BlogInput) =>
  request<Blog>("/blogs/", {
    method: "POST",
    body: JSON.stringify(blog),
  });

export const updateBlog = (id: number, blog: BlogInput) =>
  request<Blog>(`/blogs/${id}`, {
    method: "PUT",
    body: JSON.stringify(blog),
  });

export const deleteBlog = (id: number) =>
  request<string>(`/blogs/${id}`, {
    method: "DELETE",
  });
