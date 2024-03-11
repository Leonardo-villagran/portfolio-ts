interface SkillItem {
    icon: string;
    title: string;
}

interface SkillCategory {
    title: string;
    items: SkillItem[];
}

export interface TechSkill {
    title: string;
    intro: string;
    skills: SkillCategory[];
}