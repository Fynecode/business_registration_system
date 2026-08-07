# Business Registration System

A modern, scalable web platform designed for business consultants to manage client business registration requests, document collection, and internal review workflows. Built with clean architecture principles and enterprise-grade patterns.

## 🎯 Project Overview

**Business Registration System** streamlines the entire business registration workflow—from client request submission to consultant review and approval. It demonstrates real-world business logic, secure authentication, document management, and role-based access control.

This project is a perfect showcase for junior developers learning full-stack development with modern frameworks and clean code principles.

### Key Features

- ✅ **Multi-Role Authentication** - Secure login/signup with role-based authorization (Client, Staff, Admin)
- 📋 **Business Registration Requests** - Clients can submit structured registration requests
- 📤 **Document Management** - Upload and manage supporting documents via Cloudinary
- 👥 **Client Profile Management** - Maintain and update business/personal profiles
- 👨‍💼 **Staff Dashboard** - Review, assign, and track registration requests
- 🔍 **Request Tracking** - View complete history and status of all submissions
- 🔐 **Row-Level Security** - Database-level access control via Supabase RLS
- 💾 **Offline Caching** - View profiles even without internet connection
- ⚡ **Error Handling** - Global error handling with retry logic
- 🎨 **Design System** - Consistent, professional UI components

## 🛠️ Tech Stack

### Frontend
- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe development
- **Pinia** - State management (Vue's recommended store)
- **Vue Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Vite** - Lightning-fast build tool
- **Lucide Icons** - Beautiful, scalable icons

### Backend & Services
- **Supabase** - PostgreSQL + Authentication + Real-time
- **PostgreSQL** - Powerful relational database
- **Cloudinary** - Cloud-based image/document storage
- **Row-Level Security (RLS)** - Database-level security policies

### Testing & Quality
- **Vitest** - Fast unit testing framework
- **Playwright** - End-to-end testing
- **TypeScript** - Static type checking
- **Prettier** - Code formatting
- **Oxlint** - Fast linting

### Architecture
- **Domain-Driven Design (DDD-Lite)** - Organized code structure
- **Repository Pattern** - Data access abstraction
- **Use Cases** - Business logic organization
- **Clean Architecture** - Separation of concerns

## 📦 Prerequisites

- **Node.js** (v20.19.0 or >=22.12.0)
- **npm** or **pnpm** (package manager)
- **Supabase Account** (free tier available)
- **Cloudinary Account** (for image/document storage)

## 🚀 Getting Started

### 1. Clone & Install

```bash
# Clone the repository
git clone https://github.com/Fynecode/business_registration_system.git
cd business_registration_system

# Install dependencies
npm install
# or
pnpm install
```

### 2. Environment Configuration

Create a `.env.local` file in the project root:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Cloudinary Configuration
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset

# API Configuration
VITE_API_URL=http://localhost:5173
```

**Getting these values:**
- **Supabase**: Create free account at [supabase.com](https://supabase.com)
- **Cloudinary**: Create free account at [cloudinary.com](https://cloudinary.com)

### 3. Database Setup

```bash
# Initialize Supabase (if using local)
supabase init

# Seed initial data (if available)
npm run seed
```

### 4. Development Server

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

## 📚 Available Commands

```bash
# Development
npm run dev              # Start dev server with hot reload

# Building
npm run build            # Type-check & build for production
npm run build-only       # Build without type checking
npm run preview          # Preview production build locally

# Testing
npm run test:unit        # Run unit tests with Vitest

# Code Quality
npm run type-check       # Check TypeScript types
npm run format           # Format code with Prettier
```

## 📁 Project Structure

```
src/
├── components/           # Reusable Vue components
│   ├── common/          # Generic UI components
│   ├── forms/           # Form components
│   └── layouts/         # Page layouts
├── pages/               # Page components (route-based)
├── router/              # Vue Router configuration
├── stores/              # Pinia store modules
│   ├── auth.ts          # Authentication state
│   ├── requests.ts      # Business request state
│   └── ui.ts            # UI state
├── services/            # Business logic & API calls
│   ├── authService.ts   # Authentication
│   ├── requestService.ts # Request management
│   └── supabaseClient.ts # Supabase setup
├── types/               # TypeScript interfaces
├── utils/               # Helper functions
└── App.vue              # Root component
```

## 🏗️ Architecture Explanation

This project follows **Clean Architecture** with DDD principles:

```
Presentation Layer (Components/Pages)
       ↓
Application Layer (Services/Use Cases)
       ↓
Domain Layer (Business Logic/Types)
       ↓
Infrastructure Layer (Supabase/Cloudinary)
```

### Key Patterns

- **Repository Pattern**: Abstract data access (Supabase queries)
- **Use Cases**: Isolated business logic functions
- **Services**: Combine repositories & use cases
- **Stores (Pinia)**: Centralized state management
- **Composition API**: Reactive, reusable logic

## 🔐 Authentication & Security

- **Supabase Auth**: Built-in user management with email/password
- **Role-Based Access**: Three roles (Client, Staff, Admin) with different permissions
- **Row-Level Security (RLS)**: Database policies enforce access control
- **Session Persistence**: Auto-login on page reload (with Pinia plugin)
- **Secure Token Storage**: Tokens managed by Supabase client

## 📊 Current Progress

**v0.1.0** - MVP Phase

| Feature | Status |
|---------|--------|
| Authentication | ✅ Complete |
| Business Requests | ✅ Complete |
| Error Handling | ✅ Complete |
| Design System | ✅ Complete |
| Staff Dashboard | 🚧 In Progress |
| Email Notifications | 🚧 Planned |
| Change Password | 🚧 Planned |
| Change Email | 🚧 Planned |

## 🧪 Testing

```bash
# Unit tests with Vitest
npm run test:unit

# Watch mode for development
npm run test:unit -- --watch

# E2E tests with Playwright
npm run test:e2e
```

## 🌐 Deployment

### Deploy to Vercel (Recommended for Frontend)

```bash
npm run build
# Push to GitHub, connect to Vercel
```

### Deploy to Netlify

```bash
# Connect your GitHub repo to Netlify
# Set build command: npm run build
# Set publish directory: dist
```

### Docker (if backend included)

```bash
docker build -t brs .
docker run -p 5173:5173 brs
```

## 🎓 Learning Outcomes

This project demonstrates:
- ✨ Full-stack Vue development with TypeScript
- ✨ State management with Pinia
- ✨ Backend integration with Supabase
- ✨ Real-time features and row-level security
- ✨ Clean Architecture patterns
- ✨ File upload & cloud storage integration
- ✨ Responsive UI design with Tailwind
- ✨ Testing strategies (unit & E2E)
- ✨ Production-ready code organization

## 🚀 Future Enhancements

- [ ] Email notifications for status changes
- [ ] PDF document generation & download
- [ ] Advanced filtering and search
- [ ] Admin dashboard & analytics
- [ ] Export data to Excel/CSV
- [ ] Mobile app (React Native/Flutter)
- [ ] API documentation
- [ ] Performance monitoring

## 🤝 Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests.

## 📄 License

MIT License - feel free to use this for learning and projects.

## 📞 Support

For questions or issues, please open a GitHub issue or contact the maintainer.

---

**Built with ❤️ using Vue 3 + TypeScript + Supabase**  
**Last Updated:** 2025
