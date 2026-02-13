export type ScrapType = "paper" | "plastic" | "metal" | "electronics" | "mixed";

export type PickupRequestPayload = {
  name: string;
  phone: string;
  address: string;
  scrap_type: ScrapType;
  estimated_weight: string | number;
  notes?: string;
};
