
/*
========================================
PALETAPRO
Herramientas del modulo de jugadores
========================================
*/

import type { Player } from "../../types";

// Obtener nombre completo del jugador

export function getPlayerFullName(player: Player): string {
  return `${player.firstName} ${player.lastName}`.trim();
}

// Obtener iniciales del jugador

export function getPlayerInitials(player: Player): string {
  const firstInitial = player.firstName.charAt(0);
  const lastInitial = player.lastName.charAt(0);

  return `${firstInitial}${lastInitial}`.toUpperCase();
}

// Comprobar si un jugador esta activo

export function isPlayerActive(player: Player): boolean {
  return player.active;
}

// Obtener solamente los jugadores activos

export function getActivePlayers(players: Player[]): Player[] {
  return players.filter((player) => player.active);
}
