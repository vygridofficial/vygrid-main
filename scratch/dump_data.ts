import { 
  projects, 
  team, 
  stats, 
  testimonials, 
  webServices, 
  brandServices, 
  webFAQs, 
  brandFAQs, 
  webPricingTiers, 
  brandPricingTiers, 
  blogPosts 
} from '../lib/data';
import * as fs from 'fs';
import * as path from 'path';

const homepageSettings = {
  heroTitle: "Your digital presence, Perfected.",
  heroSubtitle: "Building fast, modern, and user-focused digital solutions that elevate your brand and strengthen your online presence.",
  heroPrimaryBtn: "Start Your Project",
  heroPrimaryBtnHref: "/start-your-project",
  heroSecondaryBtn: "View Our Work",
  heroSecondaryBtnHref: "/portfolio",
  ctaTitle: "Ready to build,an experience,that moves,People",
  ctaSubtitle: "Partner with Vygrid to refine your digital presence.",
  ctaButtonText: "Tell us your story",
  ctaButtonHref: "/contact"
};

const aboutPageSettings = {
  title: "About Our Studio",
  subtitle: "Learn about Vygrid Digital Studio, our convictions of precision engineering and visual integrity, our horizontal timeline, and our founding team.",
  introHeading: "We are a design and engineering studio.",
  introParagraph1: "Vygrid is founded on the conviction that digital interfaces should be fast, beautiful, and enduring. We reject standard templates and bloated frameworks in favor of layout discipline, typography-led structures, and absolute styling control.",
  introParagraph2: "We operate as a high-agency team for founder-led brands. By merging rigorous full-stack development with editorial brand styling, we construct digital spaces that project credibility and command premium authority."
};

const contactSettings = {
  email: "hello@vygrid.studio",
  phone: "+1 (555) 000-0000",
  address: "Grid Avenue 8, Digital District, 10001, US",
  whatsapp: "10000000000",
  instagram: "#",
  linkedin: "https://www.linkedin.com/company/vygrid",
  twitter: "https://twitter.com/vygrid",
  lat: 40.7128,
  lng: -74.006
};

const generalSettings = {
  logoUrl: "/logodes.png",
  faviconUrl: "/favicon.ico",
  companyName: "Vygrid Digital Studio",
  companyReg: "EST. 2026 • VYGRID STUDIO",
  adminUsername: "admin",
  adminPassword: "vygrid-admin-2026"
};

const seoSettings = {
  home: {
    title: "Vygrid Digital Studio | Custom Web Engineering & Brand Curation",
    description: "Vygrid Digital Studio builds editorial-grade custom websites and brand identities for established, founder-led businesses. Obsessively minimal, typography-led."
  },
  about: {
    title: "About Our Studio | Vygrid Digital Studio",
    description: "Learn about Vygrid Digital Studio, our convictions of precision engineering and visual integrity, our horizontal timeline, and our founding team."
  },
  services: {
    title: "Services & Expertise | Vygrid Digital Studio",
    description: "Explore our web engineering and brand curation services designed for premium conversion and timeless aesthetics."
  },
  portfolio: {
    title: "Our Portfolio | Vygrid Digital Studio",
    description: "Browse our hand-crafted, typographic web development and logo branding projects."
  },
  blog: {
    title: "The Vygrid Journal | Vygrid Digital Studio",
    description: "Insights on typography, engineering speeds, and digital strategy for modern founder-led brands."
  },
  contact: {
    title: "Contact Our Studio | Vygrid Digital Studio",
    description: "Get in touch with Vygrid Digital Studio to discuss your next custom project."
  },
  pricing: {
    title: "Pricing & Packages | Vygrid Digital Studio",
    description: "Select from our structured starter, studio, and enterprise web and brand packages."
  }
};

const navigationSettings = {
  navLinks: [
    { name: "Home", href: "/" },
    { name: "About", href: "#", triggerModal: true },
    { name: "Services", href: "/services" },
    { name: "Work", href: "/portfolio" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" }
  ]
};

const footerSettings = {
  tagline: "From concept to launch, we build digital excellence.",
  directoryLinks: [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Work", href: "/portfolio" },
    { name: "Blog", href: "/blog" },
    { name: "Start Project", href: "/start-your-project" },
    { name: "Contact", href: "/contact" }
  ]
};

// Add full markdown content blockquotes rendering to blog posts
const blogPostsWithContent = blogPosts.map(p => ({
  ...p,
  content: `At Vygrid, we believe that premium execution is a direct derivative of restraint. In modern digital systems, visually cluttered grids and decorative flourishes represent a lack of structural conviction. When we examine luxury editorial design, we find that visual gravity is achieved through careful weight distributions and generous whitespace.\n\n> Whitespace is not empty space; it is structural leverage. It dictates where the user's eye rests and establishes immediate typographic authority.\n\nWe construct custom web interfaces that pass stringent Lighthouse audits, maintaining perfect 100 scores across Performance, Accessibility, and SEO. By removing bloated external dependencies and crafting clean Next.js React components from scratch, we build functional sites that remain fast for years.\n\nIn terms of visual identity, the exact same rules of mathematical grid precision apply. Emblems must be fully recognizable down to 16px stamps, and vector marks must maintain perfect clarity without visual artifacting.`
}));

const masterData = {
  homepageSettings,
  aboutPageSettings,
  contactSettings,
  generalSettings,
  seoSettings,
  navigationSettings,
  footerSettings,
  stats,
  projects,
  team,
  testimonials,
  webServices,
  brandServices,
  webFAQs,
  brandFAQs,
  webPricingTiers,
  brandPricingTiers,
  blogPosts: blogPostsWithContent
};

fs.writeFileSync(
  path.join(__dirname, 'master_data.json'), 
  JSON.stringify(masterData, null, 2), 
  'utf8'
);
console.log('Successfully wrote master_data.json');
