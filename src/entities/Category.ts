export default interface Category {
  id: string | undefined;
  _id: string;
  name: string;
  parentCategory?: Category | null; // Optional for root categories
  subcategories: Category[];        // Should be an array
}
