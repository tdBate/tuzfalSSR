export interface TuzfalEntry {
    id: number;
    priority: number;
    mac: string;
    enabled: boolean;
}

export interface TuzfalDto {
    priority: string;
    mac: string;
    enabled: string;
}