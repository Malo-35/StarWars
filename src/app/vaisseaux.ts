export interface Vaisseaux {
    cquoi: string;
    name: string;
    model: string;
    manufacturer: string;
    cost_in_credits?: number;
    length: number;
    max_atmosphering_speed: string;
    crew: number;
    cargo_capacity: number;
    consumables: string;
    hyperdrive_rating: number;
    MGLT: number;
    starship_class: string;
    pilots?: string[];
    films?: string[];
    created: string;
    edited: string;
    url: string;
}
