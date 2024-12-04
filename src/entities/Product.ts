export default interface Product {
  id: string; // Virtual 'id' from backend
  title: string;
  description?: string;
  brand: string;
  price: number;
  colors: string[];
  sizes: string[];
  images: string[];
  scrapedAt: string; 
  stockStatus?: string; // 'In Stock' or 'Out of Stock'
  category?: string; 
  tags?: string[]; // Used in content-based filtering
  popularityIndex?: number; // Useful for collaborative filtering
}
