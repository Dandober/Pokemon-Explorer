import type { TypeDamageRelations } from '../types/pokemon';

export interface TypeEffectiveness {
  type: string;
  multiplier: number;
}

// Combines a Pokémon's type(s) into one weakness/resistance number per type
function combineDefensiveMultipliers(relations: TypeDamageRelations[]): Map<string, number> {
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

  return multipliers;
}

export function calculateWeaknesses(relations: TypeDamageRelations[]): TypeEffectiveness[] {
  return [...combineDefensiveMultipliers(relations).entries()]
    .map(([type, multiplier]) => ({ type, multiplier }))
    .filter(entry => entry.multiplier > 1)
    .sort((a, b) => b.multiplier - a.multiplier);
}

export function calculateResistances(relations: TypeDamageRelations[]): TypeEffectiveness[] {
  return [...combineDefensiveMultipliers(relations).entries()]
    .map(([type, multiplier]) => ({ type, multiplier }))
    .filter(entry => entry.multiplier < 1)
    .sort((a, b) => a.multiplier - b.multiplier);
}

// A Pokémon attacks with one type at a time, so this just combines both
// types' strengths into a single list instead of multiplying them together
export function calculateStrengths(relations: TypeDamageRelations[]): string[] {
  const strong = new Set<string>();
  for (const relation of relations) {
    for (const { name } of relation.double_damage_to) {
      strong.add(name);
    }
  }
  return [...strong].sort();
}
