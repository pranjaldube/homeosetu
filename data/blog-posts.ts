import { BlogPost } from "@/types/blog";

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "future-of-homeopathy-in-modern-healthcare",
    title: "The Future of Homeopathy in Modern Healthcare",
    excerpt: "Exploring how technology and traditional homeopathic practices are merging to create more effective treatment methods...",
    content: `
      <article class="prose lg:prose-xl">
        <p>The integration of technology with traditional homeopathic practices is revolutionizing the way practitioners diagnose, treat, and monitor patient progress. This transformation is not just about digitizing existing processes; it's about enhancing the core principles of homeopathy with modern tools and insights.</p>

        <h2>The Digital Revolution in Homeopathy</h2>
        <p>Modern software solutions are making it easier than ever for homeopaths to maintain detailed patient records, track treatment outcomes, and access vast libraries of remedies and their applications. These tools are not replacing the careful observation and individualized treatment that homeopathy is known for – they're enhancing it.</p>

        <h2>AI-Assisted Remedy Selection</h2>
        <p>Artificial Intelligence is beginning to play a role in helping practitioners analyze symptoms and suggest potential remedies. While the final decision always rests with the experienced homeopath, these tools can help process vast amounts of information and identify patterns that might otherwise be missed.</p>

        <h2>Telemedicine and Remote Consultations</h2>
        <p>The recent global shift towards telemedicine has shown that many homeopathic consultations can be effectively conducted remotely. This is making homeopathic treatment more accessible to people in remote areas or those with mobility limitations.</p>

        <h2>Looking Ahead</h2>
        <p>As we look to the future, the integration of technology in homeopathy will continue to evolve. The key will be maintaining the fundamental principles of homeopathy while embracing innovations that can enhance patient care and treatment outcomes.</p>
      </article>
    `,
    image: "/images/blog/featured.jpg",
    author: {
      name: "Dr. Smith",
      avatar: "/images/authors/dr-smith.jpg",
      bio: "Dr. Smith is a renowned homeopathic practitioner with over 20 years of experience in integrating modern technology with traditional homeopathic practices."
    },
    date: "March 15, 2024",
    category: "Research",
    readTime: "8 min read",
    isFeatured: true,
    tags: ["Technology", "Future", "Healthcare", "Innovation"]
  },
  {
    id: "2",
    slug: "understanding-homeopathic-dilutions",
    title: "Understanding Homeopathic Dilutions",
    excerpt: "A comprehensive guide to understanding the principles behind homeopathic dilutions...",
    content: `
      <article class="prose lg:prose-xl">
        <p>Homeopathic dilutions are at the heart of homeopathic medicine, yet they remain one of the most misunderstood aspects of this healing system. This article aims to clarify the principles and science behind the dilution process.</p>

        <h2>The Basic Principles</h2>
        <p>Homeopathic dilutions follow a specific process of successive dilution and succussion (vigorous shaking). This process, known as potentization, is believed to enhance the healing properties of the substance while removing its toxic effects.</p>

        <h2>Understanding Potencies</h2>
        <p>Different potencies serve different purposes in homeopathic treatment. Lower potencies (6C, 12C) are often used for acute physical conditions, while higher potencies (30C, 200C) are typically prescribed for chronic or emotional conditions.</p>

        <h2>The Science Behind It</h2>
        <p>Recent research in the field of nano-medicine has begun to shed light on how ultra-dilute solutions might carry biological activity. Studies have shown that even at high dilutions, unique properties of the original substance can be detected.</p>
      </article>
    `,
    image: "/images/blog/post1.jpg",
    author: {
      name: "Dr. Johnson",
      avatar: "/images/authors/dr-johnson.jpg",
      bio: "Dr. Johnson specializes in research on homeopathic dilutions and their mechanisms of action."
    },
    date: "March 10, 2024",
    category: "Education",
    readTime: "5 min read",
    tags: ["Dilutions", "Research", "Education"]
  }
  // Add more blog posts as needed
]; 