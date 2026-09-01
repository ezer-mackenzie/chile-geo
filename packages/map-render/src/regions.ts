export const CHILE_REGIONS = [
  { id: 'CL-AI', name: 'Aysén Region' },
  { id: 'CL-AN', name: 'Antofagasta Region' },
  { id: 'CL-AP', name: 'Arica and Parinacota Region' },
  { id: 'CL-AR', name: 'Araucanía Region' },
  { id: 'CL-AT', name: 'Atacama Region' },
  { id: 'CL-BI', name: 'Biobío Region' },
  { id: 'CL-CO', name: 'Coquimbo Region' },
  { id: 'CL-LI', name: "O'Higgins Region" },
  { id: 'CL-LL', name: 'Los Lagos Region' },
  { id: 'CL-LR', name: 'Los Ríos Region' },
  { id: 'CL-MA', name: 'Magallanes and Chilean Antarctica Region' },
  { id: 'CL-ML', name: 'Maule Region' },
  { id: 'CL-NB', name: 'Ñuble Region' },
  { id: 'CL-RM', name: 'Santiago Metropolitan Region' },
  { id: 'CL-TA', name: 'Tarapacá Region' },
  { id: 'CL-VS', name: 'Valparaíso Region' },
] as const;

export type ChileRegion = (typeof CHILE_REGIONS)[number];
export type ChileRegionId = ChileRegion['id'];
export type ChileRegionName = ChileRegion['name'];

export function isChileRegionId(value: string): value is ChileRegionId {
  return CHILE_REGIONS.some((region) => region.id === value);
}
