import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const links = [
    { to: "/home", label: "All posts" },
    { to: "/home#category-finder", label: "Categories" },
    { to: "/account", label: "Account" },
  ];
  const linkClass = ({ isActive }) =>
    `text-sm font-semibold transition-colors hover:text-emerald-800 ${isActive ? "text-emerald-900" : "text-slate-600"}`;

  function signOut() {
    localStorage.removeItem("token");
    navigate("/login");
    setShowMenu(false);
  }

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          to="/home"
          className="font-serif text-xl font-bold text-[#17483e]"
        >
          Blogify<span className="text-amber-600">.</span>
        </Link>
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-7 sm:flex"
        >
          {links.map((link) => (
            <NavLink key={link.label} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
          <a
            href="#About"
            className="text-sm font-semibold text-slate-600 transition-colors hover:text-emerald-800"
          >
            About
          </a>
          <button
            onClick={signOut}
            className="text-sm font-semibold text-slate-500 hover:text-red-700"
          >
            Sign out
          </button>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            to="/createpost"
            className="hidden rounded-sm bg-[#17483e] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-800 sm:inline-flex"
          >
            Write a post
          </Link>
          <button
            type="button"
            aria-label={
              showMenu ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={showMenu}
            onClick={() => setShowMenu((open) => !open)}
            className="grid h-10 w-10 place-items-center rounded-sm border border-slate-300 text-sm font-semibold text-slate-700 sm:hidden"
          >
            {showMenu ? "Close" : "Menu"}
          </button>
        </div>
      </div>
      {showMenu && (
        <nav
          aria-label="Mobile navigation"
          className="grid gap-4 border-t border-slate-200 bg-white px-5 py-4 sm:hidden"
        >
          {links.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className={linkClass}
              onClick={() => setShowMenu(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <a
            href="#About"
            onClick={() => setShowMenu(false)}
            className="text-sm font-semibold text-slate-600"
          >
            About
          </a>
          <Link
            to="/createpost"
            onClick={() => setShowMenu(false)}
            className="rounded-sm bg-[#17483e] px-4 py-2 text-center text-sm font-semibold text-white"
          >
            Write a post
          </Link>
          <button
            onClick={signOut}
            className="text-left text-sm font-semibold text-red-700"
          >
            Sign out
          </button>
        </nav>
      )}
    </header>
  );
};

export default Header;
