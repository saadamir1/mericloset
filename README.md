# MeriCloset Frontend

A modern React-based frontend for MeriCloset - a personalized fashion platform that curates products from various fashion brands, enabling users to make smarter shopping decisions.

## 🚀 Features

- **Personalized Shopping Experience**: AI-powered product recommendations
- **Product Comparison**: Side-by-side comparison of products from different brands
- **Advanced Search & Filtering**: Filter by size, color, price, material, and sustainability
- **User Closet Management**: Personal wardrobe organization and styling
- **Favorites & Wishlists**: Save and organize favorite products
- **Brand Discovery**: Explore products from various fashion brands
- **Secure Payments**: Integrated Stripe payment processing
- **Responsive Design**: Optimized for desktop and mobile devices

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Library**: Chakra UI + Material-UI
- **State Management**: Zustand
- **Data Fetching**: TanStack React Query (React Query)
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **Authentication**: JWT with express-jwt
- **Animations**: Framer Motion
- **Forms**: React Hook Form
- **File Uploads**: React Dropzone
- **Payments**: Stripe React Components
- **Notifications**: React Toastify

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MeriCloset Backend API running

## 🚀 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/saadamir1/mericloset.git
   cd mericloset/mericloset
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:3000/api/v1
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   VITE_BASE_URL=http://localhost:5173
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   
   Navigate to [http://localhost:5173](http://localhost:5173)

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm start` - Start development server with auto-open

## 📁 Project Structure

```
src/
├── assets/          # Static assets (images, icons)
├── components/      # Reusable UI components
├── data/           # Static data and constants
├── entities/       # TypeScript interfaces and types
├── hooks/          # Custom React hooks
├── pages/          # Application pages/routes
├── services/       # API services and utilities
├── comparisonStore.ts  # Product comparison state
├── store.ts        # Main application state
├── userStore.ts    # User authentication state
├── theme.ts        # Chakra UI theme configuration
├── routes.tsx      # Application routing
└── main.tsx        # Application entry point
```

## 🔧 Key Features Implementation

### State Management
- **Zustand** for lightweight, fast state management
- Separate stores for user authentication, product comparison, and main app state

### Authentication
- JWT-based authentication
- Persistent login state
- Protected routes

### Product Features
- Advanced filtering and search
- Product comparison functionality
- Personalized recommendations
- Favorites and wishlist management

### Payment Integration
- Stripe payment processing
- Secure checkout flow
- Order management

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach
- **Dark/Light Mode**: Theme switching capability
- **Smooth Animations**: Framer Motion integration
- **Accessible Components**: Chakra UI accessibility features
- **Loading States**: Skeleton loaders and spinners
- **Toast Notifications**: User feedback system

## 🔗 API Integration

The frontend communicates with the MeriCloset backend API for:
- User authentication and management
- Product catalog and search
- Order processing
- Recommendation engine
- Brand management
- Admin dashboard data

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
The project includes `vercel.json` configuration for easy Vercel deployment.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is part of a BSc Computer Science Final Year Project.

## 👨‍💻 Author

**Saad Amir** - BSc Computer Science Student

---

**Note**: This is a Final Year Project (FYP) for BSc Computer Science degree, showcasing modern web development practices and technologies in the fashion e-commerce domain.