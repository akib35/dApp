import { fetchTransaction } from '../services/api';

export class TransactionDetailPage {
  private element: HTMLElement;

  constructor(private id: string) {
    this.element = document.createElement('div');
    this.element.className = 'container mt-4';
    this.loadTransaction();
  }

  private async loadTransaction() {
    this.element.innerHTML = `
      <div class="text-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    `;

    try {
      const transaction = await fetchTransaction(parseInt(this.id));
      if (transaction) {
        this.renderTransaction(transaction);
      } else {
        this.element.innerHTML = `
          <div class="alert alert-warning">
            Transaction not found
          </div>
        `;
      }
    } catch (error) {
      this.element.innerHTML = `
        <div class="alert alert-danger">
          Failed to load transaction details
        </div>
      `;
      console.error(error);
    }
  }

  private renderTransaction(transaction: any) {
    this.element.innerHTML = `
      <div class="card">
        <div class="card-header">
          <h2>Transaction Details</h2>
        </div>
        <div class="card-body">
          <div class="mb-4">
            <h4 class="card-title">Overview</h4>
            <div class="row">
              <div class="col-md-6">
                <p><strong>Hash:</strong> ${transaction.hash}</p>
              </div>
              <div class="col-md-6">
                <p><strong>Status:</strong> 
                  <span class="badge ${this.getStatusClass(transaction.status)}">
                    ${transaction.status}
                  </span>
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <h4 class="card-title">Details</h4>
            <div class="row">
              <div class="col-md-6">
                <p><strong>From:</strong> ${transaction.from}</p>
                <p><strong>To:</strong> ${transaction.to}</p>
              </div>
              <div class="col-md-6">
                <p><strong>Value:</strong> ${transaction.value}</p>
                <p><strong>Timestamp:</strong> ${transaction.timestamp}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a href="#/" class="btn btn-primary mt-3">Back to Home</a>
    `;
  }

  private getStatusClass(status: string): string {
    switch (status) {
      case 'completed': return 'bg-success';
      case 'pending': return 'bg-warning text-dark';
      case 'failed': return 'bg-danger';
      default: return 'bg-secondary';
    }
  }

  getElement(): HTMLElement {
    return this.element;
  }
}
