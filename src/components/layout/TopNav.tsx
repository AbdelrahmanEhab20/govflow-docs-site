import { Link, NavLink } from "react-router-dom";
import { branding } from "@/lib/branding";
import { cn } from "@/lib/utils";

const routes = [
  { to: "/platform", label: "Platform" },
  { to: "/architecture", label: "Architecture" },
  { to: "/pricing", label: "Pricing" },
  { to: "/deployment", label: "Deployment" },
  { to: "/docs", label: "Docs" },
  { to: "/rfp", label: "RFP" },
];

export function TopNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[1680px] items-center justify-between gap-3 px-4">
        <Link to="/" className="shrink-0 font-semibold text-slate-900">
          {branding.logoText}
        </Link>
        <nav className="flex min-w-0 items-center gap-1 overflow-x-auto pb-1 md:gap-2">
          {routes.map((route) => (
            <NavLink
              key={route.to}
              to={route.to}
              className={({ isActive }) =>
                cn(
                  "whitespace-nowrap rounded-md px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100",
                  isActive && "bg-slate-100 text-slate-900",
                )
              }
            >
              {route.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

