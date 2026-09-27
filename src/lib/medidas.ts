// "30 x 10 cm cada" -> "11.8 x 3.9 in each": foreign collectors read inches (seen on
// Marcius Galan and Tauba Auerbach sites).
export function polegadas(cm: string): string {
  const nums = [...cm.matchAll(/\d+(?:,\d+)?/g)].map((m) => parseFloat(m[0].replace(",", ".")));
  const inches = nums.map((n) => (n / 2.54).toFixed(1)).join(" x ");
  return `${inches} in${/cada/.test(cm) ? " each" : ""}`;
}
