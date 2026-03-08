export interface Palette {
  primary: string;
  accent: string;
  accent2: string;
  muted: string;
  dark: string;
}

export interface Meta {
  name: string;
  title: string;
  location: string;
  palette: Palette;
  resumeUrl: string;
}

export interface ResumeLink {
  label: string;
  focus?: string;
  url: string;
}

export interface ResumeHighlight {
  label: string;
  value: string;
}

export interface Skill {
  name: string;
  level: string;
  description?: string;
}

export interface Project {
  // Core fields (used by both simple + interactive)
  name: string;
  description: string;
  engine: string;
  category: "mobile" | "pc" | "gamejam" | "personal" | "tools";

  // Interactive game fields
  demo: string;
  github: string;
  linkedin?: string;

  // Simple portfolio extended fields
  id?: string;
  platform?: string[];
  tags?: string[];
  role?: string;
  whatILearned?: string;
  tools?: string[];
  year?: number;
  cover?: string;
  featured?: boolean;
  links?: { play?: string; github?: string; store?: string; linkedin?: string };
  engagement?: "personal" | "team";
  teamSize?: number;
  responsibilities?: string[];
  learning?: {
    concepts?: string[];
    challenges?: string[];
    mechanics?: string[];
    lessons?: string[];
    results?: string[];
  };
}

export interface Blog {
  slug?: string;
  title: string;
  description: string;
  date?: string;
  tags?: string[];
  linkedin: string;
  github?: string;
  cover?: string;
}

export interface GameJam {
  name: string;
  project: string;
  role?: string;
  year?: number;
  result?: string;
}

export interface Achievement {
  title: string;
  year: number;
}

export interface Contact {
  github: string;
  linkedin: string;
  email: string;
  phone?: string;
  website?: string;
  itch?: string;
}

export interface About {
  bio: string;
  location: string;
  avatar?: string;
}

export interface NpcDialogues {
  alchemist: string[];
  miner: string[];
  shaman: string[];
  villageLady: string[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location?: string;
  bullets: string[];
}

export interface Certification {
  title: string;
  issuer?: string;
  status?: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  expected?: string;
}

export interface PortfolioData {
  meta?: Meta;
  name: string;
  title: string;
  about: About;
  skills: Skill[];
  projects: Project[];
  blogs: Blog[];
  gameJams: GameJam[];
  achievements: Achievement[];
  contact: Contact;
  favoriteGames: string[];
  npcDialogues: NpcDialogues;
  resumes?: ResumeLink[];
  resumeHighlights?: ResumeHighlight[];
  experience?: ExperienceItem[];
  certifications?: Certification[];
  education?: EducationItem[];
}
