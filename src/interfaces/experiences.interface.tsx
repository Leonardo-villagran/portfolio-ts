export interface EducationData {
    title: string;
    content: EducationItem[];
}

export interface EducationItem {
    title: string;
    cardTitle: string;
    cardSubtitle: string;
    icon: string;
    cardDetailedText?: string[];
}
