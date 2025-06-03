export interface PersonalData {
  profile: {
    name: string;
    title: string;
    summary: string;
    location: string;
    availability: string;
    contact: {
      email: string;
      linkedin: string;
      github: string;
    };
    languages: {
      name: string;
      proficiency: string;
      details?: string;
    }[];
    interests: string[];
  };
  projects: {
    title: string;
    description: string;
    technologies: string[];
    highlights: string[];
    github: string;
    demo: string;
  }[];
  skills: {
    category: string;
    items: {
      name: string;
      level: string;
      years: number;
    }[];
  }[];
  experience: {
    company: string;
    role: string;
    duration: string;
    location: string;
    description: string;
    achievements: string[];
    technologies: string[];
  }[];
  education: {
    institution: string;
    degree: string;
    specialization: string;
    duration: string;
    achievements: string[];
  }[];
  questions?: {
    category: string;
    items: {
      question: string;
      answer: string;
    }[];
  }[];
}
