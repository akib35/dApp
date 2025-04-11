import { fetchTransactions } from '../services/api';
import { TransactionCard } from '../components/TransactionCard';

export class HomePage {
  private element: HTMLElement;

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'container mt-4';
    this.loadTransactions();
  }

  private async loadTransactions() {
    this.element.innerHTML = `
      <div class="text-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    `;

    try {
      const transactions = await fetchTransactions();
      this.renderTransactions(transactions);
    } catch (error) {
      this.element.innerHTML = `
        <div class="alert alert-danger">
          Failed to load transactions. Please try again later.
        </div>
      `;
      console.error(error);
    }
  }

  private renderTransactions(transactions: any[]) {
    this.element.innerHTML = `
      <h2 class="mb-4">Recent Transactions</h2>
      <div id="transactionsContainer"></div>
    `;

    const container = this.element.querySelector('#transactionsContainer') as HTMLElement;
    transactions.forEach(tx => {
      const card = new TransactionCard(tx);
      container.appendChild(card.getElement());
    });
  }

  getElement(): HTMLElement {
    return this.element;
  }
}
