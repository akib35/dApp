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

describe('API Service', () => {
    it('should fetch all transactions', async () => {
        const transactions = await fetchTransactions();
        expect(transactions).toBeInstanceOf(Array);
        expect(transactions.length).toBeGreaterThan(0);
    });

    it('should fetch a single transaction by ID', async () => {
        const transaction = await fetchTransaction(1);
        expect(transaction).toBeDefined();
        expect(transaction?.id).toBe(1);
    });

    it('should create a new transaction', async () => {
        const newTransaction = await createTransaction({ from: '0x123', to: '0x456', value: '1 ETH' });
        expect(newTransaction).toHaveProperty('id');
        expect(newTransaction).toHaveProperty('hash');
        expect(newTransaction.value).toBe('1 ETH');
    });

    it('should connect a wallet', async () => {
        const wallet = await connectWallet();
        expect(wallet).toHaveProperty('address');
        expect(wallet).toHaveProperty('balance');
    });
});
