export default interface Product {
  _id: string;
  name: string;
  description?: string;
  brand: string;
  price?: number;
  categories: string[];
  sizesAvailable: string[];
  colorsAvailable: string[];
  images: string[];
  popularityIndex?: number;
  tags?: string[];
  isEthical?: boolean;
  ratings?: number;
  dateCreated: string;
  scrapedAt: string;
  countInStock?: number;

}
