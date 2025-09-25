import { NavLink } from "react-router";

export function Navbar() {
  return (
    <nav className="ml-5 space-x-4">
      <NavLink to="/"
        className={({ isActive }) =>
          isActive ? "text-green-500" : "text-black"
        } end>

        Home
      </NavLink>

      <NavLink to="/blog" className={({ isActive }) =>
        isActive ? "text-green-500" : "text-black"
      } end>
        Blog
      </NavLink>
    </nav>
  );
}
