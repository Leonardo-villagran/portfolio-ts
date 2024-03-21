export interface ChronoData {
    title: string;
    content: ChronoItem[];
    mode: string;
}

interface ChronoItem {
    title: string;
    cardTitle: string;
    cardSubtitle: string;
    icon: string;
}
