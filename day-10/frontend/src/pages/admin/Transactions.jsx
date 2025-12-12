import { useState, useMemo } from 'react';
import { FiCreditCard, FiSearch, FiFilter, FiDownload, FiCheckCircle, FiXCircle, FiClock, FiCalendar, FiTrendingUp, FiAlertCircle } from 'react-icons/fi';
import Layout from '../../components/Layout';
import Button from '../../components/Button';

// Mock transactions with static dates
const MOCK_TRANSACTIONS = [
  { id: 1, oderId: 1, phone: '9876543210', operator: 'Jio', circle: 'Delhi', planName: 'Popular Plan', amount: 299, validity: 28, status: 'success', date: '2024-12-10T10:30:00.000Z' },
  { id: 2, oderId: 2, phone: '9876543211', operator: 'Airtel', circle: 'Mumbai', planName: 'Premium Pack', amount: 699, validity: 84, status: 'success', date: '2024-12-09T14:20:00.000Z' },
  { id: 3, oderId: 1, phone: '9876543210', operator: 'Vi', circle: 'Karnataka', planName: 'Data Booster', amount: 499, validity: 56, status: 'success', date: '2024-12-08T09:15:00.000Z' },
];

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');

  // Get transactions from localStorage
  const transactions = useMemo(() => {
    const storedTransactions = JSON.parse(localStorage.getItem('rechargex_transactions') || '[]');
    
    if (storedTransactions.length === 0) {
      return MOCK_TRANSACTIONS;
    }
    return storedTransactions;
  }, []);

  // Filter and sort transactions
  const filteredTransactions = useMemo(() => {
    let result = [...transactions];

    // Search
    if (searchTerm) {
      result = result.filter(t =>
        t.phone?.includes(searchTerm) ||
        t.operator?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.planName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (filterStatus !== 'all') {
      result = result.filter(t => t.status === filterStatus);
    }

    // Date filter
    const now = new Date();
    if (filterDate === 'today') {
      result = result.filter(t => new Date(t.date).toDateString() === now.toDateString());
    } else if (filterDate === 'week') {
      const weekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
      result = result.filter(t => new Date(t.date) >= weekAgo);
    } else if (filterDate === 'month') {
      const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
      result = result.filter(t => new Date(t.date) >= monthAgo);
    }

    // Sort
    result.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [transactions, searchTerm, filterStatus, filterDate, sortOrder]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <FiCheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed':
        return <FiXCircle className="w-4 h-4 text-red-500" />;
      default:
        return <FiAlertCircle className="w-4 h-4 text-amber-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400';
      case 'failed':
        return 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400';
      default:
        return 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400';
    }
  };

  const totalAmount = filteredTransactions.reduce((sum, t) => sum + (t.amount || 0), 0);
  const successCount = filteredTransactions.filter(t => t.status === 'success').length;
  const failedCount = filteredTransactions.filter(t => t.status === 'failed').length;

  const exportToCSV = () => {
    const headers = ['ID', 'Phone', 'Operator', 'Plan', 'Amount', 'Status', 'Date'];
    const rows = filteredTransactions.map(t => [
      t.id,
      t.phone,
      t.operator,
      t.planName,
      t.amount,
      t.status,
      new Date(t.date).toLocaleString(),
    ]);
    
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Layout>
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            Transactions
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            View and manage all recharge transactions
          </p>
        </div>
        <Button variant="outline" onClick={exportToCSV}>
          <FiDownload className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg">
              <FiCreditCard className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Transactions</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{filteredTransactions.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg">
              <FiCheckCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Successful</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{successCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg">
              <FiXCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Failed</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">{failedCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg">
              <FiTrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Revenue</p>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">₹{totalAmount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by phone, operator, or plan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="all">All Status</option>
            <option value="success">Success</option>
            <option value="failed">Failed</option>
            <option value="pending">Pending</option>
          </select>

          {/* Date Filter */}
          <select
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>

          {/* Sort */}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        {filteredTransactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Transaction
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg">
                          <FiCreditCard className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 dark:text-gray-100">{transaction.phone}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">ID: #{transaction.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-gray-800 dark:text-gray-100">{transaction.operator}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{transaction.planName}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-semibold text-green-600 dark:text-green-400">₹{transaction.amount}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                        {getStatusIcon(transaction.status)}
                        {transaction.status?.charAt(0).toUpperCase() + transaction.status?.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300 text-sm">
                        <FiCalendar className="w-4 h-4" />
                        {new Date(transaction.date).toLocaleDateString()}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(transaction.date).toLocaleTimeString()}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <FiCreditCard className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No transactions found</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Transactions;
