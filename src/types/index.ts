
/*
========================================
PALETAPRO
Sistema de tipos deportivos
Pelota Paleta Argentina
========================================
*/

// MODALIDADES DEPORTIVAS

export type SportModality =
  | "paleta_goma"
  | "paleta_cuero"
  | "trinquete"
  | "fronton"
  | "otra";

// CATEGORIAS

export type PlayerCategory =
  | "primera"
  | "segunda"
  | "tercera"
  | "cuarta"
  | "quinta"
  | "juvenil"
  | "infantil"
  | "veteranos";

// PERFIL DE JUGADOR

export interface Player {
  id: string;
  firstName: string;
  lastName: string;
  nickname?: string;
  clubId?: string;
  category: PlayerCategory;
  modalities: SportModality[];
  city: string;
  province: string;
  active: boolean;
  createdAt: string;
}

// CLUB DEPORTIVO

export interface Club {
  id: string;
  name: string;
  city: string;
  province: string;
  address?: string;
  contactEmail?: string;
  active: boolean;
  createdAt: string;
}

// FEDERACION

export interface Federation {
  id: string;
  name: string;
  province: string;
  country: string;
  website?: string;
  active: boolean;
}

// TORNEO

export interface Tournament {
  id: string;
  name: string;
  modality: SportModality;
  category: PlayerCategory;
  clubId?: string;
  federationId?: string;
  startDate: string;
  endDate?: string;
  city: string;
  province: string;
  status: "planned" | "active" | "finished";
  createdAt: string;
}

// PARTICIPANTES DE UN PARTIDO

export interface MatchSide {
  playerIds: string[];
  points: number;
}

// PARTIDO

export interface Match {
  id: string;
  tournamentId: string;
  modality: SportModality;
  sideA: MatchSide;
  sideB: MatchSide;
  scheduledAt: string;
  status: "scheduled" | "live" | "finished";
  winnerSide?: "A" | "B";
  validated: boolean;
  createdAt: string;
}

// EVENTOS DEL PARTIDO

export interface MatchEvent {
  id: string;
  matchId: string;
  eventType: "point" | "error" | "other";
  playerId?: string;
  side?: "A" | "B";
  description?: string;
  createdAt: string;
}

// RESULTADO DEL RANKING

export interface RankingEntry {
  playerId: string;
  tournamentId: string;
  points: number;
  position: number;
  wins: number;
  losses: number;
}
