import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, User, Tag, Calendar } from "lucide-react";
import { BLOG_POSTS } from "@/data/blog-posts";

export default function BlogPage() {
  const featuredPost = BLOG_POSTS.find(post => post.isFeatured);
  const recentPosts = BLOG_POSTS.filter(post => !post.isFeatured).slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4 py-12">
        {/* Featured Post */}
        <div className="mb-16">
          <h1 className="text-4xl font-bold mb-12 text-center">
            Homeosetu Blog
          </h1>
          
          {featuredPost && (
            <Link href={`/blog/${featuredPost.slug}`}>
              <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative h-[300px] md:h-full">
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
                      Featured
                    </div>
                  </div>
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {featuredPost.author.name}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {featuredPost.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {featuredPost.readTime}
                      </div>
                      <div className="flex items-center">
                        <Tag className="h-4 w-4 mr-1" />
                        {featuredPost.category}
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold mb-4">{featuredPost.title}</h2>
                    <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>
                    <Button>Read More</Button>
                  </CardContent>
                </div>
              </Card>
            </Link>
          )}
        </div>

        {/* Recent Posts */}
        <div>
          <h2 className="text-2xl font-bold mb-8">Recent Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <Card className="overflow-hidden hover:shadow-xl transition-shadow h-full">
                  <div className="relative h-48">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {post.author.name}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                    <Button variant="outline">Read More</Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-16 bg-purple-100 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-gray-600 mb-6">Stay updated with the latest in homeopathy</p>
          <div className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </div>
    </div>
  );
} 