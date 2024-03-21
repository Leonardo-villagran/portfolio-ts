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

export interface CardItems {
    card: string;
    cardBody: string;
    cardLink: string;
    cardFooter: string;
}

export interface CardProjectsProps {
    projectsData: ProjectsData;
    cardItems: CardItems;
}

