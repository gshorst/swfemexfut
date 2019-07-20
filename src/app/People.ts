export interface Planets {
  count: number;
  next: string;
  previous: string;
  results: Planet[];
}

export interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: Resident[];
  films: Film[];
  created: string;
  edited: string;
  url: string;
}

export interface Resident {
  resident: string;
}

export interface Film {
  film: string;
}
export interface Specie {
  specie: string;
}
export interface Vehicle {
  vehicle: string;
}
export interface Starship {
  starship: string;
}
export interface Person {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: Film[];
  species: Specie[];
  vehicles: Vehicle[];
  starships: Starship[];
  created: string;
  edited: string;
  url: string;
}
export interface People {
  count: number;
  next: string;
  previous: string;
  results: Person[];
}