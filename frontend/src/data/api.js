const API_BASE = (import.meta.env.VITE_API_URL || "http://localhost:3001") + "/api";

function getAuthHeaders() {
  const token = localStorage.getItem("adminToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function fetchData(endpoint, options = {}) {
  try {
    const headers = {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
      ...options.headers,
    };
    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
    });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn(`API fetch failed for ${endpoint}:`, err.message);
    return null;
  }
}

export async function apiGetProjects() {
  return fetchData("/projects");
}

export async function apiGetProject(id) {
  return fetchData(`/projects/${id}`);
}

export async function apiCreateProject(data) {
  let slug = data.title
    .toLowerCase()
    .replace(/[^a-z0-9\u0600-\u06FF]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .replace(/-+/g, "-");
  if (!slug) slug = "project-" + Date.now();
  return fetchData("/projects", {
    method: "POST",
    body: JSON.stringify({ ...data, slug }),
  });
}

export async function apiUpdateProject(id, data) {
  return fetchData(`/projects/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function apiDeleteProject(id) {
  return fetchData(`/projects/${id}`, { method: "DELETE" });
}

export async function apiUploadProjectScreenshot(id, type, imageData) {
  return fetchData(`/projects/${id}/screenshots/${type}`, {
    method: "PUT",
    body: JSON.stringify({ image: imageData }),
  });
}

export async function apiGetCertificates() {
  return fetchData("/certificates");
}

export async function apiGetCertificate(id) {
  return fetchData(`/certificates/${id}`);
}

export async function apiCreateCertificate(data) {
  return fetchData("/certificates", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function apiUpdateCertificate(id, data) {
  return fetchData(`/certificates/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function apiDeleteCertificate(id) {
  return fetchData(`/certificates/${id}`, { method: "DELETE" });
}

export async function apiGetCv() {
  return fetchData("/cv");
}

export async function apiUploadCv(file) {
  const formData = new FormData();
  formData.append("cv", file);
  try {
    const res = await fetch(`${API_BASE}/cv/upload`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: formData,
    });
    if (!res.ok) throw new Error("Upload failed");
    return await res.json();
  } catch (err) {
    console.warn("CV upload failed:", err.message);
    return null;
  }
}

export async function apiSetCvUrl(url) {
  return fetchData("/cv/url", {
    method: "POST",
    body: JSON.stringify({ url }),
  });
}

export async function apiLogin(username, password) {
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) throw new Error("Login failed");
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn("Login failed:", err.message);
    return null;
  }
}

export function apiLogout() {
  localStorage.removeItem("adminToken");
}

export function apiIsAuthenticated() {
  return !!localStorage.getItem("adminToken");
}
