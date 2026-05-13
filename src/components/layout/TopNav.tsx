import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, BookOpen } from "lucide-react";
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
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-[1680px] items-center justify-between px-4">
        <Link
          to="/"
          className="shrink-0 flex items-center gap-2.5 hover:opacity-80 transition"
          onClick={() => setIsOpen(false)}
        >
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold">
            <BookOpen className="h-5 w-5" />
          </div>
          <span className="font-bold text-slate-900 tracking-tight hidden sm:block">{branding.logoText}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {routes.map((route) => (
            <NavLink
              key={route.to}
              to={route.to}
              className={({ isActive }) =>
                cn(
                  "whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-blue-100 text-blue-900"
                    : "text-slate-600 hover:bg-slate-100",
                )
              }
            >
              {route.label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden flex items-center p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors shrink-0"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-slate-200 shadow-lg py-2 px-2 flex flex-col gap-1">
          {routes.map((route) => (
            <NavLink
              key={route.to}
              to={route.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                cn(
                  "block w-full rounded-lg px-4 py-3 text-base font-medium transition-colors",
                  isActive
                    ? "bg-blue-100 text-blue-900"
                    : "text-slate-600 hover:bg-slate-50",
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

