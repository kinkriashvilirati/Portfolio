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

export interface ProjectArchiveItem {
  id: string;
  title: string;
  status: RoadmapStatus;
  year: string;
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
  projectArchiveSummary: string;
  projectArchive: ProjectArchiveItem[];
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
      id: 'online-courses',
      title: 'Online Courses Platform',
      summary:
        'Built a production-style learning platform with course discovery, scheduling, enrollment, and progress tracking flows.',
      image: '/images/online-courses.svg',
      githubUrl: 'https://github.com/kinkriashvilirati/OnlineCourses',
      liveUrl: 'https://online-course-rk.netlify.app/',
      tech: [
        'React 19',
        'TypeScript',
        'Vite',
        'Tailwind CSS',
        'React Router',
        'TanStack Query',
        'Axios',
      ],
      roleImpact: [
        'Built a course catalog with filters, sorting, and pagination for faster discovery.',
        'Integrated backend enrollment flows with schedule selection and conflict handling.',
        'Added dashboard flows for active courses, completions, ratings, and retakes.',
        'Structured reusable routing and data-fetching patterns across the app.',
      ],
      learned:
        'What I learned: strong product flows come from designing data fetching, scheduling rules, and confirmation states together from the beginning.',
      details: [
        'Designed featured and catalog course browsing with category, topic, and instructor filters.',
        'Implemented weekly schedules, time slots, and session type selection before enrollment.',
        'Handled schedule conflicts with a confirmation flow before sending the final request.',
        'Added completion, rating, and retake experiences from the learner dashboard.',
      ],
      features: [
        'Browse featured and catalog courses',
        'Filter, sort, and paginate courses',
        'Choose schedules, time slots, and session types',
        'Enroll with backend integration',
        'Handle schedule conflicts with confirmation flow',
        'Track progress and reopen enrolled courses',
      ],
      featured: true,
    },
  ],
  projectArchiveSummary:
    'A full archive of finished builds, smaller experiments, and the one in-progress project I am still shaping.',
  projectArchive: [
    {
      id: 'progress-tracking-software',
      title: 'Progress Tracking Software',
      status: 'In Progress',
      year: '2025',
      description:
        'Company task and employee management application where managers can delegate and track work across team members.',
      githubUrl: 'https://github.com/kinkriashvilirati/-Progress-Tracking-Software',
      liveUrl: 'https://progress-tracking-software-rk.vercel.app/',
    },
    {
      id: 'online-courses',
      title: 'Online Courses Platform',
      status: 'Done',
      year: '2025',
      description:
        'Course platform with discovery, scheduling, enrollment, dashboard progress, ratings, and retake flows.',
      githubUrl: 'https://github.com/kinkriashvilirati/OnlineCourses',
      liveUrl: 'https://online-course-rk.netlify.app/',
    },
    {
      id: 'portfolio',
      title: 'Portfolio',
      status: 'Done',
      year: '2025',
      description:
        'Portfolio build for Rati Kinkriashvili, showcasing projects, skills, and contact details.',
      githubUrl: '#',
      liveUrl: '#',
    },

    {
      id: 'online-marketplace',
      title: 'Online Marketplace',
      status: 'Done',
      year: '2025',
      description:
        'Marketplace app with authentication flows, reusable product views, and backend-connected user actions.',
      githubUrl: 'https://github.com/kinkriasvhili/SellBuy',
      liveUrl: 'https://sell-buy1.netlify.app/',
    },
    {
      id: 'warby-parker',
      title: 'Warby Parker Website (copy)',
      status: 'Done',
      year: '2024',
      description:
        'Website for glasses and eye consultation, featuring product listings, quiz, filtering data, basic checkout flows...',
      githubUrl: 'https://github.com/kinkriashvilirati/Warby-Parker',
      liveUrl: 'https://kinkriashvilirati.github.io/Warby-Parker/warbyparker.html',
    },
    {
      id: 'amazon Copy',
      title: 'Amazon Copy',
      status: 'Done',
      year: '2024',
      description:
        'Small Amazon-copy with product browsing, cart updates, and a basic checkout experience.',
      githubUrl: 'https://github.com/kinkriashvilirati/Amazon-Copy',
      liveUrl: 'https://kinkriashvilirati.github.io/Amazon-Copy/amazon.htmll',
    },
    {
      id: 'codecamp-ecommerce',
      title: 'CodeCamp E-commerce Website',
      status: 'Done',
      year: '2023',
      description:
        'Earlier small e-commerce website built around product browsing and a lightweight shopping flow.',
      githubUrl: 'https://github.com/kinkriasvhili/CodeCampEccomerce',
      liveUrl: 'https://kinkriasvhili.github.io/CodeCampEccomerce/',
    },
    {
      id: 'ecommerce-website',
      title: 'E-commerce Website',
      status: 'Done',
      year: '2023',
      description:
        'Older storefront project focused on product listing layout, navigation, and core shopping interactions.',
      githubUrl: 'https://github.com/kinkriasvhili/EccomerceWebSite',
      liveUrl: 'https://kinkriasvhili.github.io/EccomerceWebSite/eccomereceWebsite/main.html',
    },
  ],
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
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/ratikinkriashvili/' },
  ],
};
