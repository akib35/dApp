import { Wallet } from '../types/types';
import { connectWallet } from '../services/api';

export class Navbar {
  private wallet: Wallet | null = null;
  private element: HTMLElement;

  constructor(private onWalletConnected: (wallet: Wallet) => void) {
    this.element = document.createElement('nav');
    this.element.className = 'navbar navbar-expand-lg navbar-dark bg-dark';
    this.render();
  }

  private async handleConnectWallet() {
    try {
      this.wallet = await connectWallet();
      this.onWalletConnected(this.wallet);
      this.render();
    } catch (error) {
      console.error('Wallet connection failed:', error);
    }
  }

  private render() {
    this.element.innerHTML = `
      <div class="container-fluid">
        <a class="navbar-brand" href="#">DApp Dashboard</a>
        <div class="d-flex">
          ${this.wallet ? this.renderWalletInfo() : this.renderConnectButton()}
        </div>
      </div>
    `;

    if (!this.wallet) {
      this.element.querySelector('#connectWallet')?.addEventListener('click', () => this.handleConnectWallet());
    }
  }

  private renderWalletInfo(): string {
    return `
      <div class="d-flex align-items-center">
        <span class="text-light me-2">${this.wallet?.balance}</span>
        <span class="badge bg-secondary">
          ${this.wallet?.address.substring(0, 6)}...${this.wallet?.address.substring(38)}
        </span>
      </div>
    `;
  }

  private renderConnectButton(): string {
    return `
      <button id="connectWallet" class="btn btn-outline-light">
        Connect Wallet
      </button>
    `;
  }

  getElement(): HTMLElement {
    return this.element;
  }
}
