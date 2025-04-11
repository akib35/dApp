export interface Transaction {
  id: number;
  hash: string;
  from: string;
  to: string;
  value: string;
  timestamp: string;
  status: 'pending' | 'completed' | 'failed';
}

export interface Wallet {
  address: string;
  balance: string;
}
