export default interface Profile {
    measurements: {
      height?: number; 
      weight?: number; 
      chest?: number; 
      waist?: number; 
    };
    preferences: {
      style?: string; // User's preferred style
      sustainability?: boolean; 
      size?: string; // Preferred size
      color?: string; // Preferred color
      favoriteBrands?: string[]; // Array of Brand IDs the user prefers
      fitPreference?: string; // Fit preference
    };
  }
  