import type { TypeDamageRelations } from '../types/pokemon';

export interface TypeEffectiveness {
  type: string;
  multiplier: number;
}

// Combines a Pokémon's type(s) into one weakness number per type
export function calculateWeaknesses(relations: TypeDamageRelations[]): TypeEffectiveness[] {
  const multipliers = new Map<string, number>();

  for (const relation of relations) {
    for (const { name } of relation.double_damage_from) {
      multipliers.set(name, (multipliers.get(name) ?? 1) * 2);
    }
    for (const { name } of relation.half_damage_from) {
      multipliers.set(name, (multipliers.get(name) ?? 1) * 0.5);
    }
    for (const { name } of relation.no_damage_from) {
      multipliers.set(name, 0);
    }
  }

  return [...multipliers.entries()]
    .map(([type, multiplier]) => ({ type, multiplier }))
    .filter(entry => entry.multiplier > 1)
    .sort((a, b) => b.multiplier - a.multiplier);
}
