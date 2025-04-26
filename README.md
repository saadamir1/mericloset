
# MeriCloset

MeriCloset is a personalized fashion platform that curates products from various fashion brands, enabling users to make smarter shopping decisions. The platform empowers smaller brands and traders to showcase their products, providing them with an opportunity to compete alongside larger, established brands. With personalized product recommendations, smart filtering, and a dedicated portal for brands, MeriCloset serves as a one-stop solution for both shoppers and brands.

---

## Features

- **Personalized Shopping**: Tailored product suggestions based on user preferences, leveraging collaborative and content-based filtering systems.
- **Product Comparison**: Users can compare products from different brands side-by-side to make informed purchase decisions.
- **Brand Portal**: Allows brands to manage and showcase their products directly on the platform.
- **Admin Dashboard**: Track key metrics like customer numbers, brand statistics, and product information.
- **Favorites & Wishlists**: Users can save their favorite products for easy access later.
- **Search and Filtering**: Advanced search and filtering options based on various attributes like size, color, price, material, and sustainability.
- **User Feedback**: Collect and display ratings and feedback on products, helping users make better choices.
- **Discount Alerts**: Notify users about discounts on their saved products.

---

## Tech Stack

- **Frontend**: 
  - **React**: JavaScript library for building user interfaces.
  - **Vite**: Next-generation, fast, and optimized build tool.
  - **TypeScript**: Typed superset of JavaScript for better development experience and type safety.
  - **Chakra UI**: A simple, modular, accessible component library for building React applications.
  - **Framer Motion**: A powerful library for animations in React.
  
- **State Management**:
  - **Zustand**: A fast and lightweight state management library for React.

- **API Handling**:
  - **Axios**: Promise-based HTTP client for the browser and Node.js.
  - **React Query**: For fetching, caching, and syncing server data in React apps.

- **Authentication**:
  - **express-jwt**: A simple, compact library to verify JWTs in your application.
  - **jwt-decode**: A library to decode JWT tokens.

- **File Uploads**:
  - **Multer**: A middleware for handling `multipart/form-data` file uploads.
  - **react-dropzone**: A simple React hook for creating drag-and-drop file upload areas.

- **Form Management**:
  - **React Hook Form**: A performant, flexible, and extensible form library for React.

- **Routing**:
  - **React Router DOM**: Declarative routing for React applications.

- **Notifications**:
  - **React Toastify**: A library to add toast notifications in React apps.

---

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/saadamir1/mericloset.git
   cd mericloset
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the development server**:

   ```bash
   npm run dev
   ```

4. Open the app in your browser at [http://localhost:5173](http://localhost:5173).

---

## Environment Variables

Create a `.env` file in the root of the project with the following variables:

```bash
REACT_APP_API_URL=http://your-api-url
JWT_SECRET=your-jwt-secret-key
```

---

## Folder Structure

```
mericloset/
│
├── src/                     # All source code
│   ├── components/          # Reusable UI components
│   ├── pages/               # Application pages
│   ├── services/            # API services and utilities
│   ├── store/               # Zustand state management
│   ├── styles/              # Global styles
│   └── utils/               # Utility functions
│
├── public/                  # Static assets like images, fonts, etc.
├── package.json             # Project metadata and dependencies
├── vite.config.ts           # Vite configuration
└── README.md                # Project documentation
```

---

## Contributing

We welcome contributions! Please fork the repository, create a new branch, and submit a pull request with your changes.
