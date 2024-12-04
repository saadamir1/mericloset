export default interface ClosetItem {
    id: string; 
    closet: string; // Reference to the Closet ID this item belongs to
    product: string; // Product ID of the item in the closet
    dateAdded: string; 
    customNotes: string; 
    tags: string[]; 
    quantity: number; // Quantity of the item in the closet (default: 1)
  }
  