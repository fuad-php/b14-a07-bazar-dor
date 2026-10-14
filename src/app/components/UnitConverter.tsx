
interface IUnitTypes {
  kg: string;
  kilogram: string;
  gram: string;
  g: string;
  litre: string;
  liter: string;
  ml: string;
  millilitre: string;
  meter: string;
  km: string;
  piece: string;
  pcs: string;
  dozen: string;
}

const unitTranslations: IUnitTypes = {
  kg: "কেজি",
  kilogram: "কিলোগ্রাম",
  gram: "গ্রাম",
  g: "গ্রাম",
  litre: "লিটার",
  liter: "লিটার",
  ml: "মিলিলিটার",
  millilitre: "মিলিলিটার",
  meter: "মিটার",
  km: "কিলোমিটার",
  piece: "টি",
  pcs: "টি",
  dozen: "ডজন",
};

export function translateUnit(unit: string): string {
  const normalizedUnit = unit.trim().toLowerCase();

  if (normalizedUnit in unitTranslations) {
    return unitTranslations[normalizedUnit as keyof IUnitTypes];
  }

  return unit;
}
