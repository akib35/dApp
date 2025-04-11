import { Navbar } from './components/Navbar';
import { HomePage } from './pages/Home';
import { TransactionDetailPage } from './pages/TransactionDetail';
import { CreateTransactionPage } from './pages/CreateTransaction';

class App {
  private currentPage: HTMLElement | null = null;
  private appContainer: HTMLElement;
  private navbar: Navbar;

  constructor() {
    this.appContainer = document.getElementById('app') as HTMLElement;
    
    // Initialize navbar with wallet connection callback
    this.navbar = new Navbar((wallet) => {
      console.log('Wallet connected:', wallet);
    });

    // Insert navbar at the top
    this.appContainer.prepend(this.navbar.getElement());
    
    // Handle routing
    this.handleRouting();
    window.addEventListener('hashchange', () => this.handleRouting());
  }

  private handleRouting() {
    const hash = window.location.hash.substring(1);
    
    // Clear current page
    if (this.currentPage) {
      this.currentPage.remove();
    }

    // Route to appropriate page
    if (hash === '/create') {
      this.currentPage = new CreateTransactionPage().getElement();
    } else if (hash.startsWith('/transaction/')) {
      const id = hash.split('/')[2];
      this.currentPage = new TransactionDetailPage(id).getElement();
    } else {
      this.currentPage = new HomePage().getElement();
    }

    // Add page to container
    this.appContainer.appendChild(this.currentPage);
  }
}

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new App();
});
