export default interface Product {
  _id: string;
  title: string;
  description?: string;
  brand: string;
  price: number;
  colors: string[];
  sizes: string[];
  images: string[];
  type: string;
  scrapedAt: string;
}
