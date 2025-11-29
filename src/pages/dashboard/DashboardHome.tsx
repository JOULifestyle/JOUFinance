import { useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import {
  PlusIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  BanknotesIcon,
  TagIcon
} from '@heroicons/react/24/outline';
import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/client";
import { useAuthStore } from "../../stores/authStore";
import { useUIStore } from "../../stores/uiStore";
import { useNotificationStore } from "../../stores/notificationStore";
import type { Transaction } from "../../api/transactions";
import {
  groupByMonth,
  groupByCategory,
  generateInsights,
} from "../../features/utils/chartUtils";
import { formatDistanceToNow, format } from 'date-fns';
import LineChartCard from "../../components/charts/LineChartCard";
import PieChartCard from "../../components/charts/PieChartCard";
import TransactionForm from "../../components/TransactionForm";
import TransactionsPage from "../transactions/Transactions";
import WalletsPage from "../wallets/Wallets";
import InvestmentsPage from "../investments/Investments";
import SavingsGoals from "../savings-goals/SavingsGoals";
import ChartsPage from "../charts/Charts";


export default function DashboardHome() {
  const { user } = useAuthStore();
  const { currency, exchangeRates } = useUIStore();
  const { notifications, unreadCount, markAsRead, notificationsEnabled } = useNotificationStore();
  const [activeTab, setActiveTab] = useState('overview');
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  const [showTransactionForm, setShowTransactionForm] = useState(false);

  // Balance
  const { data: balanceData } = useQuery<{ total: number; available: number; pending: number }>({
    queryKey: ["balance"],
    queryFn: async () => {
      const res = await api.get("/balance");
      return res.data;
    },
  });

  // Wallets
  const { data: wallets = [] } = useQuery({
    queryKey: ["wallets"],
    queryFn: async () => {
      const res = await api.get("/wallets");
      return res.data;
    },
  });

  // Recent transactions
  const { data: transactions = [] } = useQuery<Transaction[]>({
    queryKey: ["transactions", 1],
    queryFn: async () => {
      const res = await api.get("/transactions", { params: { page: 1 } });
      return Array.isArray(res.data) ? res.data.slice(0, 5) : [];
    },
  });

  // All transactions for charts
  const { data: allTx = [] } = useQuery<Transaction[]>({
    queryKey: ["transactions-all"],
    queryFn: async () => {
      const res = await api.get("/transactions");
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  // Savings Goals
  const { data: savingsGoals = [] } = useQuery({
    queryKey: ["savings-goals"],
    queryFn: async () => {
      const res = await api.get("/savings-goals");
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  // Investments
  const { data: investments = [] } = useQuery({
    queryKey: ["investments"],
    queryFn: async () => {
      const res = await api.get("/investments");
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  // Analytics
  const { data: analytics } = useQuery({
    queryKey: ["analytics"],
    queryFn: async () => {
      const res = await api.get("/analytics");
      return res.data;
    },
  });

  const totalBalance = balanceData?.total || 0;
  const totalInvestments = investments.reduce((sum: number, inv: any) => sum + (inv.units * inv.currentPrice), 0);
  const recentTransactions = transactions.slice(0, 5);

  // Provide default data for charts when no transactions exist
  const lineData = allTx.length > 0 ? groupByMonth(allTx) : [
    { month: format(new Date(), 'yyyy-MM'), total: 0 }
  ];
  const pieData = allTx.length > 0 ? groupByCategory(allTx) : [
    { name: 'No Data', value: 1 }
  ];
  const insights = allTx.length > 0 ? generateInsights(allTx) : [
    '💡 Start by adding your first transaction to see financial insights and analytics.'
  ];

  // Calculate wallets added this month
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const walletsThisMonth = Array.isArray(wallets) ? wallets.filter((wallet: any) => {
    if (!wallet.createdAt) return false;
    const createdDate = new Date(wallet.createdAt);
    return createdDate.getMonth() === currentMonth && createdDate.getFullYear() === currentYear;
  }).length : 0;


  const formatCurrency = (amount: number) => {
    const convertedAmount = amount * (exchangeRates[currency] || 1);
    // Ensure currency is a valid 3-letter code, fallback to USD
    const validCurrency = currency && currency.length === 3 && /^[A-Z]{3}$/.test(currency) ? currency : 'USD';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: validCurrency,
      minimumFractionDigits: 2
    }).format(convertedAmount);
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'add-transaction':
        setShowTransactionForm(true);
        break;
      case 'view-analytics':
        setActiveTab('analytics');
        break;
      case 'manage-wallets':
        setActiveTab('wallets');
        break;
    }
  };

  const renderOverview = () => (
    <div className="space-y-4">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-linear-to-r from-joublue to-joupurple rounded-2xl p-6 text-white relative overflow-hidden"
      >
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Welcome back, {user?.displayName || 'User'}! 🙂
          </h1>
          <p className="text-joublue-100 mb-4">
            Here's your financial overview for today
          </p>
          <div className="flex items-center gap-6">
            <div>
              <p className="text-joublue-100 text-sm">Total Balance</p>
              <p className="text-2xl font-bold">{formatCurrency(totalBalance)}</p>
            </div>
            <div>
              <p className="text-joublue-100 text-sm">Monthly Change</p>
              <div className="flex items-center gap-1">
                <ArrowTrendingUpIcon className="h-4 w-4" />
                <span className="text-sm font-medium">+12.5%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-12 -mb-12"></div>

        {/* Dial Mock Image for Desktop */}
        <motion.img
          src="/JOU-Finance Dail mock.png"
          alt="JOU Finance Dial Mock"
          className="absolute top-1/2 right-4 transform -translate-y-1/2 w-40 h-40 opacity-80 hidden md:block object-contain drop-shadow-lg"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.1, rotateY: 15 }}
        />
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-700 p-6 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Wallets</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{wallets.length}</p>
              <p className="text-sm text-green-700 dark:text-green-400">+{walletsThisMonth} this month</p>
            </div>
            <div className="w-12 h-12 bg-joublue-100 dark:bg-joublue-900/30 rounded-xl flex items-center justify-center">
              <BanknotesIcon className="h-6 w-6 text-joublue-600 dark:text-joublue-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-700 p-6 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">This Month</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(analytics?.monthlyIncome || 0)}
              </p>
              <p className="text-sm text-green-700 dark:text-green-400">Income</p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
              <ArrowTrendingUpIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-700 p-6 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 cursor-pointer"
          onClick={() => setActiveTab('investments')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Investment Portfolio</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(totalInvestments)}
              </p>
              <p className="text-sm text-green-700 dark:text-green-400">+15.7%</p>
            </div>
            <div className="w-12 h-12 bg-accent-100 dark:bg-accent-900/30 rounded-xl flex items-center justify-center">
              <ChartBarIcon className="h-6 w-6 text-accent-600 dark:text-accent-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-700 p-6 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 cursor-pointer"
          onClick={() => setActiveTab('savings-goals')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Savings Goals</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {savingsGoals.length}
              </p>
              <p className="text-sm text-joublue-600 dark:text-joublue-400">Active goals</p>
            </div>
            <div className="w-12 h-12 bg-warning-100 dark:bg-warning-900/30 rounded-xl flex items-center justify-center">
              <CurrencyDollarIcon className="h-6 w-6 text-warning-600 dark:text-warning-400" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions & Charts */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Charts Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Financial Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LineChartCard data={lineData} title="Monthly Spending Trend" currency={currency} exchangeRates={exchangeRates} />
              <PieChartCard data={pieData} title="Spending by Category" currency={currency} exchangeRates={exchangeRates} />
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Transactions
            </h3>
            <button
              onClick={() => setActiveTab('transactions')}
              className="text-sm text-joublue-600 dark:text-joublue-400 hover:text-joublue-700 dark:hover:text-joublue-300"
            >
              View all
            </button>
          </div>

          <div className="space-y-4">
            {recentTransactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: '#e3f2fd' }}
                  >
                    <span className="text-sm font-medium" style={{ color: '#1976d2' }}>
                      {transaction.category.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {transaction.description}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {transaction.category} • {formatDistanceToNow(new Date(transaction.date), { addSuffix: true })}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.type === 'income'
                      ? 'text-green-700 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}{formatCurrency(Math.abs(transaction.amount))}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {transaction.status || 'completed'}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          </div>

          {/* Dial Mock Image for Mobile */}
          <div className="md:hidden flex items-center justify-center gap-4 my-4">
            <p className="text-lg font-semibold text-gray-900 dark:text-white">We are one click away</p>
            <motion.img
              src="/JOU-Finance Dail mock.png"
              alt="JOU Finance Dial Mock"
              className="w-32 h-32 object-contain drop-shadow-lg"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.1, rotateY: 15 }}
            />
          </div>
        </motion.div>

        {/* Quick Actions & Notifications */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Account Management</h2>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-700 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button
                onClick={() => handleQuickAction('add-transaction')}
                className="w-full flex items-center gap-3 p-3 text-left bg-joublue-50 dark:bg-joublue-900/20 hover:bg-linear-to-r hover:from-joublue hover:to-joupurple hover:text-white hover:shadow-lg hover:-translate-y-1 rounded-xl transition-all duration-200 transform"
              >
                <PlusIcon className="h-5 w-5 text-joublue-600 dark:text-joublue-400" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Add Transaction
                </span>
              </button>

              <button
                onClick={() => handleQuickAction('manage-wallets')}
                className="w-full flex items-center gap-3 p-3 text-left bg-gray-50 dark:bg-gray-700/50 hover:bg-linear-to-r hover:from-joublue hover:to-joupurple hover:text-white hover:shadow-lg hover:-translate-y-1 rounded-xl transition-all duration-200 transform"
              >
                <BanknotesIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Manage Wallets
                </span>
              </button>

              <button
                onClick={() => handleQuickAction('view-analytics')}
                className="w-full flex items-center gap-3 p-3 text-left bg-gray-50 dark:bg-gray-700/50 hover:bg-linear-to-r hover:from-joublue hover:to-joupurple hover:text-white hover:shadow-lg hover:-translate-y-1 rounded-xl transition-all duration-200 transform"
              >
                <ChartBarIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  View Analytics
                </span>
              </button>
            </div>
          </motion.div>

          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-700 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Notifications
              </h3>
              {notificationsEnabled && (
                <span className="px-2 py-1 bg-joublue-500 text-white text-xs rounded-full">
                  {unreadCount}
                </span>
              )}
            </div>
            {notificationsEnabled ? (
              <div
                className="space-y-3 max-h-64 overflow-y-auto focus:outline-none focus:ring-2 focus:ring-joublue focus:ring-opacity-50 rounded"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                    e.preventDefault()
                    const focusableElements = e.currentTarget.querySelectorAll('button, [tabindex]:not([tabindex="-1"])')
                    const currentIndex = Array.from(focusableElements).indexOf(document.activeElement as Element)
                    let nextIndex

                    if (e.key === 'ArrowDown') {
                      nextIndex = currentIndex < focusableElements.length - 1 ? currentIndex + 1 : 0
                    } else {
                      nextIndex = currentIndex > 0 ? currentIndex - 1 : focusableElements.length - 1
                    }

                    ;(focusableElements[nextIndex] as HTMLElement).focus()
                  }
                }}
              >
                {notifications.length === 0 ? (
                  <p className="text-sm text-gray-600 dark:text-gray-400">No notifications</p>
                ) : (
                  notifications.slice(0, showAllNotifications ? notifications.length : 3).map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        notification.isRead
                          ? 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
                          : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700 hover:bg-blue-100 dark:hover:bg-blue-800'
                      }`}
                      onClick={async () => {
                        if (!notification.isRead) {
                          try {
                            await api.put(`/notifications/${notification.id}/read`);
                            markAsRead(notification.id);
                          } catch (error) {
                            console.error('Failed to mark notification as read:', error);
                          }
                        }
                      }}
                    >
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                        {notification.title}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                        {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Push notifications are disabled. Enable them in settings to see notifications here.
              </p>
            )}
            {notificationsEnabled && notifications.length > 3 && !showAllNotifications && (
              <button
                onClick={() => setShowAllNotifications(true)}
                className="text-xs text-joublue-600 dark:text-joublue-400 hover:text-joublue-700 dark:hover:text-joublue-300 mt-3 text-center w-full font-medium"
              >
                View all {notifications.length} notifications
              </button>
            )}
            {notificationsEnabled && showAllNotifications && (
              <button
                onClick={() => setShowAllNotifications(false)}
                className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 mt-3 text-center w-full"
              >
                Show less
              </button>
            )}
          </motion.div>
        </div>
      </div>

      {/* AI Insights */}
      {insights.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-linear-to-r from-accent-50 to-joublue-50 dark:from-accent-900/20 dark:to-joublue-900/20 rounded-2xl border border-accent-200 dark:border-accent-800 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            💡 AI-Powered Financial Insights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {insights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 + index * 0.1 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-white/20 dark:border-gray-700/20"
              >
                <p className="text-gray-800 dark:text-gray-200 text-sm">{insight}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: ChartBarIcon },
    { id: 'transactions', label: 'Transactions', icon: CurrencyDollarIcon },
    { id: 'wallets', label: 'Wallets', icon: BanknotesIcon },
    { id: 'investments', label: 'Investments', icon: ChartBarIcon },
    { id: 'savings-goals', label: 'Savings Goals', icon: TagIcon },
    { id: 'analytics', label: 'Analytics', icon: ArrowTrendingUpIcon }
  ];

  return (
    <div className="space-y-4">
      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-700 p-2">
        <div className="flex space-x-1 overflow-x-auto scrollbar-hide relative">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl font-medium transition-all whitespace-nowrap shrink-0 ${
                  activeTab === tab.id
                    ? 'bg-linear-to-r from-joublue to-joupurple text-white shadow-soft'
                    : 'text-gray-600 dark:text-gray-400 hover:text-white hover:bg-linear-to-r hover:from-joublue hover:to-joupurple focus:bg-linear-to-r focus:from-joublue focus:to-joupurple focus:text-white'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {tab.label}
              </button>
            );
          })}
          {/* Scroll indicator for mobile */}
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-linear-to-l from-white dark:from-gray-800 to-transparent pointer-events-none md:hidden flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-400 dark:text-gray-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'transactions' && <TransactionsPage />}
        {activeTab === 'wallets' && <WalletsPage />}
        {activeTab === 'investments' && <InvestmentsPage />}
        {activeTab === 'savings-goals' && <SavingsGoals />}
        {activeTab === 'analytics' && <ChartsPage />}
      </motion.div>

      {/* Transaction Form Modal */}
      <Dialog open={showTransactionForm} onClose={() => setShowTransactionForm(false)} className="fixed z-50 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" aria-hidden="true" />

          <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-2xl text-left shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full relative z-10">
            <div className="px-6 py-6">
              <div className="flex items-center justify-between mb-6">
                <Dialog.Title className="text-xl font-bold text-gray-900 dark:text-white">
                  Add New Transaction
                </Dialog.Title>
                <button
                  onClick={() => setShowTransactionForm(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  aria-label="Close transaction form"
                >
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <TransactionForm onClose={() => setShowTransactionForm(false)} />
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
