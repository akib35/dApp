import { Transaction, Wallet } from '../types/types';

// Simulated in-memory database
let mockTransactions: Transaction[] = [
  {
    id: 1,
    hash: '0x123abc...',
    from: '0x111...111',
    to: '0x222...222',
    value: '0.5 ETH',
    timestamp: '2023-05-15 10:30',
    status: 'completed'
  },
  {
    id: 2,
    hash: '0x456def...',
    from: '0x333...333',
    to: '0x444...444',
    value: '1.2 ETH',
    timestamp: '2023-05-16 14:45',
    status: 'pending'
  }
];

export const fetchTransactions = async (): Promise<Transaction[]> => {
  return new Promise(resolve => {
    setTimeout(() => resolve(mockTransactions), 500);
  });
};

export const fetchTransaction = async (id: number): Promise<Transaction | undefined> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockTransactions.find(tx => tx.id === id));
    }, 500);
  });
};

export const createTransaction = async (txData: Omit<Transaction, 'id' | 'hash' | 'timestamp' | 'status'>): Promise<Transaction> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const newTx: Transaction = {
        id: mockTransactions.length + 1,
        hash: `0x${Math.random().toString(16).substr(2, 10)}...`,
        timestamp: new Date().toISOString(),
        status: 'pending',
        ...txData
      };
      mockTransactions = [...mockTransactions, newTx];
      resolve(newTx);
    }, 500);
  });
};

// Simulate wallet connection
export const connectWallet = async (): Promise<Wallet> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        address: `0x${Math.random().toString(16).substr(2, 40)}`,
        balance: `${Math.random().toFixed(4)} ETH`
      });
    }, 1000);
  });
};
