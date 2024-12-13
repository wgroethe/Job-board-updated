import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Clock, Tag } from 'lucide-react';
import { blogPosts } from '../data/blog';

export function BlogPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Aesthetic Nursing Insights
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Expert advice, industry trends, and career development resources for aesthetic nurses
        </p>
      </div>

      {/* Featured Post */}
      {blogPosts[0] && (
        <Link
          to={`/blog/${blogPosts[0].slug}`}
          className="block mb-12 group"
        >
          <div className="relative rounded-xl overflow-hidden">
            <img
              src={blogPosts[0].coverImage}
              alt={blogPosts[0].title}
              className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <span className="inline-block px-4 py-1 rounded-full bg-rose-500 text-white text-sm mb-4">
                {blogPosts[0].category}
              </span>
              <h2 className="text-3xl font-bold text-white mb-4">
                {blogPosts[0].title}
              </h2>
              <p className="text-gray-200 mb-4 line-clamp-2">
                {blogPosts[0].excerpt}
              </p>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <img
                    src={blogPosts[0].author.avatar}
                    alt={blogPosts[0].author.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="text-white font-medium">
                      {blogPosts[0].author.name}
                    </p>
                    <p className="text-gray-300 text-sm">
                      {blogPosts[0].author.role}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-gray-300">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {blogPosts[0].readTime}
                  </span>
                  <span>
                    {formatDistanceToNow(new Date(blogPosts[0].publishedAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* Article Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.slice(1).map((post) => (
          <Link
            key={post.id}
            to={`/blog/${post.slug}`}
            className="group"
          >
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-rose-500 text-white text-sm">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-rose-500 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="text-sm">
                      <p className="font-medium text-gray-900">
                        {post.author.name}
                      </p>
                      <p className="text-gray-500">
                        {formatDistanceToNow(new Date(post.publishedAt), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}