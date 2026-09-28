import { Link } from "react-router-dom";
import blogimage from "../assets/blog.png";

const Footer = ({ category = [] }) => (
  <footer id="About" className="mt-auto border-t border-slate-200 bg-white">
    <div className="mx-auto grid max-w-6xl gap-8 px-5 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.5fr_1fr_1fr]">
      <div>
        <Link to="/home" className="inline-flex items-center gap-2">
          <img className="h-9 w-9 object-contain" src={blogimage} alt="" />
          <span className="font-serif text-xl font-bold text-[#17483e]">
            Blogify
          </span>
        </Link>
        <p className="mt-3 max-w-sm text-sm leading-6 text-slate-600">
          A place to share ideas, stories, and knowledge with the world.
        </p>
      </div>
      <nav aria-label="Footer navigation">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-800">
          Explore
        </h2>
        <ul className="mt-3 grid gap-2 text-sm text-slate-600">
          <li>
            <Link className="hover:text-emerald-800" to="/home">
              All posts
            </Link>
          </li>
          <li>
            <Link className="hover:text-emerald-800" to="/home#category-finder">
              Categories
            </Link>
          </li>
          <li>
            <Link className="hover:text-emerald-800" to="/account">
              Your account
            </Link>
          </li>
          <li>
            <a className="hover:text-emerald-800" href="#About">
              About Blogify
            </a>
          </li>
        </ul>
      </nav>
      <div>
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-800">
          Topics
        </h2>
        {category.length ? (
          <ul className="mt-3 grid gap-2 text-sm text-slate-600">
            {category.slice(0, 5).map((item) => (
              <li key={item._id}>
                <Link
                  className="hover:text-emerald-800"
                  to={`/category/${item._id}/${encodeURIComponent(item.name)}`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-slate-600">
            Browse categories from the post feed.
          </p>
        )}
      </div>
    </div>
    <div className="border-t border-slate-100 px-5 py-3 text-center text-xs text-slate-500">
      © {new Date().getFullYear()} Blogify
    </div>
  </footer>
);

export default Footer;
