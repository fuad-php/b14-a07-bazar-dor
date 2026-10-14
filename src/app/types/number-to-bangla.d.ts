
declare module "number-to-bangla" {
  const bn: {
    (number: number | string): string;
    engToNumber: (value: string | number) => number;
  };

  export default bn;
}
