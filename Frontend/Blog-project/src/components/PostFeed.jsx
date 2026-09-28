import { Link } from "react-router-dom";

export function FeedHeader({ sortOrder, onSortChange }) {
  return (
    <div className="mb-5 flex flex-col gap-4 border-b border-slate-300 pb-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-emerald-800">
          The journal
        </p>
        <h2
          id="feed-heading"
          className="mt-1 font-serif text-3xl font-bold text-slate-900"
        >
          Latest stories
        </h2>
      </div>
      <label className="grid gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
        Sort by
        <select
          className="min-w-48 rounded-sm border border-slate-300 bg-white px-3 py-2 text-sm font-medium normal-case tracking-normal text-slate-800 focus:border-emerald-700 focus:outline-none"
          value={sortOrder}
          onChange={(event) => onSortChange(event.target.value)}
        >
          <option value="recent">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
      </label>
    </div>
  );
}

export function LoadingStories() {
  return (
    <div role="status" aria-label="Loading stories" className="grid gap-4 py-2">
      {[0, 1, 2].map((storyNumber) => (
        <div
          key={storyNumber}
          className="animate-pulse border-b border-slate-200 py-5"
        >
          <div className="h-3 w-28 rounded bg-slate-200" />
          <div className="mt-3 h-6 w-3/4 rounded bg-slate-200" />
          <div className="mt-3 h-4 w-full rounded bg-slate-100" />
          <div className="mt-2 h-4 w-2/3 rounded bg-slate-100" />
        </div>
      ))}
    </div>
  );
}

export function PostListItem({ post }) {
  return (
    <li className="grid gap-4 py-5 sm:grid-cols-[minmax(0,1fr)_180px] sm:items-center">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
          <span className="font-semibold text-emerald-900">
            {post.category?.name || "Uncategorized"}
          </span>
          <span>By {post.author?.name || "Unknown author"}</span>
          <p>{new Date(post.createdAt).toLocaleDateString()}</p>
        </div>
        <Link
          to={`/home/${post._id}`}
          className="mt-2 block font-serif text-xl font-bold leading-snug text-slate-900 hover:text-emerald-800 sm:text-2xl"
        >
          {post.title}
        </Link>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
          {post.description}
        </p>
        <Link
          to={`/home/${post._id}`}
          className="mt-3 inline-flex text-sm font-semibold text-emerald-800 hover:underline"
        >
          Read story
          <span aria-hidden="true" className="ml-1">
            →
          </span>
        </Link>
      </div>
      {post.image && (
        <Link
          to={`/home/${post._id}`}
          className="order-first block aspect-16/10 overflow-hidden bg-slate-200 sm:order-last sm:aspect-4/3"
        >
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            className="h-full w-full object-fill transition-transform duration-300 hover:scale-[1.03]"
          />
        </Link>
      )}
    </li>
  );
}

export function EmptyFeed() {
  return (
    <div className="border-y border-slate-200 py-12 text-center">
      <p className="font-serif text-2xl font-semibold text-slate-800">
        A blank page, for now.
      </p>
      <p className="mt-2 text-sm text-slate-600">
        Be the first to add a story to the journal.
      </p>
      <Link
        to="/createpost"
        className="mt-5 inline-flex rounded-sm bg-[#17483e] px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800"
      >
        Write the first post
      </Link>
    </div>
  );
}

export function RecentPostList({ posts }) {
  return (
    <div role="region" aria-labelledby="recent-heading">
      <div className="mb-4 flex items-baseline justify-between border-b border-slate-300 pb-3">
        <h2
          id="recent-heading"
          className="font-serif text-xl font-bold text-slate-900"
        >
          Fresh off the page
        </h2>
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
          Recent
        </span>
      </div>
      {posts.length ? (
        <ul className="grid gap-4">
          {posts.map((post, position) => (
            <li
              key={post._id}
              className="grid grid-cols-[32px_minmax(0,1fr)] gap-3"
            >
              <span className="font-serif text-2xl font-bold text-amber-600">
                0{position + 1}
              </span>
              <div className="min-w-0">
                {post.image && (
                  <Link
                    to={`/home/${post._id}`}
                    className="mb-2 block aspect-16/8 overflow-hidden bg-slate-200"
                  >
                    <img
                      src={post.image}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-fill"
                    />
                  </Link>
                )}
                <Link
                  to={`/home/${post._id}`}
                  className="font-serif font-semibold leading-snug text-slate-900 hover:text-emerald-800"
                >
                  {post.title}
                </Link>
                <p className="mt-1 text-xs text-slate-500">
                  {post.author?.name || "Unknown author"}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm leading-6 text-slate-600">
          New posts will appear here as they are published.
        </p>
      )}
    </div>
  );
}

export function CategoryFinder({
  categories,
  query,
  showResults,
  onQueryChange,
  onShowResults,
  onSelectCategory,
}) {
  return (
    <div
      role="region"
      id="category-finder"
      aria-labelledby="category-heading"
      className="border-t border-slate-200 pt-5"
    >
      <h2
        id="category-heading"
        className="font-serif text-xl font-bold text-slate-900"
      >
        Find a topic
      </h2>
      <label htmlFor="category-search" className="sr-only">
        Search categories
      </label>
      <div className="mt-3 flex gap-2">
        <input
          id="category-search"
          value={query}
          onChange={(event) => {
            onQueryChange(event.target.value);
            onShowResults();
          }}
          onFocus={onShowResults}
          placeholder="Search topics"
          className="min-w-0 flex-1 rounded-sm border border-slate-300 bg-white px-3 py-2 text-sm focus:border-emerald-700 focus:outline-none"
        />
        <button
          onClick={onShowResults}
          className="rounded-sm bg-amber-500 px-3 py-2 text-sm font-bold text-slate-950 hover:bg-amber-400"
        >
          Find
        </button>
      </div>
      {showResults && (
        <ul className="mt-3 grid gap-1">
          {categories.length ? (
            categories.slice(0, 6).map((category) => (
              <li key={category._id}>
                <button
                  onClick={() => onSelectCategory(category)}
                  className="flex w-full items-center justify-between border-b border-slate-100 py-2 text-left text-sm text-slate-700 hover:text-emerald-800"
                >
                  {category.name}
                  <span aria-hidden="true">→</span>
                </button>
              </li>
            ))
          ) : (
            <li className="py-2 text-sm text-slate-500">No matching topics.</li>
          )}
        </ul>
      )}
    </div>
  );
}

export function PageNavigation({ currentPage, totalPages, onChangePage }) {
  if (totalPages <= 1) return null;

  return (
    <div
      role="navigation"
      aria-label="Post pages"
      className="flex flex-wrap items-center justify-center gap-2 py-7"
    >
      <button
        disabled={currentPage <= 1}
        onClick={() => onChangePage(currentPage - 1)}
        className="rounded-sm border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Previous
      </button>
      <span className="px-2 text-sm text-slate-600">
        Page {currentPage} of {totalPages}
      </span>
      <button
        disabled={currentPage >= totalPages}
        onClick={() => onChangePage(currentPage + 1)}
        className="rounded-sm border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}
