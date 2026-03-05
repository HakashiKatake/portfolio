export interface Skill {
  name: string;
  level: string;
  description?: string;
}

export interface Project {
  name: string;
  description: string;
  engine: string;
  demo: string;
  github: string;
  linkedin?: string;
  category: "mobile" | "pc" | "gamejam" | "personal" | "tools";
}

export interface Blog {
  title: string;
  description: string;
  linkedin: string;
  github?: string;
}

export interface GameJam {
  name: string;
  project: string;
}

export interface Achievement {
  title: string;
  year: number;
}

export interface Contact {
  github: string;
  linkedin: string;
  email: string;
}

export interface About {
  bio: string;
  location: string;
}

export interface NpcDialogues {
  alchemist: string[];
  miner: string[];
  shaman: string[];
  villageLady: string[];
}

export interface PortfolioData {
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
}
