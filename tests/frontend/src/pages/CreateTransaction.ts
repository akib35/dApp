import { createTransaction } from '../services/api';

export class CreateTransactionPage {
  private element: HTMLElement;
  private form: HTMLFormElement;

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'container mt-4';
    this.form = document.createElement('form');
    this.render();
    this.setupForm();
  }

  private render() {
    this.element.innerHTML = `
      <div class="card">
        <div class="card-header">
          <h2>Create New Transaction</h2>
        </div>
        <div class="card-body">
          <form id="transactionForm">
            <div id="formAlert" class="alert d-none"></div>
            <div class="mb-3">
              <label for="fromAddress" class="form-label">From Address</label>
              <input type="text" class="form-control" id="fromAddress" required>
            </div>
            <div class="mb-3">
              <label for="toAddress" class="form-label">To Address</label>
              <input type="text" class="form-control" id="toAddress" required>
            </div>
            <div class="mb-3">
              <label for="amount" class="form-label">Amount (ETH)</label>
              <input type="number" step="0.0001" class="form-control" id="amount" required>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    `;
    this.form = this.element.querySelector('#transactionForm') as HTMLFormElement;
  }

  private setupForm() {
    this.form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const fromInput = this.form.querySelector('#fromAddress') as HTMLInputElement;
      const toInput = this.form.querySelector('#toAddress') as HTMLInputElement;
      const amountInput = this.form.querySelector('#amount') as HTMLInputElement;
      
      const alertDiv = this.form.querySelector('#formAlert') as HTMLElement;
      alertDiv.classList.add('d-none');

      try {
        // Simple validation
        if (!fromInput.value || !toInput.value || !amountInput.value) {
          throw new Error('All fields are required');
        }

        await createTransaction({
          from: fromInput.value,
          to: toInput.value,
          value: `${amountInput.value} ETH`
        });

        // Show success and reset form
        alertDiv.classList.remove('alert-danger', 'd-none');
        alertDiv.classList.add('alert-success');
        alertDiv.textContent = 'Transaction created successfully!';
        this.form.reset();
        
        // Redirect after delay
        setTimeout(() => {
          window.location.hash = '#/';
        }, 1500);
      } catch (error) {
        alertDiv.classList.remove('alert-success', 'd-none');
        alertDiv.classList.add('alert-danger');
        alertDiv.textContent = error instanceof Error ? error.message : 'Failed to create transaction';
      }
    });
  }

  getElement(): HTMLElement {
    return this.element;
  }
}
