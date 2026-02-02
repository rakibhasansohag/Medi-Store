# MediStore

**MediStore** is a comprehensive, multi-vendor medicine e-commerce platform designed to bridge the gap between pharmacies and customers. Built with modern web technologies, it offers a seamless shopping experience with dedicated dashboards for Admins, Sellers, and Customers.

## 🚀 Core Features

### 🛍️ Customer Experience
- **Responsive Design**: Mobile-first architecture ensuring a seamless experience across all devices (320px to 4K).
- **Advanced Search & Filtering**: Easy navigation through medicine categories and specific products.
- **Secure Cart & Checkout**: Robust cart management and secure checkout process.
- **Order Tracking**: Real-time order status updates.
- **User Dashboard**: Personalized dashboard for managing orders and profile.

### 🏪 Vendor & Inventory Management
- **Seller Dashboard**: Dedicated portal for sellers to manage medicines, inventory, and view sales stats.
- **Product Management**: Intuitive interface for adding and editing medicine details.
- **Stock Monitoring**: Low stock alerts and inventory tracking.

### 🛡️ Administration & Security
- **Admin Dashboard**: Comprehensive control panel for managing users, categories, and platform-wide settings.
- **Role-Based Access Control (RBAC)**: Secure authentication and authorization for Admin, Seller, and Customer roles.
- **Secure Authentication**: Powered by `better-auth` for robust security.

### 🎨 UI/UX
- **Modern Interface**: Built with **Shadcn UI** and **Tailwind CSS 4**.
- **Dark Mode Support**: Fully integrated dark mode theme.
- **Interactive Animations**: Smooth transitions and effects using **Framer Motion**.
- **Accessibility**: WCAG 2.1 AA compliant design.

## 🛠️ Technology Stack

### Frontend (`medistore-frontend`)
Built with **Next.js 16** and **React 19**.

*   **Framework**: `next`
*   **Styling**: `tailwindcss`, `clsx`, `tailwind-merge`, `class-variance-authority`
*   **UI Components**: `@radix-ui` primitives, `lucide-react` icons
*   **Animations**: `framer-motion`, `react-fast-marquee`, `tw-animate-css`
*   **Forms & Validation**: `@tanstack/react-form`, `zod`
*   **Notifications**: `sonner`
*   **Auth**: `better-auth`

### Backend (`medistore-backend`)
Robust API built with **Express 5** and **TypeScript**.

*   **Runtime**: Node.js
*   **Framework**: `express`
*   **Database ORM**: `prisma` (with PostgreSQL adapter)
*   **Authentication**: `better-auth`, `bcrypt`, `scrypt-js`
*   **Utilities**: `nodemailer` (Email), `morgan` (Logging), `dotenv`
*   **Build Tool**: `tsup`

## 📦 Getting Started

### Prerequisites
- Node.js
- PostgreSQL

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/rakibhasansohag/medistore.git
    cd medistore
    ```

2.  **Setup Backend**
    ```bash
    cd medistore-backend
    npm install
    # Configure .env file with DATABASE_URL and other secrets
    npm run migrate # Run Prisma migrations
    npm run dev     # Start development server
    ```

3.  **Setup Frontend**
    ```bash
    cd medistore-frontend
    npm install
    # Configure .env file
    npm run dev     # Start Next.js development server
    ```

## 👨‍💻 Author

**Rakib Hasan Sohag**
*   **Username**: rakibhasansohag

---
*Built with ❤️ for better healthcare accessibility.*
