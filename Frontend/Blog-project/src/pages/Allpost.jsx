import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Center from "../components/Center";
import { API_URL } from "../service/api";
import {
  CategoryFinder,
  EmptyFeed,
  FeedHeader,
  LoadingStories,
  PageNavigation,
  PostListItem,
  RecentPostList,
} from "../components/PostFeed";

const PAGE_SIZE = 5;

function getAuthHeaders() {
  return {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
}
const Allpost = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("recent");
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [categoryQuery, setCategoryQuery] = useState("");
  const [showCategoryResults, setShowCategoryResults] = useState(false);

  useEffect(() => {
    let ignoreRequest = false;
    const requestConfig = { headers: getAuthHeaders() };

    axios
      .get(
        `${API_URL}/api/posts?page=${currentPage}&limit=${PAGE_SIZE}&sort=${sortOrder}`,
        requestConfig,
      )
      .then(({ data }) => {
        if (ignoreRequest) return;
        setPosts(data.data || []);
        setTotalPages(Number(data.totalpage) || 0);
        setError("");
      })
      .catch((requestError) => {
        if (ignoreRequest) return;
        setError(
          requestError.response?.data?.message ||
            "Posts could not be loaded. Check your connection and try again.",
        );
      })
      .finally(() => {
        if (!ignoreRequest) setLoading(false);
      });

    return () => {
      ignoreRequest = true;
    };
  }, [currentPage, sortOrder]);

  useEffect(() => {
    let ignoreRequest = false;
    const requestConfig = { headers: getAuthHeaders() };

    axios
      .get(`${API_URL}/api/posts?page=1&limit=3&sort=recent`, requestConfig)
      .then(({ data }) => {
        if (!ignoreRequest) setRecentPosts(data.data || []);
      })
      .catch(() => {
        if (!ignoreRequest) setRecentPosts([]);
      });

    axios
      .get(`${API_URL}/api/category`, requestConfig)
      .then(({ data }) => {
        if (!ignoreRequest) setCategories(data || []);
      })
      .catch(() => {
        if (!ignoreRequest) setCategories([]);
      });

    return () => {
      ignoreRequest = true;
    };
  }, []);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(categoryQuery.trim().toLowerCase()),
  );

  function handlePageChange(nextPage) {
    setLoading(true);
    setCurrentPage(nextPage);
    document
      .getElementById("post-feed")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  function handleSortChange(nextSortOrder) {
    setLoading(true);
    setCurrentPage(1);
    setSortOrder(nextSortOrder);
  }

  function handleCategorySelect(category) {
    navigate(`/category/${category._id}/${encodeURIComponent(category.name)}`);
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f7f8f4]">
      <Header />
      <Center />
      <div
        role="main"
        id="post-feed"
        className="mx-auto grid w-full max-w-6xl flex-1 gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-12"
      >
        <div role="region" aria-labelledby="feed-heading" className="min-w-0">
          <FeedHeader sortOrder={sortOrder} onSortChange={handleSortChange} />

          {error && (
            <div
              role="alert"
              className="border-l-4 border-red-700 bg-red-50 px-4 py-3 text-sm text-red-800"
            >
              {error}
            </div>
          )}

          {loading ? (
            <LoadingStories />
          ) : posts.length ? (
            <ul className="divide-y divide-slate-200">
              {posts.map((post) => (
                <PostListItem key={post._id} post={post} />
              ))}
            </ul>
          ) : !error ? (
            <EmptyFeed />
          ) : null}
          <PageNavigation
            currentPage={currentPage}
            totalPages={totalPages}
            onChangePage={handlePageChange}
          />
        </div>

        <div
          role="complementary"
          className="grid content-start gap-8 border-t border-slate-200 pt-6 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0"
        >
          <RecentPostList posts={recentPosts} />
          <CategoryFinder
            categories={filteredCategories}
            query={categoryQuery}
            showResults={showCategoryResults}
            onQueryChange={setCategoryQuery}
            onShowResults={() => setShowCategoryResults(true)}
            onSelectCategory={handleCategorySelect}
          />
        </div>
      </div>
      <Footer category={categories} />
    </div>
  );
};
export default Allpost;
