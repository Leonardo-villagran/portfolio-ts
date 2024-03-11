export interface MenuItem {
    home: string;
    about: string;
    skills: string;
    education: string;
    experiences: string;
    projects: string;
    contact: string;
    language: string;
    resume: ResumeItem;
  }
  
  interface ResumeItem {
    title: string;
    link: string;
  }