export default interface User {
    id: string; 
    firstName: string; 
    lastName: string; 
    username: string; 
    email: string;
    profile: string; // Profile ID linked to this user
    role: 'user' | 'admin' | 'moderator'; 
    gender?: 'male' | 'female' | 'non-binary' | 'other'; 
    age?: number;
    createdAt: string;
    updatedAt: string;
  }
  