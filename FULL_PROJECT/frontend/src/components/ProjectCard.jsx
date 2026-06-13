import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function DashboardVisual() {
  return (
    <div className="pointer-events-none absolute inset-x-6 top-5 h-[47%] overflow-hidden rounded-[22px]">
      <div className="absolute left-[3%] right-[14%] top-[10%] h-[78%] rounded-[20px] border border-white/10 bg-gradient-to-br from-zinc-800 to-zinc-950 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
        <div className="absolute inset-[10px] rounded-[14px] bg-gradient-to-br from-zinc-700/80 to-black">
          <div className="grid h-full grid-cols-[68px_1fr] gap-3 p-3">
            <div className="rounded-[10px] bg-black/35" />
            <div className="space-y-3">
              <div className="h-16 rounded-[10px] bg-white/10" />
              <div className="grid grid-cols-2 gap-3">
                <div className="h-20 rounded-[10px] bg-white/8" />
                <div className="h-20 rounded-[10px] bg-white/8" />
              </div>
              <div className="h-14 rounded-[10px] bg-white/8" />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[10%] left-[9%] h-[18px] w-[82%] rounded-full bg-white/12 blur-[3px]" />
    </div>
  );
}

function TextArrowVisual({ title }) {
  return (
    <div className="relative h-full">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_50%,rgba(255,255,255,0.08),transparent_18%)]" />

      <div className="pointer-events-none absolute left-6 top-6 h-[52%] w-[36%] rounded-[18px] border border-white/10 bg-gradient-to-br from-zinc-800 to-black shadow-[0_18px_40px_rgba(0,0,0,0.35)]">
        <div className="absolute inset-[8px] rounded-[12px] bg-gradient-to-br from-zinc-700/70 to-black/95">
          <div className="grid h-full grid-cols-[34px_1fr] gap-2 p-2">
            <div className="rounded-[8px] bg-black/35" />
            <div className="space-y-2">
              <div className="h-4 rounded bg-white/10" />
              <div className="space-y-1">
                <div className="h-2 rounded bg-white/10" />
                <div className="h-2 rounded bg-white/10" />
                <div className="h-2 rounded bg-white/10" />
                <div className="h-2 rounded bg-white/10" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute right-8 top-1/2 w-[46%] -translate-y-1/2">
        <pre className="whitespace-pre-wrap text-[23px] font-medium leading-[1.45] tracking-[0.01em] text-white">
          {title}
        </pre>
      </div>

      <div className="absolute bottom-6 right-7 text-[56px] leading-none text-white/90">
        ↗
      </div>
    </div>
  );
}

function DiamondVisual() {
  return (
    <div className="pointer-events-none absolute inset-x-5 top-5 h-[54%]">
      <div className="absolute bottom-0 left-1/2 h-16 w-28 -translate-x-1/2 rounded-[4px] bg-zinc-900 shadow-[0_16px_35px_rgba(0,0,0,0.4)]" />
      <div className="absolute bottom-10 left-1/2 h-28 w-36 -translate-x-1/2">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(220,220,220,0.55)_35%,rgba(255,255,255,0.95)_60%,rgba(180,180,180,0.4))] [clip-path:polygon(50%_0%,100%_32%,82%_55%,50%_100%,18%_55%,0%_32%)] shadow-[0_16px_40px_rgba(255,255,255,0.08)]" />
        <div className="absolute inset-[8%] bg-[linear-gradient(135deg,rgba(255,255,255,0.9),rgba(160,160,160,0.3),rgba(255,255,255,0.85))] [clip-path:polygon(50%_0%,100%_32%,82%_55%,50%_100%,18%_55%,0%_32%)] opacity-90" />
      </div>
      <div className="absolute bottom-6 left-1/2 h-6 w-40 -translate-x-1/2 rounded-full bg-white/10 blur-[8px]" />
    </div>
  );
}

function CameraVisual() {
  return (
    <div className="pointer-events-none absolute inset-x-5 top-7 h-[48%]">
      <div className="absolute bottom-0 left-1/2 h-24 w-[78%] -translate-x-1/2 rounded-[24px] bg-gradient-to-br from-zinc-900 to-black shadow-[0_24px_50px_rgba(0,0,0,0.45)]" />
      <div className="absolute bottom-5 left-[19%] h-20 w-[44%] rounded-[18px] bg-gradient-to-br from-zinc-800 to-black" />
      <div className="absolute bottom-7 right-[16%] h-24 w-24 rounded-full border border-white/10 bg-[radial-gradient(circle_at_35%_35%,rgba(255,255,255,0.25),rgba(0,0,0,0.2)_28%,#070707_60%)] shadow-[0_10px_26px_rgba(0,0,0,0.45)]" />
      <div className="absolute bottom-[62px] left-[24%] h-4 w-6 rounded-[4px] bg-zinc-700" />
      <div className="absolute bottom-[86px] left-[22%] h-5 w-10 rounded-[6px] bg-zinc-950" />
      <div className="absolute bottom-4 left-1/2 h-5 w-44 -translate-x-1/2 rounded-full bg-white/10 blur-[8px]" />
    </div>
  );
}

function PhoneVisual() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div className="relative h-[78%] w-[44%] rounded-[28px] border border-white/10 bg-gradient-to-b from-zinc-800 to-black shadow-[0_24px_44px_rgba(0,0,0,0.45)]">
        <div className="absolute left-1/2 top-3 h-1.5 w-14 -translate-x-1/2 rounded-full bg-white/15" />
        <div className="absolute inset-[10px] rounded-[22px] bg-gradient-to-b from-zinc-700/75 to-black/95 p-3">
          <div className="space-y-2">
            <div className="h-6 w-24 rounded bg-white/10" />
            <div className="space-y-2">
              <div className="h-10 rounded-xl bg-white/10" />
              <div className="h-10 rounded-xl bg-white/10" />
              <div className="h-10 rounded-xl bg-white/10" />
              <div className="h-10 rounded-xl bg-white/10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SmallLaptopVisual() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div className="relative w-[66%]">
        <div className="rounded-[16px] border border-white/10 bg-gradient-to-br from-zinc-800 to-black p-2 shadow-[0_18px_40px_rgba(0,0,0,0.4)]">
          <div className="h-24 rounded-[12px] bg-gradient-to-br from-zinc-700/80 to-black/95 p-2">
            <div className="grid h-full grid-cols-2 gap-2">
              <div className="rounded bg-white/10" />
              <div className="rounded bg-white/10" />
              <div className="col-span-2 rounded bg-white/10" />
            </div>
          </div>
        </div>
        <div className="mx-auto h-2 w-[85%] rounded-b-2xl bg-zinc-700/80" />
      </div>
    </div>
  );
}

export default function ProjectCard({ project, className = "" }) {
  const base =
    "group relative overflow-hidden rounded-[20px] border border-white/10 bg-[#0d0d0f]";
  const shadow =
    "shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_16px_40px_rgba(0,0,0,0.35)]";
  const hover =
    "transition duration-300 hover:-translate-y-1 hover:border-white/15";
  const grain =
    "before:pointer-events-none before:absolute before:inset-0 before:content-[''] before:bg-[radial-gradient(rgba(255,255,255,0.06)_0.6px,transparent_0.6px)] before:bg-[length:4px_4px] before:opacity-[0.06]";

  const renderVisual = () => {
    switch (project.variant) {
      case "dashboard":
        return <DashboardVisual />;
      case "textArrow":
        return <TextArrowVisual title={project.title} />;
      case "diamond":
        return <DiamondVisual />;
      case "camera":
        return <CameraVisual />;
      case "phone":
        return <PhoneVisual />;
      case "smallLaptop":
        return <SmallLaptopVisual />;
      default:
        return null;
    }
  };

  if (project.variant === "contact") {
    return (
      <motion.article
        whileHover={{ y: -4 }}
        className={`${base} ${shadow} ${hover} ${grain} ${className} flex items-center px-7`}
      >
        <h3 className="text-[18px] font-medium tracking-[0.08em] text-white">
          {project.title}
        </h3>
      </motion.article>
    );
  }

  if (project.variant === "empty") {
    return (
      <motion.article
        whileHover={{ y: -2 }}
        className={`${base} ${shadow} ${hover} ${grain} ${className}`}
      />
    );
  }

  if (project.variant === "textArrow") {
    return (
      <motion.article
        whileHover={{ y: -4 }}
        className={`${base} ${shadow} ${hover} ${grain} ${className}`}
      >
        <TextArrowVisual title={project.title} />
      </motion.article>
    );
  }

  if (project.variant === "phone" || project.variant === "smallLaptop") {
    return (
      <motion.article
        whileHover={{ y: -4 }}
        className={`${base} ${shadow} ${hover} ${grain} ${className}`}
      >
        {renderVisual()}
      </motion.article>
    );
  }

  return (
    <motion.article
      whileHover={{ y: -4 }}
      className={`${base} ${shadow} ${hover} ${grain} ${className}`}
    >
      {renderVisual()}

      <div className="absolute inset-x-0 bottom-0 p-8">
        <h3 className="text-[21px] font-medium leading-tight text-white">
          {project.title}
        </h3>

        <p className="mt-3 max-w-[92%] text-[15px] leading-7 text-white/55">
          {project.description}
        </p>

        {project.button ? (
          project.slug ? (
            <Link
              to={`/projects/${project.slug}`}
              className="mt-6 inline-block rounded-[12px] border border-white/12 bg-white/[0.03] px-6 py-3 text-[15px] text-white/90 transition hover:bg-white/[0.06]"
            >
              {project.button}
            </Link>
          ) : (
            <button className="mt-6 rounded-[12px] border border-white/12 bg-white/[0.03] px-6 py-3 text-[15px] text-white/90 transition hover:bg-white/[0.06]">
              {project.button}
            </button>
          )
        ) : null}
      </div>
    </motion.article>
  );
}
