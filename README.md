# JOU Finance

![JOU Finance](https://img.shields.io/badge/JOU-Finance-3b82f6?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJDNi40OCA2LjQ4IDIgMTIgMiAxN3M0LjQ4IDUgMTAgNXMxMC00LjUyIDEwLTEwUzE3LjUyIDIgMTIgMnptMCAxOGMtNC40MiAwLTgtMy41OC04LThzMy41OC04IDgtOCA4IDMuNTggOCA4LTMuNTggOCA4IDh6IiBmaWxsPSIjM2I4MmY2Ii8+Cjwvc3ZnPgo=)

**A comprehensive personal finance management platform** built with modern React, TypeScript, and cutting-edge web technologies. Take control of your financial future with intelligent transaction tracking, multi-wallet management, investment portfolio monitoring, savings goal planning, and AI-powered financial insights.

**Created by:** Israel Olasehinde

[![Live Demo](https://img.shields.io/badge/Live%20Demo-JOU%20Finance-3b82f6?style=for-the-badge&logo=vercel)](https://jou-finance.vercel.app/)

![JOU Finance](https://img.shields.io/badge/JOU-Finance-3b82f6?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJDNi40OCA2LjQ4IDIgMTIgMiAxN3M0LjQ4IDUgMTAgNXMxMC00LjUyIDEwLTEwUzE3LjUyIDIgMTIgMnptMCAxOGMtNC40MiAwLTgtMy41OC04LThzMy41OC04IDgtOCA4IDMuNTggOCA4LTMuNTggOCA4IDh6IiBmaWxsPSIjM2I4MmY2Ii8+Cjwvc3ZnPgo=)

## 🌟 Features

### 💰 **Transaction Management**
- **Add Transactions**: Record income and expenses with detailed categorization
- **Transaction History**: View paginated transaction history with filtering
- **Real-time Updates**: Instant balance updates across all components
- **Transfer Support**: Move funds between wallets (via dedicated transfer modal)

### 🏦 **Multi-Wallet Support**
- **Multiple Wallets**: Create and manage different financial accounts
- **Balance Tracking**: Real-time balance updates for all wallets
- **Wallet Transfers**: Secure fund transfers between accounts
- **Currency Support**: Multi-currency display with exchange rates

### 📊 **Analytics & Insights**
- **Interactive Charts**: Line charts for spending trends, pie charts for category breakdown
- **Financial Insights**: AI-powered spending pattern analysis
- **Portfolio Analytics**: Investment performance tracking
- **Export Capabilities**: CSV and PDF export functionality

### 🎯 **Savings Goals**
- **Goal Setting**: Create and track savings objectives
- **Progress Tracking**: Visual progress indicators
- **Goal Completion**: Automatic completion detection
- **Flexible Targets**: Customizable target amounts and deadlines

### 📈 **Investment Tracking**
- **Portfolio Management**: Track stocks, crypto, mutual funds, and other assets
- **Performance Monitoring**: Real-time value updates and return calculations
- **Asset Categories**: Organized investment categorization
- **Historical Tracking**: Purchase date and performance history

### 🔔 **Notifications System**
- **Real-time Notifications**: System alerts for important financial events
- **Unread Tracking**: Badge indicators for unread notifications
- **Mark as Read**: Individual and bulk notification management
- **Persistent Storage**: Notification state maintained across sessions

### ⚙️ **Settings & Preferences**
- **Currency Selection**: Choose preferred currency (USD, NGN, EUR, GBP, CAD)
- **Theme Toggle**: Light/dark mode with system preference detection
- **Persistent Settings**: All preferences saved to localStorage
- **Responsive Design**: Optimized for all device sizes

## 📸 Screenshots

![JOU Finance App Screenshot](images/jOU-finance-screenshot.png)

## 🧪 Testing

### **Test Status**
[![CI](https://github.com/JOULifestyle/JOUFinance/actions/workflows/ci.yml/badge.svg)](https://github.com/JOULifestyle/JOUFinance/actions)
![Test Status](https://img.shields.io/badge/Tests-Passed-28a745?style=for-the-badge&logo=check-circle)
![E2E Tests](https://img.shields.io/badge/E2E-16%20Tests-28a745?style=for-the-badge&logo=playwright)
![Accessibility](https://img.shields.io/badge/Axe--Core-Implemented-9c42f5?style=for-the-badge&logo=accessibility)

### **Test Coverage**
- **End-to-End Tests**: 16 comprehensive Playwright tests covering all major features
- **Component Testing**: Transaction forms, wallet transfers, authentication flows
- **Accessibility Testing**: WCAG compliance with axe-core automated checks
- **Integration Testing**: API mocking with MSW for reliable test environments

### **Accessibility Compliance**
✅ **axe-core automated testing** implemented and running
✅ **All accessibility tests passing** - WCAG 2 AA compliant
- **Color Contrast**: Fixed - All text meets 4.5:1 contrast ratio requirement
- **Heading Hierarchy**: Fixed - Proper H1→H2→H3 semantic structure
- **Keyboard Navigation**: Fixed - Scrollable regions have keyboard accessibility
- **Button Contrast**: Fixed - All buttons meet contrast requirements

### **Running Tests**
```bash
# Run unit/component tests
npm run test

# Run unit tests with UI
npm run test:ui

# Run unit tests once (CI mode)
npm run test:run

# Run unit tests with coverage
npm run test:coverage

# Run E2E tests
npm run e2e

# Run E2E tests with UI
npm run e2e:ui

# Generate E2E test report
npx playwright show-report
```

## 🛠️ Tech Stack

### **Frontend Framework**
- **React 19.1.1** - Modern React with concurrent features
- **TypeScript 5.9.3** - Type-safe JavaScript development
- **Vite 7.1.7** - Fast build tool and development server

### **Styling & UI**
- **Tailwind CSS 4.1.17** - Utility-first CSS framework
- **Headless UI 2.2.9** - Unstyled, accessible UI components
- **Heroicons 2.2.0** - Beautiful hand-crafted SVG icons
- **Framer Motion 12.23.24** - Production-ready motion library

### **State Management**
- **Zustand 5.0.8** - Small, fast state management solution
- **TanStack Query 5.90.7** - Powerful data synchronization for React

### **Form Handling**
- **React Hook Form 7.66.0** - Performant forms with easy validation
- **Zod 4.1.12** - TypeScript-first schema validation
- **Hookform Resolvers 5.2.2** - Validation resolvers for React Hook Form

### **HTTP & API**
- **Axios 1.13.2** - Promise-based HTTP client
- **MSW 2.12.0** - API mocking for development and testing

### **Charts & Data Visualization**
- **Recharts 3.3.0** - Composable charting library built on React components

### **Authentication**
- **Firebase 12.5.0** - Backend-as-a-Service for authentication

### **Utilities**
- **Date-fns 4.1.0** - Modern JavaScript date utility library
- **File Saver 2.0.5** - Client-side file saving
- **jsPDF 3.0.3** - Client-side PDF generation
- **PapaParse 5.5.3** - CSV parsing and writing
- **CMDk 1.1.1** - Command palette component

### **Development Tools**
- **ESLint 9.36.0** - Code linting and formatting
- **TypeScript ESLint** - TypeScript-specific linting rules
- **PostCSS 10.4.22** - CSS processing tool
- **Autoprefixer 10.4.22** - CSS vendor prefixing

## 📁 Project Structure

```
jou-finance/
├── public/
│   ├── mockServiceWorker.js
├── src/
│   ├── api/
│   │   ├── client.ts
│   │   ├── transactions.ts
│   │   └── auth.ts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── DashboardLayout.tsx
│   │   │   ├── SideNav.tsx
│   │   │   └── TopNav.tsx
│   │   ├── charts/
│   │   │   ├── LineChartCard.tsx
│   │   │   ├── PieChartCard.tsx
│   │   │   └── ChartCard.tsx
│   │   ├── BalanceCard.tsx
│   │   ├── TransactionForm.tsx
│   │   ├── TransactionRow.tsx
│   │   ├── NotificationDropdown.tsx
│   │   ├── ProfileDropdown.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── Toast.tsx
│   ├── features/
│   │   ├── auth/
│   │   │   ├── AuthProvider.tsx
│   │   │   ├── firebase.ts
│   │   │   ├── RequireAuth.tsx
│   │   │   └── RequireRole.tsx
│   │   └── utils/
│   │       ├── chartUtils.ts
│   │       └── exportUtils.ts
│   ├── hooks/
│   │   ├── useTransactions.ts
│   │   └── useDarkMode.ts
│   ├── mocks/
│   │   ├── handlers.ts
│   │   └── browser.ts
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── SignIn.tsx
│   │   │   ├── SignUp.tsx
│   │   │   └── ForgotPassword.tsx
│   │   ├── dashboard/
│   │   │   └── DashboardHome.tsx
│   │   ├── transactions/
│   │   │   └── Transactions.tsx
│   │   ├── wallets/
│   │   │   └── Wallets.tsx
│   │   ├── investments/
│   │   │   └── Investments.tsx
│   │   ├── savings-goals/
│   │   │   └── SavingsGoals.tsx
│   │   ├── charts/
│   │   │   └── Charts.tsx
│   │   └── settings/
│   │       └── Settings.tsx
│   ├── stores/
│   │   ├── authStore.ts
│   │   ├── uiStore.ts
│   │   ├── toastStore.ts
│   │   └── notificationStore.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── eslint.config.js
├── index.html
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🏗️ Architecture & Components

### **State Management**

#### **Zustand Stores**
- **`authStore`** - User authentication state, session management
- **`uiStore`** - UI preferences (theme, currency, command palette)
- **`toastStore`** - Toast notification queue and display
- **`notificationStore`** - Notification data and read status

#### **TanStack Query**
- **Server State Management** - API data caching and synchronization
- **Optimistic Updates** - Immediate UI feedback for mutations
- **Background Refetching** - Automatic data freshness
- **Error Handling** - Robust error states and retry logic

### **API & Data Layer**

#### **MSW Mock API**
- **RESTful Endpoints** - Complete API simulation for development
- **CRUD Operations** - Full create, read, update, delete functionality
- **Real-time Simulation** - Request delays and error scenarios
- **Data Persistence** - In-memory database with state management

#### **Axios Client**
- **Interceptors** - Request/response middleware for auth and error handling
- **Base Configuration** - Centralized API client setup
- **Error Handling** - Comprehensive error response management

### **Authentication Flow**

#### **Firebase Authentication**
- **Email/Password Auth** - Traditional authentication method
- **Session Persistence** - Automatic session restoration
- **Route Protection** - Auth-required route guards
- **User Context** - Global user state management

### **Form Management**

#### **React Hook Form + Zod**
- **Type-safe Forms** - Runtime validation with TypeScript integration
- **Performance Optimized** - Minimal re-renders and efficient updates
- **Accessible** - Built-in ARIA attributes and keyboard navigation
- **Extensible** - Custom validation rules and error messages

### **Styling System**

#### **Tailwind CSS v4**
- **CSS-first Dark Mode** - Custom variant for theme switching
- **Utility Classes** - Consistent design system
- **Responsive Design** - Mobile-first breakpoint system
- **Custom Properties** - Dynamic theme variables

## 🚀 Installation & Setup

### **Installation Steps**

1. **Clone the repository**
   ```bash
   git clone https://github.com/JOULifestyle/JOUFinance.git
   cd jou-finance
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   # Edit .env with your Firebase configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

### **Available Scripts**

```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build
npm run lint        # Run ESLint
npm run test        # Run unit/component tests
npm run test:ui     # Run unit tests with UI
npm run test:run    # Run unit tests once (CI mode)
npm run test:coverage # Run unit tests with coverage
npm run e2e         # Run E2E tests with Playwright
npm run e2e:ui      # Run E2E tests with UI
npm run e2e:install # Install Playwright browsers
```

## 📖 Usage Guide

### **Getting Started**
1. **Sign Up/Login** - Create account or sign in with existing credentials
2. **Set Preferences** - Choose currency and theme in settings
3. **Add Wallets** - Create financial accounts to track
4. **Record Transactions** - Start adding income and expenses
5. **Set Goals** - Create savings objectives
6. **Track Investments** - Monitor portfolio performance

### **Key Workflows**

#### **Transaction Management**
- Click "Add Transaction" from dashboard or transactions page
- Select transaction type (Income/Expense)
- Choose category and wallet
- Enter amount and description
- Submit to update balances instantly

#### **Wallet Transfers**
- Navigate to Wallets page
- Click transfer button on wallet card
- Select source and destination wallets
- Enter transfer amount
- Confirm to move funds between accounts

#### **Investment Tracking**
- Go to Investments page
- Add new investment with asset details
- Track performance and returns
- View portfolio analytics

#### **Savings Goals**
- Access Savings Goals page
- Create new goal with target amount
- Monitor progress visually
- Mark goals as completed

### **Settings & Preferences**
- **Currency**: Choose from USD, NGN, EUR, GBP, CAD
- **Theme**: Light, dark, or system preference
- **Notifications**: Enable/disable system notifications

## 🔧 Advanced Configuration

### **Environment Variables**
```env
apiKey:
  authDomain:
  projectId:
  storageBucket:
  messagingSenderId:
  appId:
  measurementId:
```

### **MSW Configuration**
- Mock API runs automatically in development
- Customize mock data in `src/mocks/handlers.ts`
- Add new endpoints following existing patterns

### **Build Optimization**
- **Code Splitting** - Automatic route-based splitting
- **Asset Optimization** - Image and font optimization
- **Bundle Analysis** - Use build tools to analyze bundle size

## 🤝 Contributing

### **Development Guidelines**
1. **Code Style** - Follow ESLint and Prettier configurations
2. **TypeScript** - Strict type checking enabled
3. **Testing** - Write tests for new features
4. **Documentation** - Update README for significant changes

### **Pull Request Process**
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### **Code Standards**
- **Component Naming** - PascalCase for components, camelCase for utilities
- **File Structure** - Feature-based organization
- **State Management** - Prefer Zustand for client state, TanStack Query for server state
- **Error Handling** - Comprehensive error boundaries and user feedback

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** - For the amazing React framework and ecosystem
- **Vercel** - For Vite build tool inspiration and deployment platform
- **Tailwind Labs** - For the incredible CSS framework and design system
- **Open Source Community** - For all the amazing libraries, tools, and inspiration
- **Heroicons** - For beautiful, consistent iconography
- **Recharts** - For powerful data visualization components

---

<div align="center">

**JOU Finance** - *Empowering financial freedom through intelligent technology*

**Built with ❤️ by Israel Olasehinde using modern web technologies**

[![React](https://img.shields.io/badge/React-19.1.1-61dafb?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.17-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

</div>