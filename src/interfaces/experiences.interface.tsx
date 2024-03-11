export interface EducationData {
    title: string;
    content: EducationItem[];
}

interface EducationItem {
    title: string;
    cardTitle: string;
    cardSubtitle: string;
    icon: Icon;
}

interface Icon {
    src: string;
}
