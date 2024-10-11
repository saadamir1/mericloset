export default interface Category {
  id: string;
  name: string;
  parentCategory: Category;
  subcategories: Category;
}
