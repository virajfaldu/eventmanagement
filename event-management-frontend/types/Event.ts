export interface Event {
    id?: string;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    totalGuests?: number;
    images: File[];
    category: string;
}
