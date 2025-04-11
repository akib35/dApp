import { Transaction } from '../types/types';

export class TransactionCard {
  constructor(private transaction: Transaction) {}

  private getStatusBadgeClass(): string {
    switch (this.transaction.status) {
      case 'completed': return 'bg-success';
      case 'pending': return 'bg-warning text-dark';
      case 'failed': return 'bg-danger';
      default: return 'bg-secondary';
    }
  }

  getElement(): HTMLElement {
    const element = document.createElement('div');
    element.className = 'card mb-3';
    element.innerHTML = `
      <div class="card-body">
        <div class="d-flex justify-content-between">
          <h5 class="card-title">Transaction #${this.transaction.id}</h5>
          <span class="badge ${this.getStatusBadgeClass()}">${this.transaction.status}</span>
        </div>
        <p class="card-text text-muted small mb-2">${this.transaction.hash}</p>
        <div class="row">
          <div class="col-md-6">
            <p class="mb-1"><strong>From:</strong> ${this.transaction.from}</p>
          </div>
          <div class="col-md-6">
            <p class="mb-1"><strong>To:</strong> ${this.transaction.to}</p>
          </div>
        </div>
        <div class="d-flex justify-content-between mt-2">
          <span class="fw-bold">${this.transaction.value}</span>
          <span class="text-muted">${this.transaction.timestamp}</span>
        </div>
        <a href="#/transaction/${this.transaction.id}" class="stretched-link"></a>
      </div>
    `;
    return element;
  }
}
