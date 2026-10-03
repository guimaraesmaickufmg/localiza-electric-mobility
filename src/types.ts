export type NavTab = 
  | 'inicio' 
  | 'carros-e-planos' 
  | 'comparador' 
  | 'mobilidade-eletrica' 
  | 'voucher-exclusivo' 
  | 'planejador-com-ia';

export type CarCategory = 'all' | 'electric' | 'hybrid' | 'suv' | 'hatch' | 'sedan';

export interface CarModel {
  id: string;
  name: string;
  brand: string;
  version: string;
  category: 'electric' | 'hybrid' | 'suv' | 'hatch' | 'sedan';
  categoryLabel: string;
  isElectric: boolean;
  isHybrid?: boolean;
  tag?: string;
  tagType?: 'electric' | 'badge' | 'highlight';
  imageUrl: string;
  fallbackColor: string;
  monthlyBasePrice: number; // For 36 months / 1000 km
  prices: {
    12: number;
    24: number;
    36: number;
    48: number;
  };
  specs: {
    autonomyOrRange: string;
    acceleration: string;
    power: string;
    chargingOrFuel: string;
    trunkCapacity: string;
    consumption: string;
    batteryOrEngine: string;
  };
  inmetroAutonomyKm?: number;
  costPerKm: number;
  description: string;
  features: string[];
}

export interface RouteStop {
  id: string;
  name: string;
  location: string;
  operator: string;
  powerKw: number;
  freePlugs: number;
  chargeTimeMin: number;
  arrivalBatteryPct: number;
  departureBatteryPct: number;
  recommended: boolean;
}

export interface RoutePlan {
  origin: string;
  destination: string;
  distanceKm: number;
  estimatedTime: string;
  chargingTime: string;
  arrivalBatteryPct: number;
  co2SavedKg: number;
  stops: RouteStop[];
  regenerativeDescentsKm: number;
  regeneratedKwh: number;
  explanation: string;
  allowanceImpact: {
    contractKm: number;
    usedKm: number;
    tripKm: number;
    remainingKm: number;
    status: string;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  initials: string;
  rating: number;
  quote: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  badge?: string;
  tip?: string;
}
