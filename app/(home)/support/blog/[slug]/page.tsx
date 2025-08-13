import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, User, Tag, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BLOG_POSTS } from "@/data/blog-posts";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = BLOG_POSTS.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  // Find related posts (same category, excluding current post)
  const relatedPosts = BLOG_POSTS
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4 py-12">
        {/* Article Header */}
        <div className="max-w-4xl mx-auto mb-12">
          <Link href="/blog" className="text-purple-600 hover:text-purple-700 mb-6 inline-block">
            ← Back to Blog
          </Link>
          <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-8">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              {post.author.name}
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {post.date}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {post.readTime}
            </div>
            <div className="flex items-center">
              <Tag className="h-4 w-4 mr-1" />
              {post.category}
            </div>
          </div>
          <div className="relative h-[400px] rounded-2xl overflow-hidden mb-8">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Article Content */}
        <article className="prose prose-lg max-w-4xl mx-auto mb-16">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>

        {/* Tags */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="flex gap-2 flex-wrap">
            {post.tags?.map((tag) => (
              <span
                key={tag}
                className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Author Bio */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative h-16 w-16 rounded-full overflow-hidden">
                <Image
                  src={post.author.avatar || ""}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg">{post.author.name}</h3>
              </div>
            </div>
            <p className="text-gray-600">{post.author.bio}</p>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow">
                    <div className="relative h-48">
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold mb-2">{relatedPost.title}</h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 