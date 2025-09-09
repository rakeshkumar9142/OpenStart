import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Business");
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY;
  const BASE_URL = "https://content.guardianapis.com/search";

  const categories = [
    { name: "Business", query: "business", icon: "📈" },
    { name: "Tech", query: "technology", icon: "💻" },
    { name: "Startup", query: "startup", icon: "🚀" },
  ];

  const fetchNews = async (category) => {
    setLoading(true);
    setError(null);

    try {
      const query =
        categories.find((cat) => cat.name === category)?.query || "business";
      const response = await fetch(
        `${BASE_URL}?api-key=${API_KEY}&q=${query}&show-fields=thumbnail,headline,trailText&show-tags=contributor&page-size=12`
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Guardian API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();

      if (data.response && data.response.results) {
        const formattedNews = data.response.results.map((article) => ({
          id: article.id,
          title:
            article.webTitle ||
            article.headline?.main ||
            "No title available",
          description:
            article.trailText ||
            article.fields?.trailText ||
            "No description available",
          url: article.webUrl,
          thumbnail:
            article.fields?.thumbnail ||
            "https://placehold.co/400x300/374151/ffffff?text=News",
          source: "Guardian",
          date: new Date(article.webPublicationDate).toLocaleDateString(
            "en-US",
            {
              year: "numeric",
              month: "short",
              day: "numeric",
            }
          ),
          section: article.sectionName || "General",
        }));

        setNews(formattedNews);
      } else {
        setNews([]);
      }
    } catch (err) {
      console.error("Error fetching news:", err);
      setError("Failed to load news. Please try again later.");
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(selectedCategory);
  }, [selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const NewsCard = ({ article }) => (
    <div className="relative group bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02] border border-gray-700">
      <div className="relative">
        <img
          src={article.thumbnail}
          alt={article.title}
          className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity"
          onError={(e) => {
            e.target.src =
              "https://placehold.co/400x300/374151/ffffff?text=News";
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/70 to-transparent"></div>
        <span className="absolute top-3 left-3 px-2 py-1 text-xs font-medium bg-indigo-600 text-white rounded-full">
          {article.section}
        </span>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-3 text-sm text-gray-400">
          <span>{article.source}</span>
          <span>•</span>
          <span>{article.date}</span>
        </div>

        <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2">
          {article.title}
        </h3>

        <p className="text-gray-300 text-sm mb-4 line-clamp-3">
          {article.description}
        </p>

        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors"
        >
          Read More →
        </a>
      </div>
    </div>
  );

  // PropTypes
  NewsCard.propTypes = {
    article: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
      source: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      section: PropTypes.string.isRequired,
    }).isRequired,
  };

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="bg-gray-800 rounded-xl overflow-hidden animate-pulse shimmer"
        >
          <div className="h-48 bg-gray-700"></div>
          <div className="p-6">
            <div className="h-4 bg-gray-700 rounded mb-3"></div>
            <div className="h-6 bg-gray-700 rounded mb-3"></div>
            <div className="h-4 bg-gray-700 rounded mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header Section */}
      <div className="relative bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_left,_#6366f1,_transparent_70%)]"></div>
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_bottom_right,_#a855f7,_transparent_70%)]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-400 to-pink-400">
            Latest News
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Stay updated with the latest developments in business, technology,
            and startups from around the world.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => handleCategoryChange(category.name)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === category.name
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/50"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-700"
              }`}
            >
              <span>{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div className="text-center py-8">
            <div className="bg-red-900/20 border border-red-700 rounded-lg p-6 max-w-md mx-auto">
              <svg
                className="w-12 h-12 text-red-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              <p className="text-red-400 font-medium">{error}</p>
              <button
                onClick={() => fetchNews(selectedCategory)}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* News Grid */}
        {loading ? (
          <LoadingSkeleton />
        ) : news.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        ) : !error ? (
          <div className="text-center py-12">
            <div className="bg-gray-800 rounded-lg p-8 max-w-md mx-auto">
              <svg
                className="w-16 h-16 text-gray-600 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p className="text-gray-400 text-lg">
                No news found for this category.
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Try selecting a different category or check back later.
              </p>
            </div>
          </div>
        ) : null}

        {/* Refresh Button */}
        {news.length > 0 && !loading && (
          <div className="text-center mt-12">
            <button
              onClick={() => fetchNews(selectedCategory)}
              className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-full shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 transform hover:scale-105"
            >
              🔄 Refresh News
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
