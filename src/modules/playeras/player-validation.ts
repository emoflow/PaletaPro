
/*
========================================
PALETAPRO
Validacion de perfiles de jugadores
========================================
*/

import type { Player } from "../../types";

// Comprobar que los datos del jugador sean correctos

export function validatePlayer(player: Player): string[] {
  const errors: string[] = [];

  // Nombre obligatorio

  if (!player.firstName.trim()) {
    errors.push("El nombre del jugador es obligatorio.");
  }

  // Apellido obligatorio

  if (!player.lastName.trim()) {
    errors.push("El apellido del jugador es obligatorio.");
  }

  // Ciudad obligatoria

  if (!player.city.trim()) {
    errors.push("La ciudad es obligatoria.");
  }

  // Provincia obligatoria

  if (!player.province.trim()) {
    errors.push("La provincia es obligatoria.");
  }

  // Categoria obligatoria

  if (!player.category) {
    errors.push("El jugador debe tener una categoria.");
  }

  // Modalidad deportiva obligatoria

  if (!player.modalities || player.modalities.length === 0) {
    errors.push("Debe seleccionar al menos una modalidad deportiva.");
  }

  return errors;
}

// Comprobar si el perfil es valido

export function isPlayerValid(player: Player): boolean {
  return validatePlayer(player).length === 0;
}
