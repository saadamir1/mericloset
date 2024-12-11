export default interface Category {
  _id: string;
  name: string;
  parentCategory?: Category | null; // Optional for root categories
  subcategories: Category[];        // Should be an array
}
