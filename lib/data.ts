export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: "Web Development" | "Logo & Branding" | "E-Commerce" | "Brand Kits";
  client: string;
  timeline: string;
  tech: string[];
  description: string;
  problem: string;
  solution: string;
  metrics: { label: string; value: string }[];
  thumbnail: string;
  gallery: string[];
  beforeImage?: string;
  afterImage?: string;
  websiteUrl?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  stars: number;
  comment: string;
  avatar: string;
}

export interface ServiceBreakdown {
  title: string;
  description: string;
  features: string[];
  iconName: string;
}

// 8 Web + 6 Branding = 14 rich projects
export const projects: Project[] = [
  {
    id: "web-1",
    slug: "luxe-realty-website",
    title: "Luxe Realty Website",
    subtitle: "A high-end, immersive real estate portal for elite properties.",
    category: "Web Development",
    client: "Luxe Realty Group",
    timeline: "3 Months (2025)",
    tech: ["Next.js 14", "Framer Motion", "Tailwind CSS", "Mapbox GL", "Node.js"],
    description: "Luxe Realty needed an ultra-premium web presence to showcase multimillion-dollar estates. We designed an interactive, video-rich search platform that delivers property tours like a high-fashion editorial, complete with interactive 3D map views and ultra-fast listing filters.",
    problem: "Luxe Realty's previous website felt sluggish, looked generic, and failed to capture the luxury essence of their listings. Property filters were slow, and their high-quality video walkthroughs suffered from bad compression and high latency.",
    solution: "We engineered a Next.js-powered application utilizing aggressive edge caching, optimized WebP/WebM streaming media, and built custom Mapbox map integrations. The interface relies on subtle glassmorphism layouts and staggered animated loading cycles that emphasize premium quality.",
    metrics: [
      { label: "Increase in Lead Inquiries", value: "+142%" },
      { label: "Page Speed Score Improvement", value: "98/100" },
      { label: "Average Time on Site", value: "6.4 Min" }
    ],
    thumbnail: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80"
    ],
    beforeImage: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
    afterImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "web-2",
    slug: "fitpulse-gym-app",
    title: "FitPulse Gym App",
    subtitle: "A progressive web application for gym scheduling and training programs.",
    category: "Web Development",
    client: "FitPulse Fitness LLC",
    timeline: "4 Months (2025)",
    tech: ["React", "Next.js", "PWA", "Tailwind CSS", "Supabase", "Chart.js"],
    description: "FitPulse is a high-energy brand offering personalized workouts and nutrition scheduling. We developed an incredibly fluid, mobile-first PWA that lets members book classes, log workouts, track calorie metrics, and communicate directly with certified trainers.",
    problem: "FitPulse relied on outdated third-party portals that had terrible mobile responsiveness. Members frequently complained about losing connection mid-session or being unable to navigate their weekly programs on the gym floor.",
    solution: "We launched a custom progressive web app featuring extensive offline support, custom interactive graphs to visualize fitness growth, and clean modern interfaces loaded with micro-interactions. Workouts cache locally and sync immediately upon network reconnection.",
    metrics: [
      { label: "Class Booking Rate", value: "+88%" },
      { label: "Mobile Engagement", value: "4.8x" },
      { label: "App Load Time reduction", value: "-65%" }
    ],
    thumbnail: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80"
    ],
    beforeImage: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80",
    afterImage: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "web-3",
    slug: "greencart-ecommerce",
    title: "GreenCart E-Commerce",
    subtitle: "An eco-friendly digital supermarket focusing on green lifestyles.",
    category: "E-Commerce",
    client: "GreenCart Organic Co.",
    timeline: "5 Months (2026)",
    tech: ["Next.js 14", "Stripe API", "GraphQL", "Tailwind CSS", "Prisma", "PostgreSQL"],
    description: "GreenCart connects eco-conscious farmers directly with metropolitan buyers. We developed a robust, secure, and fast shopping experience featuring complex subscriptions, intelligent search, dynamic carbon-footprint offsets at checkout, and customized organic curation.",
    problem: "GreenCart struggled to manage inventory from hundreds of small suppliers. Their old WooCommerce shop could not handle bulk order volume or support multi-tier recurring box subscriptions, leading to checkout failures.",
    solution: "We constructed a headless commerce architecture with Next.js and Prisma, hooking up a highly optimized checkout flow integrated with Stripe. The interface includes beautiful, minimal custom cards, micro-interactions, and detailed descriptions of each organic farm's backstory.",
    metrics: [
      { label: "Checkout Conversion Rate", value: "+4.2%" },
      { label: "Subscription Retentions", value: "+115%" },
      { label: "Carbon Offsets Logged", value: "14 Tons" }
    ],
    thumbnail: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1488459718432-01055e67e1f5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1473186578172-c141e6798cf4?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "web-4",
    slug: "novatech-saas-landing",
    title: "NovaTech SaaS Landing",
    subtitle: "A highly conversion-focused, interactive landing page for AI operations.",
    category: "Web Development",
    client: "NovaTech AI Corp",
    timeline: "3 Weeks (2026)",
    tech: ["Next.js", "Framer Motion", "Tailwind CSS", "Three.js", "Zod"],
    description: "NovaTech wanted a visual showstopper of a landing page to unveil their deep learning cloud suite. We created a high-fidelity, futuristic landing page packed with interactive 3D elements, dynamic charts, and slick dark-mode graphics.",
    problem: "NovaTech's marketing page had high bounce rates because visitors didn't understand what their AI system actually did. They needed a punchy, highly interactive visual explanation.",
    solution: "We designed dynamic simulation sandboxes directly in the browser using WebGL and Framer Motion, enabling users to insert raw test queries and watch the virtual 'AI nodes' process it in real-time.",
    metrics: [
      { label: "Bounce Rate Decreased", value: "-24%" },
      { label: "Sign-up Conversions", value: "+63%" },
      { label: "Site Performance Score", value: "99/100" }
    ],
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "web-5",
    slug: "bloombakes-online-store",
    title: "BloomBakes Online Store",
    subtitle: "A whimsical, pastel-themed online bakery with customizable order flows.",
    category: "E-Commerce",
    client: "BloomBakes Boutique",
    timeline: "2 Months (2025)",
    tech: ["Next.js", "Tailwind CSS", "React Hook Form", "Stripe Checkout", "Resend"],
    description: "BloomBakes produces award-winning cakes and pastries. We designed a custom e-commerce solution where users can visually build multi-tiered wedding cakes, choose fillings, select decoration themes, and schedule precision-timed temperature-controlled delivery.",
    problem: "Standard e-commerce templates couldn't handle complex, custom, step-by-step cake configurations, leaving the owners stuck managing hundreds of complex email orders manually.",
    solution: "We created a fun, step-by-step interactive 'Cake Constructor' using custom canvas graphics, giving clients full freedom to build their dream cake and pay online with instant order notifications.",
    metrics: [
      { label: "Manual Order Volume Reduced", value: "-90%" },
      { label: "Average Order Value", value: "+38%" },
      { label: "Customer Satisfaction", value: "4.9/5" }
    ],
    thumbnail: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1519340333755-56e9c1d04579?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "web-6",
    slug: "mindspace-therapy-site",
    title: "MindSpace Therapy Site",
    subtitle: "A clean, peaceful digital sanctuary and scheduling portal for therapists.",
    category: "Web Development",
    client: "MindSpace Counseling Center",
    timeline: "1.5 Months (2025)",
    tech: ["Next.js 14", "Framer Motion", "Tailwind CSS", "Cal.com API", "Supabase"],
    description: "MindSpace provides virtual mental wellness consultations. We created a website optimized for calmness, reliability, and security, allowing patients to confidently find a therapist, verify insurance, and schedule HIPAA-compliant sessions.",
    problem: "Visiting a counseling website can be overwhelming. The clinic's previous design was cluttered, clinical, and difficult to navigate, creating friction for users seeking help.",
    solution: "We designed a layout using deep forest greens and soft warm tones, spacious layouts, and exceptionally smooth transitions. Scheduling is integrated into a clean 2-click process, removing all technical complexity.",
    metrics: [
      { label: "Booking Completion Rate", value: "+75%" },
      { label: "Friction Score Reduction", value: "-80%" },
      { label: "New Patient Registrations", value: "+110%" }
    ],
    thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "web-7",
    slug: "swifttrack-dashboard",
    title: "SwiftTrack Dashboard",
    subtitle: "A high-performance logistics monitoring and fleet dispatch interface.",
    category: "Web Development",
    client: "SwiftTrack Logistics",
    timeline: "6 Months (2025)",
    tech: ["Next.js 14", "Tailwind CSS", "Recharts", "WebSockets", "Go", "Redis"],
    description: "SwiftTrack manages global freight and local courier dispatching. We crafted a highly dense, robust dashboard displaying millions of tracking nodes, real-time map plots, predictive delay notifications, and customizable workflow modules.",
    problem: "Dispatchers were constantly switching between four separate, sluggish systems, causing critical dispatch delays, missed routes, and expensive communication overhead.",
    solution: "We unified everything into a single-pane dashboard featuring split-second live updates via WebSockets and visual progress tracking grids. Optimization of DOM rendering allows the live tracking maps to remain butter-smooth.",
    metrics: [
      { label: "Average Dispatch Speed", value: "-14 Min" },
      { label: "Dispatcher Accuracy", value: "99.9%" },
      { label: "Data Latency Reduction", value: "-92%" }
    ],
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "web-8",
    slug: "urbaneats-platform",
    title: "UrbanEats Platform",
    subtitle: "A local, curated community food delivery portal with driver dispatch tracking.",
    category: "Web Development",
    client: "UrbanEats Cooperative",
    timeline: "4.5 Months (2026)",
    tech: ["Next.js", "Tailwind CSS", "Google Maps API", "Stripe Connect", "Socket.io"],
    description: "UrbanEats is an ethical, cooperative-owned alternative to mega-corporation food delivery. We built a fast, localized platform featuring deep search categorization, secure cooperative profit sharing checkout, and a real-time driver tracking dispatch interface.",
    problem: "Local restaurants were losing 30% of sales to commission-heavy apps and needed a robust, high-performance community-owned delivery network.",
    solution: "We delivered an aesthetic, intuitive web app that operates beautifully across mobile browsers. Integrating real-time driver tracking maps and Stripe Connect, the site splits payments instantly.",
    metrics: [
      { label: "Active Resturant Partners", value: "180+" },
      { label: "Average Commission Paid", value: "only 8%" },
      { label: "Total Orders Processed", value: "250K+" }
    ],
    thumbnail: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "brand-1",
    slug: "zestora-brand-identity",
    title: "Zestora Brand Identity",
    subtitle: "Sleek, energetic identity design for an organic supplement line.",
    category: "Logo & Branding",
    client: "Zestora Health",
    timeline: "6 Weeks (2025)",
    tech: ["Brand Strategy", "Logo Design", "Packaging Design", "Vector Crafting", "Figma"],
    description: "Zestora offers premium organic focus boosters. We designed a vibrant, active, yet professional visual identity that balances scientific credibility with natural energy, spanning logos, custom typography, and physical packaging specs.",
    problem: "Zestora looked like a generic, sketchy vitamin jar. They wanted to enter high-end specialty grocery stores but lacked a credible premium aesthetic.",
    solution: "We designed a bespoke typographic mark utilizing customized geometric lettering and selected a bold emerald green and vibrant zest orange palette. We delivered detailed guidelines on label hierarchy, embossing patterns, and eco-friendly packaging.",
    metrics: [
      { label: "Retail Distribution Won", value: "1,200 Stores" },
      { label: "Direct-to-Consumer Sales", value: "+300%" },
      { label: "Unboxing Engagement", value: "10/10" }
    ],
    thumbnail: "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=800&q=80"
    ],
    beforeImage: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=800&q=80",
    afterImage: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "brand-2",
    slug: "calmly-wellness-logo",
    title: "Calmly Wellness Logo",
    subtitle: "A balanced, minimalist emblem for a high-end mindfulness center.",
    category: "Logo & Branding",
    client: "Calmly Wellness LLC",
    timeline: "4 Weeks (2025)",
    tech: ["Logo Design", "Color Psychology", "Stationery Design", "Figma", "Illustrator"],
    description: "Calmly Wellness needed a timeless, grounding logo to represent their boutique physical studios and digital retreats. We designed a clean, symbolic emblem that combines elements of a lotus leaf and a geometric infinite grid.",
    problem: "Their previous logo was overly intricate, making it difficult to embroider on uniforms, print on corporate business cards, or display cleanly as an app icon.",
    solution: "We crafted a highly recognizable vector logo that maintains perfect legibility down to 16px. Using soft clay tones, crisp navy blue, and generous whitespace, it projects trust and tranquility.",
    metrics: [
      { label: "Uniform Embroidery Quality", value: "Perfect" },
      { label: "Social Media CTR Increase", value: "+45%" },
      { label: "Client Retainment Score", value: "98%" }
    ],
    thumbnail: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "brand-3",
    slug: "nexlift-brand-kit",
    title: "Nexlift Brand Kit",
    subtitle: "Modern visual guidelines, design tokens, and assets for a SaaS fintech platform.",
    category: "Brand Kits",
    client: "Nexlift Systems",
    timeline: "2 Months (2025)",
    tech: ["Brand Kit", "UI Design System", "Iconography", "Corporate Stationery", "Figma"],
    description: "Nexlift is a dynamic cloud application processing credit card payments for small business merchants. We compiled a master design system and comprehensive brand kit governing product UI, physical terminals, corporate collateral, and marketing guidelines.",
    problem: "Nexlift's product, marketing, and sales departments were using inconsistent logos, colors, and fonts, severely diluting brand recognition.",
    solution: "We created a comprehensive 80-page brand guide and a synchronized Figma Library governing components, typography, dark/light grid patterns, and customized vector icons.",
    metrics: [
      { label: "Design Consistency Audit", value: "100%" },
      { label: "Developer Handoff Efficiency", value: "+40%" },
      { label: "B2B Lead Acquisition Rate", value: "+54%" }
    ],
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "brand-4",
    slug: "crevo-studio-logo",
    title: "Crevo Studio Logo",
    subtitle: "A striking, geometric typographic mark for an architectural firm.",
    category: "Logo & Branding",
    client: "Crevo Architecture Studio",
    timeline: "5 Weeks (2026)",
    tech: ["Typography Design", "Architectural Branding", "Brand Board", "Illustrator"],
    description: "Crevo designs stunning, sustainable minimalist concrete residences. We forged a customized typographic mark that mimics structural steel beams and cast-shadow geometry, reflecting their design language.",
    problem: "Crevo's branding felt too soft and decorative, failing to appeal to high-end real estate developers looking for bold structural modernism.",
    solution: "We engineered a robust custom-drawn geometric serif logo that is bold and structural. Accompanied by a clean black-and-white grid color scheme, the firm's brand presence became immediately striking.",
    metrics: [
      { label: "Architectural Pitch Wins", value: "8/10" },
      { label: "Social Media Followers", value: "+120%" },
      { label: "Premium Project Fees", value: "+25%" }
    ],
    thumbnail: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "brand-5",
    slug: "orbin-finance-branding",
    title: "Orbin Finance Branding",
    subtitle: "High-trust, elegant rebranding for a generational wealth manager.",
    category: "Logo & Branding",
    client: "Orbin Wealth Management",
    timeline: "8 Weeks (2025)",
    tech: ["Generational Strategy", "Bespoke Typography", "Print Standards", "Color Palettes"],
    description: "Orbin helps high-net-worth families preserve legacy assets. We executed a complete brand refresh to appeal to millennial heirs without alienating the older generation, emphasizing trust, growth, and modern stability.",
    problem: "Orbin's brand looked like a 1980s stockbrokerage, making them look completely out of touch with the younger inheritors of family estates.",
    solution: "We selected a rich gold and deep navy scheme, designed an elegant interlocking monogram logo, and specified ultra-premium, heavyweight stationery featuring textured linen stocks.",
    metrics: [
      { label: "Retained Inheritor Accounts", value: "96%" },
      { label: "AUM Growth in 6 Months", value: "+$42M" },
      { label: "Referral Inbound Velocity", value: "+60%" }
    ],
    thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "brand-6",
    slug: "solarhive-identity",
    title: "SolarHive Identity",
    subtitle: "A vibrant, forward-looking visual identity for a clean energy coop.",
    category: "Brand Kits",
    client: "SolarHive Energy",
    timeline: "2 Months (2026)",
    tech: ["Brand Architecture", "Vector Patterning", "Apparel Design", "Figma", "Illustrator"],
    description: "SolarHive installs neighborhood-scale solar arrays. We developed a visual system symbolizing warmth, community, and energy networks, creating assets for utility vans, community brochures, field tech gear, and clean web displays.",
    problem: "SolarHive needed to stand out from generic, boring solar installation companies by emphasizing community connection and collective environmental impact.",
    solution: "We crafted a geometric hive-structure solar panel pattern and a warm yellow/slate color scheme. Tech packages included high-visibility technical uniform designs and community flyer layouts.",
    metrics: [
      { label: "Community Buy-ins", value: "+185%" },
      { label: "Field Lead Conversion Rate", value: "+32%" },
      { label: "Van Fleet Uniformity Score", value: "100%" }
    ],
    thumbnail: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80"
    ]
  }
];

export const team: TeamMember[] = [
  {
    name: "Alex Sterling",
    role: "CEO & Brand Architect",
    bio: "With over a decade of design agency experience, Alex ensures every project matches the highest standards of strategic positioning, modern layouts, and grid systems.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&h=400&q=80",
    socials: {
      linkedin: "#",
      twitter: "#"
    }
  },
  {
    name: "Marcus Vance",
    role: "Lead Systems Architect",
    bio: "Marcus has engineered web infrastructures for major startups. He is obsessed with Next.js page speed optimization, clean React component design, and zero-latency integrations.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80",
    socials: {
      linkedin: "#",
      github: "#"
    }
  },
  {
    name: "Elena Rostova",
    role: "Principal Brand Designer",
    bio: "Elena crafts world-class visual languages. She has developed award-winning logos and brand kits that achieve long-lasting recognition in luxury retail, real estate, and finance.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&h=400&q=80",
    socials: {
      linkedin: "#",
      twitter: "#"
    }
  },
  {
    name: "Nikhil Mehta",
    role: "Senior Full-Stack Developer",
    bio: "Nikhil bridges complex database engineering with elegant web interfaces. He ensures interactive components, client forms, and data layers perform smoothly.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&h=400&q=80",
    socials: {
      linkedin: "#",
      github: "#"
    }
  }
];

export const stats = [
  { label: "Projects Delivered", value: "50+" },
  { label: "Happy Clients", value: "30+" },
  { label: "Years Experience", value: "4+" },
  { label: "Countries Served", value: "5" }
];

export const testimonials: Testimonial[] = [
  {
    name: "Genevieve Thorne",
    role: "Managing Director",
    company: "Luxe Realty Group",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150&q=80",
    comment: "Vygrid did not just build a website; they captured the soul of our high-end real estate agency. Our inquiries immediately jumped by 142% after launch, and their attention to every minor layout detail was extraordinary. They operate on an entirely different level of design."
  },
  {
    name: "Brandon Chase",
    role: "Founder",
    company: "FitPulse Gyms",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&h=150&q=80",
    comment: "The progressive web app built by Vygrid transformed our client booking experience. It functions incredibly well on mobile, and the offline calendar syncing is robust. Workflows that used to take our staff hours are now fully automated."
  },
  {
    name: "Amara Okoye",
    role: "Chief Marketing Officer",
    company: "Zestora Health",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=150&h=150&q=80",
    comment: "Rebranding a supplement company is daunting, but Vygrid's design system made it seamless. The new logo and eco-friendly labels immediately got us accepted into three premium national food chains. They design assets that drive literal revenue growth."
  },
  {
    name: "Sven Lindqvist",
    role: "CTO",
    company: "Nexlift Systems",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
    comment: "The Figma brand kit and Tailwind tokens Vygrid established saved our frontend engineers months of redundant styling work. Our app interface is completely unified, fast, and feels highly premium. I cannot recommend their design engineers enough."
  },
  {
    name: "Clara Tremblay",
    role: "Executive Director",
    company: "SolarHive Cooperative",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80",
    comment: "From the initial grid wireframes to final animations, the collaboration with Vygrid was perfect. They built a localized portal that reflects community and clean power while maintaining flawless speed and accessible SEO metadata."
  }
];

export const webServices: ServiceBreakdown[] = [
  {
    title: "Custom Websites",
    description: "Tailored to your exact business objectives, crafted with exceptional typography, glassmorphic card layouts, and responsive 8pt grid precision.",
    features: ["Responsive layouts", "Bespoke user interactions", "Custom backend integrations", "Page speed optimization"],
    iconName: "Globe"
  },
  {
    title: "E-Commerce",
    description: "Highly secure e-commerce systems featuring advanced checkout flows, dynamic product visualizers, and stripe-integrated subscription tiers.",
    features: ["Stripe payment splits", "Custom search query filtering", "High-performance cart actions", "Supplier dashboards"],
    iconName: "ShoppingBag"
  },
  {
    title: "Web Apps",
    description: "Dynamic software dashboards, dispatch systems, or responsive client hubs engineered using Next.js 14 and robust API hooks.",
    features: ["Real-time websocket feeds", "Complex chart metrics visualizations", "HIPAA/GDPR security profiles", "Aggressive local caching"],
    iconName: "LayoutDashboard"
  },
  {
    title: "Landing Pages",
    description: "Framer Motion animated, laser-focused promotional landing experiences designed to elevate conversion margins and drive lead growth.",
    features: ["Word-by-word micro-animations", "A/B testing architectures", "Zod validated contact captures", "Zero-bounce page speeds"],
    iconName: "Zap"
  },
  {
    title: "CMS Websites",
    description: "Flexible content platforms mapped to sanity or headless WordPress, giving content editors complete independence while securing speeds.",
    features: ["Drag-and-drop structural elements", "Automated SEO meta fields", "Secure multi-author configurations", "Clean headless deployments"],
    iconName: "FolderEdit"
  },
  {
    title: "Maintenance & Support",
    description: "24/7 security auditing, speed optimizations, automated off-site backups, and content updates keeping your studio assets fresh and fast.",
    features: ["Monthly performance audits", "Automated db snapshotting", "SSL management & renewals", "Dedicated communication slack"],
    iconName: "ShieldCheck"
  }
];

export const brandServices: ServiceBreakdown[] = [
  {
    title: "Logo Design",
    description: "Bespoke, hand-crafted typographic marks and geometry structured to represent your business legacy and scale beautifully down to 16px icons.",
    features: ["Primary, horizontal, & icon variations", "Detailed mathematical geometry specs", "Optimized vector handoffs (SVG/EPS)", "Unlimited license ownership"],
    iconName: "Compass"
  },
  {
    title: "Brand Identity Kit",
    description: "Complete design guidelines governing typography, color hierarchies, pattern designs, textures, and graphic treatments.",
    features: ["80+ page comprehensive guidelines doc", "Interactive Figma component library", "Accessible color accessibility standards", "Custom vector styling pattern library"],
    iconName: "Layers"
  },
  {
    title: "Business Stationery",
    description: "Beautifully tactile layout files for premium corporate stationery, customized textured letterheads, envelopes, and heavy stock business cards.",
    features: ["Textured stock specifications", "Spot-UV printing parameters", "Digital interactive PDF templates", "Eco-friendly supplier matching"],
    iconName: "Mail"
  },
  {
    title: "Social Media Branding",
    description: "High-impact layout frameworks and customizable assets for Instagram, LinkedIn, and YouTube ensuring immediate brand matching.",
    features: ["Customizable Figma posting matrices", "Animated video intros & transitions", "High-conversion banner templates", "Branded story templates"],
    iconName: "Share2"
  },
  {
    title: "Rebranding",
    description: "Strategic repositioning and brand refreshes designed to capture millennial markets and preserve hard-earned company legacies.",
    features: ["Comprehensive brand audits", "Competitor visual landscaping", "Transitional launch assets", "Legacy preservation blueprints"],
    iconName: "RefreshCw"
  },
  {
    title: "Pitch Deck Design",
    description: "High-end B2B corporate deck slides created to hook investor interest, simplify metrics, and close complex commercial accounts.",
    features: ["Custom structured infographic charts", "Interactive presentation templates", "Punchy content copywriting", "PDF, Keynote, & PowerPoint files"],
    iconName: "Presentation"
  }
];

export const webFAQs = [
  {
    q: "How long does a custom Next.js website build usually take?",
    a: "A bespoke custom website typically takes between 4 to 8 weeks, depending on complexity. A simpler, high-conversion animated landing page can be completed in 2 to 3 weeks, while complex e-commerce engines or specialized dashboards require 8 to 12 weeks of engineering, testing, and optimization."
  },
  {
    q: "Will my website perform well on mobile and pass Lighthouse speed tests?",
    a: "Absolutely. We build with a strict mobile-first design process. We leverage Next.js features such as automatic image optimization (WebP), server-side rendering, and static generation. Our websites typically score 95+ on Google Lighthouse audits for Performance, Accessibility, and SEO."
  },
  {
    q: "Do you provide custom content management systems (CMS)?",
    a: "Yes. We specialize in headless CMS configurations (using Sanity, Strapi, or headless WordPress). This gives your team a beautiful, simple drag-and-drop dashboard to edit blog posts, property listings, or testimonials, while maintaining full codebase security and performance."
  },
  {
    q: "Can you migrate an old, slow WooCommerce/WordPress site?",
    a: "Yes. We regularly migrate legacy shops to headless Next.js architectures. We securely import all user profiles, historical orders, and product data tables while setting up a Stripe-integrated checkout flow that dramatically boosts purchase conversions."
  },
  {
    q: "What does your maintenance and optimization agreement cover?",
    a: "Our monthly agreements cover automated daily off-site backups, 24/7 security auditing, software dependencies patching, standard copy edits, and continuous search speed optimizations. We also schedule a monthly strategy call to review conversion analytics."
  }
];

export const brandFAQs = [
  {
    q: "What is included in a complete Brand Identity Kit?",
    a: "Our comprehensive Brand Kit includes a bespoke logo suite (primary, horizontal, and emblem marks), standard typographic hierarchy guidelines, strict color formulas (HEX, RGB, CMYK, Pantone), custom vector graphic patterns, high-fidelity corporate stationery files, and social media layout kits, all compiled in an 80+ page master brand book and dynamic Figma library."
  },
  {
    q: "How many initial logo design directions do you present?",
    a: "We present 3 highly distinct, strategically researched logo directions. Each direction is fully rendered in realistic mockups (signage, packaging, screen layouts) so you can visualize how they operate in the real world. We then refine your selected choice through 3 rounds of modifications."
  },
  {
    q: "Who owns the copyright of the final logo and visual assets?",
    a: "Upon final invoice settlement, complete copyright and worldwide intellectual property ownership are permanently transferred to you. We provide high-resolution, scale-independent vector source files (.SVG, .EPS, .AI, .PDF) alongside specialized web-optimized rasters."
  },
  {
    q: "Can you design custom physical product packaging?",
    a: "Yes. We specialize in high-end structural product packaging design. We design custom retail boxes, vitamin bottles, shipping boxes, and unboxing details. We provide printer-ready die-line templates with specific spot-UV varnish and hot-foil stamping specs."
  },
  {
    q: "How do you coordinate design transitions if we are rebranding?",
    a: "We develop a step-by-step transitional guide. We provide social media teaser graphics, email newsletters assets, press kits, and scheduled launch assets to build massive hype for your brand upgrade, keeping your legacy clients engaged and excited."
  }
];
export interface BlogPost {
  id: string;
  title: string;
  category: "Web Development" | "UI/UX Design" | "Technology Trends" | "Digital Strategy";
  excerpt: string;
  date: string;
  thumbnail: string;
  slug: string;
}

export interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  recommended: boolean;
}

export const webPricingTiers: PricingTier[] = [
  {
    name: "Starter Site",
    price: "₹3,500",
    description: "Perfect for startups needing high-converting visibility fast.",
    features: [
      "Custom Animated Landing Page",
      "Pristine Framer Motion reveals",
      "Zod Validated Contact Form",
      "98+ Lighthouse Speed Score",
      "Basic static metadata setup",
      "1 Week post-launch assistance"
    ],
    recommended: false,
  },
  {
    name: "Studio Site",
    price: "₹7,500",
    description: "Complete strategic web platform with content management controls.",
    features: [
      "Up to 8 custom page templates",
      "Headless CMS integration (Sanity)",
      "Immersive interactive canvas elements",
      "Fully optimized mobile responsiveness",
      "Schema.org & dynamic OG Tags",
      "Stripe payment/checkout hooks",
      "4 Weeks post-launch optimization"
    ],
    recommended: true,
  },
  {
    name: "Enterprise App",
    price: "₹15,000+",
    description: "Bespoke SaaS portal, dense dashboard or multi-vendor commerce.",
    features: [
      "Tailored web application structure",
      "Real-time WebSocket server feeds",
      "Secure custom Database structures",
      "Multi-tier user dashboard access",
      "Stripe split subscription billing",
      "Dense Recharts analytics logs",
      "Dedicated quarterly engineers SLA"
    ],
    recommended: false,
  }
];

export const brandPricingTiers: PricingTier[] = [
  {
    name: "Starter Logo",
    price: "₹2,000",
    description: "Basic strategic emblem and clean typographic mark for new ideas.",
    features: [
      "2 Bespoke vector directions",
      "Primary logo & Icon version",
      "Selected color guidelines",
      "Clean Vector master files (.ai, .svg)",
      "2 Rounds of adjustments",
      "1 Week delivery cycle"
    ],
    recommended: false,
  },
  {
    name: "Studio Identity",
    price: "₹5,000",
    description: "Comprehensive visual branding, guidelines, and corporate kit.",
    features: [
      "3 Unique logo design directions",
      "Primary, horizontal, & icon monograms",
      "Spot-UV custom stationery specs",
      "Social media posting matrices",
      "Detailed 80-page brand book PDF",
      "Synced Figma Styles Library",
      "3 Rounds of layout adjustments",
      "3 Weeks expert delivery"
    ],
    recommended: true,
  },
  {
    name: "Enterprise Refresh",
    price: "₹10,000+",
    description: "Legacy re-branding, custom packaging design, and commercial pitch deck templates.",
    features: [
      "In-depth competitor analysis",
      "Legacy transition strategic plan",
      "Custom box packaging die-lines",
      "Tactile linen stock printer matches",
      "30-Slide Keynote investor deck",
      "Master digital patterns & guides",
      "Unlimited custom adjustments",
      "5 Weeks priority delivery"
    ],
    recommended: false,
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: "blog-1",
    title: "The Mathematics of Typography in Digital Interfaces",
    category: "UI/UX Design",
    excerpt: "Exploring why strict grid alignments, proportional leading, and absolute visual hierarchy generate immediate trust and emotional weight in luxury branding.",
    date: "May 28, 2026",
    thumbnail: "https://images.unsplash.com/photo-1561070791-26c113006238?auto=format&fit=crop&w=600&h=400&q=80",
    slug: "mathematics-of-typography-digital-interfaces"
  },
  {
    id: "blog-2",
    title: "Why We Abandoned Tailwind CSS for Custom Vanilla Layouts",
    category: "Web Development",
    excerpt: "A deep dive into structural speed, styling purism, and why achieving absolute zero-border-radius linear precision requires direct CSS control without bloated frameworks.",
    date: "May 15, 2026",
    thumbnail: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&h=400&q=80",
    slug: "why-we-abandoned-tailwind-css-vanilla"
  },
  {
    id: "blog-3",
    title: "The Future of Edge Middleware and Global Content Caching",
    category: "Technology Trends",
    excerpt: "Analyzing how dynamic content delivery at close proximity reduces latency to under 50ms, removes server bottlenecks, and secures blistering fast user interfaces.",
    date: "April 30, 2026",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&h=400&q=80",
    slug: "future-of-edge-middleware-global-caching"
  },
  {
    id: "blog-4",
    title: "Designing the Unboxing: Translating Digital Identity to Luxury Print",
    category: "Digital Strategy",
    excerpt: "How B2B companies leverage premium physical stationery, textured paper stocks, and spot-UV hot-foil monograms to bridge digital excellence and tangible brand authority.",
    date: "April 12, 2026",
    thumbnail: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=600&h=400&q=80",
    slug: "designing-unboxing-digital-identity-luxury-print"
  }
];

