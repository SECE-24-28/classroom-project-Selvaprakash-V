import { createContext, useState, useContext } from 'react';

const RechargeContext = createContext();

export const useRecharge = () => {
  const context = useContext(RechargeContext);
  if (!context) {
    throw new Error('useRecharge must be used within RechargeProvider');
  }
  return context;
};

export const RechargeProvider = ({ children }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [operator, setOperator] = useState('');
  const [circle, setCircle] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [customerId, setCustomerId] = useState('');
  const [dthProvider, setDthProvider] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [user, setUser] = useState({ name: 'Guest User', email: 'user@example.com', phone: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now(),
      date: new Date().toLocaleString(),
    };
    setTransactions([newTransaction, ...transactions]);
  };

  const resetRecharge = () => {
    setPhoneNumber('');
    setOperator('');
    setCircle('');
    setSelectedPlan(null);
    setCustomerId('');
    setDthProvider('');
  };

  return (
    <RechargeContext.Provider
      value={{
        phoneNumber,
        setPhoneNumber,
        operator,
        setOperator,
        circle,
        setCircle,
        selectedPlan,
        setSelectedPlan,
        customerId,
        setCustomerId,
        dthProvider,
        setDthProvider,
        transactions,
        addTransaction,
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        resetRecharge,
      }}
    >
      {children}
    </RechargeContext.Provider>
  );
};
