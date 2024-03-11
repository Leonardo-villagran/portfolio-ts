interface Project {
    image: string;
    title: string;
    bodyText: string[];
    links: Link[];
    tags: string[];
}

interface Link {
    text: string;
    href: string;
}

export interface ProjectsData {
    title: string;
    projects: Project[];
}