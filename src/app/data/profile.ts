export type SectionId = 'about' | 'projects' | 'skills' | 'education' | 'contact';

export type RoadmapStatus = 'Done' | 'In Progress' | 'Planned';

export interface NavLink {
  id: SectionId;
  label: string;
}

export interface QuickFact {
  title: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  summary: string;
  image: string;
  githubUrl: string;
  liveUrl: string;
  tech: string[];
  roleImpact: string[];
  learned: string;
  details: string[];
  features?: string[];
  interactiveDemo?: boolean;
  featured?: boolean;
}

export interface SkillCategory {
  title: string;
  icon: 'code' | 'cloud' | 'git' | 'server' | 'network' | 'office';
  skills: string[];
}

export interface EducationItem {
  school: string;
  program: string;
  period: string;
  description: string;
}

export interface RoadmapItem {
  title: string;
  status: RoadmapStatus;
  description: string;
  githubUrl: string;
  liveUrl: string;
}

export interface SocialLink {
  label: string;
  url: string;
}

export interface ProfileData {
  name: string;
  role: string;
  location: string;
  email: string;
  phone: string;
  navLinks: NavLink[];
  headline: string;
  subline: string;
  summary: string;
  availability: string;
  heroTech: string[];
  aboutStory: string;
  currentFocus: string;
  quickFacts: QuickFact[];
  projects: Project[];
  angularRoadmap: RoadmapItem[];
  roadmapStage: string;
  skills: SkillCategory[];
  education: EducationItem[];
  social: SocialLink[];
}

export const profile: ProfileData = {
  name: 'Rati Kinkriashvili',
  role: 'Frontend Web Developer',
  location: 'Georgia',
  email: 'kinkriashvilirati@gmail.com',
  phone: '+995 598 52 49 50',
  navLinks: [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ],
  headline: 'Front-End Developer',
  subline:
    'Building responsive web apps with React and TypeScript, focused on clean UX and strong performance.',
  summary:
    'Dedicated and ambitious Front-End Developer, focused on gaining real-world experience and continuously improving.',
  availability: 'Available for junior role / internship',
  heroTech: ['React', 'TypeScript', 'Javascript', 'Tailwind', 'REST APIs', 'Git/GitHub'],
  aboutStory:
    'I enjoy translating product ideas into interfaces that are clear, fast, and reliable. My work started with React projects where I built component-based UIs and real user flows, and I apply the same product mindset to every project I build.',
  currentFocus:
    'Right now I am focused on React, TypeScript, TanStack Query, and building full-stack connected apps with real auth flows and clean component architecture.',
  quickFacts: [
    { title: 'Location', value: 'Georgia' },
    { title: 'Languages', value: 'Georgian (Native), English (B2), Japanese (N3)' },
    { title: 'Deployments', value: 'Netlify / Vercel / GitHub Pages' },
    { title: 'Collaboration', value: 'Worked with backend developer via REST APIs' },
  ],
  projects: [
    {
      id: 'online-marketplace',
      title: 'Online Marketplace',
      summary: 'Designed and developed a responsive React.js interface for an Online Marketplace.',
      image: '/images/online-marketplace.svg',
      githubUrl: 'https://github.com/kinkriasvhili/SellBuy',
      liveUrl: 'https://sell-buy1.netlify.app/',
      tech: [
        'React',
        'TypeScript/JS',
        'REST API',
        'React Query/Fetch/Axios',
        'CSS',
        'HTML',
        'Git/GitHub',
      ],
      roleImpact: [
        'Built reusable product listing, dashboard, and form components.',
        'Integrated authentication APIs for signup, login, and password recovery.',
        'Collaborated with backend developer through RESTful API contracts.',
        'Used Git/GitHub for versioning and structured feature delivery.',
      ],
      learned:
        'What I learned: API contract discipline and reusable UI patterns are key to shipping faster with fewer regressions.',
      details: [
        'Created a responsive layout system with reusable card and grid structures.',
        'Handled auth state and API edge cases to improve reliability.',
        'Improved delivery speed by creating component conventions early.',
      ],
      featured: true,
    },
    {
      id: 'mini-ecommerce-site',
      title: 'Mini E-commerce Site (Amazon-Copy)',
      summary:
        'Smaller e-commerce websites with product listings, cart functionality, and basic checkout flows.',
      image: '/images/mini-ecommerce.svg',
      githubUrl: 'https://github.com/kinkriashvilirati/Amazon-Copy',
      liveUrl: 'https://kinkriashvilirati.github.io/Amazon-Copy/amazon.htmll',
      tech: ['Vanilla Javascript', 'HTML', 'CSS', 'Git'],
      roleImpact: [
        'Implemented shopping cart and quantity updates across product views.',
        'Built search and filter flows to improve product discovery.',
        'Shaped buying flow with clear cart and checkout interfaces.',
      ],
      learned:
        'What I learned: state consistency across cart, search, and checkout is the foundation of e-commerce UX.',
      details: [
        'Improved product browsing and conversion path with clearer hierarchy.',
        'Practiced handling shared state updates across multiple screens.',
      ],
      features: ['Cart functionality', 'Responsive layout', 'Basic checkout UI'],
    },
  ],
  angularRoadmap: [
    {
      title: 'Portfolio',
      status: 'Done',
      description: 'Portfolio build for Rati Kinkriashvili, showcasing  projects and skills.',
      githubUrl: '#',
      liveUrl: '#',
    },
    {
      title: 'Warby-Parker E-ccomerece Website',
      status: 'Done',
      description:
        'E-commerce website for Warby-Parker, featuring product listings, cart functionality, and basic checkout flows.',
      githubUrl: 'https://github.com/kinkriashvilirati/Warby-Parker',
      liveUrl: 'https://kinkriashvilirati.github.io/Warby-Parker/warbyparker.html',
    },
    {
      title: 'Online Courses Platform',
      status: 'In Progress',
      description:
        'Full-stack connected online learning platform with authentication, course catalog, enrollment system, and user profile management. Built with React, TypeScript, and TanStack Query.',
      githubUrl: 'https://github.com/kinkriashvilirati/OnlineCourses',
      liveUrl: 'https://online-courses-rk.vercel.app/',
    },
    {
      title: 'Progress Tracking Software',
      status: 'In Progress',
      description:
        'Company task and employee management application where managers can delegate and track tasks across team members. Built with React and TypeScript, connected to a real backend API.',
      githubUrl: 'https://github.com/kinkriashvilirati/-Progress-Tracking-Software',
      liveUrl: 'https://progress-tracking-software-rk.vercel.app/',
    },
  ],
  roadmapStage: 'Portfolio stage',
  skills: [
    {
      title: 'Front End',
      icon: 'code',
      skills: ['JavaScript', 'TypeScript', 'HTML', 'CSS', 'React'],
    },
    {
      title: 'APIs',
      icon: 'cloud',
      skills: ['REST APIs', 'React Query', 'Fetch', 'Axios'],
    },
    {
      title: 'Version Control',
      icon: 'git',
      skills: ['Git', 'GitHub'],
    },
    {
      title: 'Back End',
      icon: 'server',
      skills: ['Python (Beginner - OOP principles, Data Types)', 'SQL (basics)'],
    },
    {
      title: 'Networking & OS',
      icon: 'network',
      skills: ['Cisco', 'Linux (basic)'],
    },
    {
      title: 'Microsoft',
      icon: 'office',
      skills: ['Excel (Advanced)', 'Word', 'PowerPoint'],
    },
  ],
  education: [
    {
      school: 'BTU - Business and Technology University',
      program: 'Information Technology',
      period: '2024 - current',
      description:
        'Building a strong technical base while focusing on practical front-end engineering skills.',
    },
  ],
  social: [
    { label: 'GitHub', url: 'https://github.com/kinkriashvilirati' },
    { label: 'LinkedIn', url: '#' },
  ],
};
