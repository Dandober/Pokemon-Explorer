export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function formatPokemonId(id: number | string): string {
  const num = typeof id === 'number' ? id : Number(id);
  if (Number.isNaN(num)) return String(id);
  return `#${String(num).padStart(3, '0')}`;
}

// PokeAPI stores height in decimetres and weight in hectograms.
export function decimetresToMetres(height: number): string {
  return (height / 10).toFixed(1);
}

export function hectogramsToKg(weight: number): string {
  return (weight / 10).toFixed(1);
}
