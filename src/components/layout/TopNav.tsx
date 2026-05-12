import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[1680px] items-center justify-between px-4">
        <Link to="/" className="shrink-0 font-semibold text-slate-900" onClick={() => setIsOpen(false)}>
          {branding.logoText}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex min-w-0 items-center gap-2">
          {routes.map((route) => (
            <NavLink
              key={route.to}
              to={route.to}
              className={({ isActive }) =>
                cn(
                  "whitespace-nowrap rounded-md px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100 transition-colors",
                  isActive && "bg-slate-100 text-slate-900 font-medium",
                )
              }
            >
              {route.label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden flex items-center p-2 text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-14 left-0 w-full bg-white border-b border-slate-200 shadow-lg py-2 px-4 flex flex-col gap-1">
          {routes.map((route) => (
            <NavLink
              key={route.to}
              to={route.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                cn(
                  "block w-full rounded-md px-4 py-3 text-base text-slate-600 hover:bg-slate-50 transition-colors",
                  isActive && "bg-slate-50 text-slate-900 font-medium",
                )
              }
            >
              {route.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}

