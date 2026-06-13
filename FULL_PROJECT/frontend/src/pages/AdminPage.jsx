import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  apiGetProjects,
  apiCreateProject,
  apiUpdateProject,
  apiDeleteProject,
  apiGetCertificates,
  apiCreateCertificate,
  apiUpdateCertificate,
  apiDeleteCertificate,
  apiGetCv,
  apiUploadCv,
  apiSetCvUrl,
  apiLogin,
  apiLogout,
  apiIsAuthenticated,
} from "../data/api";

const tabs = ["CV", "Projects", "Certificates"];

function FileUpload({ label, accept, value, onChange }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-textSecondary">{label}</label>
      {value && (
        <div className="mb-2 overflow-hidden rounded-xl border border-[#d1d9e6] bg-cardWhite">
          {value.startsWith("data:image") ? (
            <img
              src={value}
              alt="Preview"
              className="max-h-48 w-full object-contain"
            />
          ) : (
            <div className="flex items-center gap-2 p-4 text-sm text-textSecondary">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              File uploaded
            </div>
          )}
        </div>
      )}
      <input
        type="file"
        accept={accept}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = (ev) => onChange(ev.target?.result || "");
          if (accept === "application/pdf" || accept?.includes("pdf")) {
            onChange(file);
          } else {
            reader.readAsDataURL(file);
          }
        }}
        className="w-full text-sm text-textSecondary file:mr-3 file:rounded-full file:border-0 file:bg-softBlue/10 file:px-4 file:py-2 file:text-sm file:font-medium file:text-softBlue hover:file:bg-softBlue/20"
      />
    </div>
  );
}

function Input({ label, value, onChange, multiline, type = "text", placeholder }) {
  const C = multiline ? "textarea" : "input";
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-textSecondary">{label}</label>
      <C
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded-xl border border-[#d1d9e6] bg-cardWhite px-4 text-sm text-textPrimary shadow-soft outline-none transition-all duration-300 focus:border-softBlue/50 focus:shadow-lg ${
          multiline ? "min-h-[100px] py-3" : "py-2.5"
        }`}
      />
    </div>
  );
}

function ArrayInput({ label, value, onChange, placeholder }) {
  const items = Array.isArray(value) ? value : [];
  const add = () => onChange([...items, ""]);
  const remove = (i) => onChange(items.filter((_, idx) => idx !== i));
  const update = (i, v) => {
    const next = [...items];
    next[i] = v;
    onChange(next);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-textSecondary">{label}</label>
      {items.map((item, i) => (
        <div key={i} className="flex gap-2">
          <input
            value={item}
            onChange={(e) => update(i, e.target.value)}
            placeholder={placeholder}
            className="flex-1 rounded-xl border border-[#d1d9e6] bg-cardWhite px-4 py-2 text-sm text-textPrimary outline-none focus:border-softBlue/50"
          />
          <button
            onClick={() => remove(i)}
            className="rounded-xl border border-red-200 bg-red-50 px-3 text-sm text-red-500 transition hover:bg-red-100"
          >
            ×
          </button>
        </div>
      ))}
      <button
        onClick={add}
        className="rounded-xl border border-dashed border-[#d1d9e6] bg-cardWhite px-4 py-2 text-sm text-softBlue transition hover:bg-softBlue/5"
      >
        + Add {label}
      </button>
    </div>
  );
}

function CategorySelect({ value, onChange }) {
  const categories = ["All", "Frontend", "Backend", "Design", "Cloud", "Other"];
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-textSecondary">Category</label>
      <select
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-[#d1d9e6] bg-cardWhite px-4 py-2.5 text-sm text-textPrimary outline-none focus:border-softBlue/50"
      >
        {categories.filter((c) => c !== "All").map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
    </div>
  );
}

function CvTab() {
  const [cvUrl, setCvUrl] = useState("");
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    apiGetCv().then((data) => {
      if (data?.url) setCvUrl(data.url);
    });
  }, []);

  const handleUpload = async () => {
    if (!file) return;
    setMsg("Uploading...");
    const result = await apiUploadCv(file);
    if (result) {
      setCvUrl(result.url);
      setFile(null);
      setMsg("CV updated successfully!");
    } else {
      setMsg("Upload failed");
    }
    setTimeout(() => setMsg(""), 3000);
  };

  const handleUrl = async () => {
    if (!cvUrl) return;
    setMsg("Saving...");
    const result = await apiSetCvUrl(cvUrl);
    if (result) {
      setMsg("CV URL updated!");
    } else {
      setMsg("Failed to save");
    }
    setTimeout(() => setMsg(""), 3000);
  };

  return (
    <div className="mx-auto max-w-xl space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-textPrimary">Upload CV</h3>
        <p className="mt-1 text-sm text-textSecondary">Upload a PDF file</p>
        <div className="mt-4 space-y-4">
          <FileUpload
            label="CV PDF"
            accept="application/pdf"
            value={file ? file.name : null}
            onChange={(f) => setFile(f)}
          />
          <button
            onClick={handleUpload}
            disabled={!file}
            className="rounded-full bg-textPrimary px-6 py-2.5 text-sm font-medium text-white transition hover:bg-textPrimary/90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Upload CV
          </button>
        </div>
      </div>

      <div className="border-t border-[#d1d9e6] pt-8">
        <h3 className="text-xl font-semibold text-textPrimary">Or use external URL</h3>
        <p className="mt-1 text-sm text-textSecondary">Paste a direct link to your CV PDF</p>
        <div className="mt-4 flex gap-3">
          <input
            value={cvUrl}
            onChange={(e) => setCvUrl(e.target.value)}
            placeholder="https://example.com/cv.pdf"
            className="flex-1 rounded-xl border border-[#d1d9e6] bg-cardWhite px-4 py-2.5 text-sm text-textPrimary outline-none focus:border-softBlue/50"
          />
          <button
            onClick={handleUrl}
            className="rounded-full bg-textPrimary px-6 py-2.5 text-sm font-medium text-white transition hover:bg-textPrimary/90"
          >
            Save
          </button>
        </div>
      </div>

      <div className="border-t border-[#d1d9e6] pt-8">
        <h3 className="text-xl font-semibold text-textPrimary">Current CV</h3>
        {cvUrl ? (
          <a
            href={cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-2 text-sm text-softBlue hover:underline"
          >
            {cvUrl}
          </a>
        ) : (
          <p className="mt-2 text-sm text-textSecondary">No CV set</p>
        )}
      </div>

      {msg && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm font-medium text-green-600"
        >
          {msg}
        </motion.p>
      )}
    </div>
  );
}

function ProjectForm({ project, onSave, onCancel }) {
  const [form, setForm] = useState({
    title: "",
    shortDescription: "",
    description: "",
    problem: "",
    solution: "",
    features: [],
    techStack: [],
    challenges: [],
    results: "",
    timeline: "",
    liveUrl: "",
    githubUrl: "",
    variant: "dashboard",
    isFeatured: false,
    screenshots: { desktop: null, tablet: null, mobile: null },
    ...project,
  });

  const set = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target?.value ?? e }));

  const setScreenshot = (type) => (val) =>
    setForm((f) => ({ ...f, screenshots: { ...f.screenshots, [type]: val } }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Input label="Title" value={form.title} onChange={set("title")} placeholder="Project name" />
        <Input label="Timeline" value={form.timeline} onChange={set("timeline")} placeholder="Q1 2024 — Q3 2024" />
      </div>
      <Input label="Short Description" value={form.shortDescription} onChange={set("shortDescription")} multiline placeholder="Brief summary" />
      <Input label="Full Description" value={form.description} onChange={set("description")} multiline placeholder="Detailed description" />
      <Input label="Problem" value={form.problem} onChange={set("problem")} multiline placeholder="What problem did this solve?" />
      <Input label="Solution" value={form.solution} onChange={set("solution")} multiline placeholder="How did you solve it?" />
      <ArrayInput label="Features" value={form.features} onChange={set("features")} placeholder="Key feature" />
      <ArrayInput label="Tech Stack" value={form.techStack} onChange={set("techStack")} placeholder="React" />
      <ArrayInput label="Challenges" value={form.challenges} onChange={set("challenges")} placeholder="Technical challenge" />
      <Input label="Results" value={form.results} onChange={set("results")} multiline placeholder="What were the outcomes?" />
      <div className="grid gap-6 sm:grid-cols-2">
        <Input label="Live URL" value={form.liveUrl} onChange={set("liveUrl")} placeholder="https://..." />
        <Input label="GitHub URL" value={form.githubUrl} onChange={set("githubUrl")} placeholder="https://github.com/..." />
      </div>

      {/* Screenshots */}
      <div className="border-t border-[#d1d9e6] pt-6">
        <h4 className="mb-4 text-lg font-semibold text-textPrimary">Screenshots</h4>
        <div className="grid gap-5 sm:grid-cols-3">
          <FileUpload label="Desktop" accept="image/*" value={form.screenshots?.desktop} onChange={setScreenshot("desktop")} />
          <FileUpload label="Tablet" accept="image/*" value={form.screenshots?.tablet} onChange={setScreenshot("tablet")} />
          <FileUpload label="Mobile" accept="image/*" value={form.screenshots?.mobile} onChange={setScreenshot("mobile")} />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="featured"
          checked={form.isFeatured}
          onChange={(e) => setForm((f) => ({ ...f, isFeatured: e.target.checked }))}
          className="h-4 w-4 rounded border-[#d1d9e6] text-softBlue"
        />
        <label htmlFor="featured" className="text-sm font-medium text-textSecondary">Featured project</label>
      </div>
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          className="rounded-full bg-textPrimary px-6 py-2.5 text-sm font-medium text-white transition hover:bg-textPrimary/90"
        >
          {project ? "Update Project" : "Create Project"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-[#d1d9e6] bg-cardWhite px-6 py-2.5 text-sm font-medium text-textSecondary transition hover:border-softBlue/40"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

function ProjectsTab() {
  const [projects, setProjects] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    apiGetProjects().then(setProjects);
  }, []);

  const refresh = () => apiGetProjects().then(setProjects);

  const handleSave = async (data) => {
    if (editing) {
      await apiUpdateProject(editing.id, data);
    } else {
      await apiCreateProject(data);
    }
    setEditing(null);
    setShowForm(false);
    refresh();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this project?")) {
      await apiDeleteProject(id);
      refresh();
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-textPrimary">
          Projects ({projects.length})
        </h3>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(!showForm);
          }}
          className="rounded-full bg-textPrimary px-5 py-2 text-sm font-medium text-white transition hover:bg-textPrimary/90"
        >
          {showForm ? "Close" : "+ New Project"}
        </button>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="rounded-2xl border border-[#d1d9e6] bg-cardWhite p-6 shadow-soft"
        >
          <ProjectForm
            project={editing}
            onSave={handleSave}
            onCancel={() => {
              setEditing(null);
              setShowForm(false);
            }}
          />
        </motion.div>
      )}

      <div className="space-y-3">
        {projects.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between rounded-2xl border border-[#d1d9e6] bg-cardWhite p-5 shadow-soft"
          >
            <div>
              <h4 className="font-medium text-textPrimary">
                {p.title?.replace(/\n/g, " ")}
              </h4>
              <p className="mt-0.5 text-sm text-textSecondary">
                {p.shortDescription || "No description"}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditing(p);
                  setShowForm(true);
                }}
                className="rounded-full border border-[#d1d9e6] bg-cardWhite px-4 py-1.5 text-xs font-medium text-textSecondary transition hover:border-softBlue/40"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="rounded-full border border-red-200 bg-red-50 px-4 py-1.5 text-xs font-medium text-red-500 transition hover:bg-red-100"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <p className="py-8 text-center text-sm text-textSecondary">No projects yet</p>
        )}
      </div>
    </div>
  );
}

function CertificatesTab() {
  const [certs, setCerts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    title: "", issuer: "", issued: "", credentialLink: "",
    description: "", category: "Other", thumbnail: null,
  });

  useEffect(() => {
    apiGetCertificates().then(setCerts);
  }, []);

  const refresh = () => apiGetCertificates().then(setCerts);

  const set = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target?.value ?? e }));

  const resetForm = () => {
    setForm({ title: "", issuer: "", issued: "", credentialLink: "", description: "", category: "Other", thumbnail: null });
    setEditing(null);
    setShowForm(false);
  };

  const openEdit = (cert) => {
    setForm(cert);
    setEditing(cert);
    setShowForm(true);
  };

  const handleSave = async () => {
    if (editing) {
      await apiUpdateCertificate(editing.id, form);
    } else {
      await apiCreateCertificate(form);
    }
    resetForm();
    refresh();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this certificate?")) {
      await apiDeleteCertificate(id);
      refresh();
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-textPrimary">
          Certificates ({certs.length})
        </h3>
        <button
          onClick={() => { resetForm(); setShowForm(!showForm); }}
          className="rounded-full bg-textPrimary px-5 py-2 text-sm font-medium text-white transition hover:bg-textPrimary/90"
        >
          {showForm ? "Close" : "+ New Certificate"}
        </button>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="rounded-2xl border border-[#d1d9e6] bg-cardWhite p-6 shadow-soft"
        >
          <div className="space-y-5">
            <Input label="Title" value={form.title} onChange={set("title")} placeholder="Certificate name" />
            <div className="grid gap-5 sm:grid-cols-3">
              <Input label="Issuer" value={form.issuer} onChange={set("issuer")} placeholder="Meta" />
              <Input label="Issue Date" value={form.issued} onChange={set("issued")} placeholder="Jan 2024" />
              <CategorySelect value={form.category} onChange={set("category")} />
            </div>
            <Input label="Description" value={form.description} onChange={set("description")} multiline placeholder="Description" />
            <Input label="Credential Link" value={form.credentialLink} onChange={set("credentialLink")} placeholder="https://..." />
            <FileUpload
              label="Certificate Image"
              accept="image/*"
              value={form.thumbnail}
              onChange={(val) => setForm((f) => ({ ...f, thumbnail: val }))}
            />
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSave}
                className="rounded-full bg-textPrimary px-6 py-2.5 text-sm font-medium text-white transition hover:bg-textPrimary/90"
              >
                {editing ? "Update" : "Create"}
              </button>
              <button
                onClick={resetForm}
                className="rounded-full border border-[#d1d9e6] bg-cardWhite px-6 py-2.5 text-sm font-medium text-textSecondary transition hover:border-softBlue/40"
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      )}

      <div className="space-y-3">
        {certs.map((c) => (
          <div
            key={c.id}
            className="flex items-center justify-between rounded-2xl border border-[#d1d9e6] bg-cardWhite p-5 shadow-soft"
          >
            <div className="flex items-center gap-4">
              {c.thumbnail && (
                <img src={c.thumbnail} alt="" className="h-12 w-12 rounded-lg object-cover" />
              )}
              <div>
                <h4 className="font-medium text-textPrimary">{c.title}</h4>
                <p className="text-sm text-textSecondary">{c.issuer} · {c.issued}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => openEdit(c)}
                className="rounded-full border border-[#d1d9e6] bg-cardWhite px-4 py-1.5 text-xs font-medium text-textSecondary transition hover:border-softBlue/40"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(c.id)}
                className="rounded-full border border-red-200 bg-red-50 px-4 py-1.5 text-xs font-medium text-red-500 transition hover:bg-red-100"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {certs.length === 0 && (
          <p className="py-8 text-center text-sm text-textSecondary">No certificates yet</p>
        )}
      </div>
    </div>
  );
}

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await apiLogin(username, password);
    setLoading(false);
    if (result?.token) {
      localStorage.setItem("adminToken", result.token);
      onLogin();
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75 }}
        className="w-full max-w-sm"
      >
        <div className="rounded-2xl border border-[#d1d9e6] bg-cardWhite p-8 shadow-soft">
          <h1 className="text-2xl font-semibold tracking-tight text-textPrimary text-center">
            Admin Login
          </h1>
          <p className="mt-1 text-sm text-textSecondary text-center">
            Enter your credentials
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-textSecondary">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-xl border border-[#d1d9e6] bg-cardWhite px-4 py-2.5 text-sm text-textPrimary shadow-soft outline-none transition-all duration-300 focus:border-softBlue/50 focus:shadow-lg"
                placeholder="admin"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-textSecondary">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-[#d1d9e6] bg-cardWhite px-4 py-2.5 text-sm text-textPrimary shadow-soft outline-none transition-all duration-300 focus:border-softBlue/50 focus:shadow-lg"
                placeholder="••••••"
              />
            </div>

            {error && (
              <p className="text-sm font-medium text-red-500 text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-textPrimary px-6 py-2.5 text-sm font-medium text-white transition hover:bg-textPrimary/90 disabled:opacity-40"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(apiIsAuthenticated());
  const [activeTab, setActiveTab] = useState(0);

  if (!authenticated) {
    return <LoginForm onLogin={() => setAuthenticated(true)} />;
  }

  const handleLogout = () => {
    apiLogout();
    setAuthenticated(false);
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      <Navbar />

      <main className="pt-32 px-4 pb-20 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            className="mb-10 text-center"
          >
            <h1 className="text-4xl font-semibold tracking-tight text-textPrimary">
              Admin Panel
            </h1>
            <p className="mt-2 text-sm text-textSecondary">
              Manage your portfolio content
            </p>
            <button
              onClick={handleLogout}
              className="mt-4 rounded-full border border-red-200 bg-red-50 px-5 py-1.5 text-xs font-medium text-red-500 transition hover:bg-red-100"
            >
              Logout
            </button>
          </motion.div>

          <div className="mb-8 flex justify-center gap-2">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 ${
                  activeTab === i
                    ? "bg-textPrimary text-white shadow-md"
                    : "border border-[#d1d9e6] bg-cardWhite text-textSecondary shadow-soft hover:border-softBlue/40 hover:text-textPrimary"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {activeTab === 0 && <CvTab />}
            {activeTab === 1 && <ProjectsTab />}
            {activeTab === 2 && <CertificatesTab />}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
