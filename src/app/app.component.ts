import { Component } from '@angular/core';
import { CurrencyService } from './currency.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  amount1 = 0;
  amount2 = 0;
  currency1 = 'UAH';
  currency2 = 'USD';
   exchangeRates: any;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit() {
    this.currencyService.getExchangeRate(this.currency1).subscribe(response => {
      this.exchangeRates = response.conversion_rates;
    });
  }

  convertCurrency(event: any, field: string): void {
  if (field === 'amount1') {
    const value = parseFloat(event.target.value);
    this.amount1 = isNaN(value) || value === 0 ? 0 : value;
  } else if (field === 'currency1') {
    this.currency1 = event.target.value;
  } else if (field === 'amount2') {
    const value = parseFloat(event.target.value);
    this.amount2 = isNaN(value) || value === 0 ? 0 : value;
  } else if (field === 'currency2') {
    this.currency2 = event.target.value;
  }

  this.currencyService.getExchangeRate(this.currency1).subscribe(response => {
    const rate = response.conversion_rates[this.currency2];
    if (field === 'amount1') {
      this.amount2 = parseFloat((this.amount1 * rate).toFixed(2));
    } else if (field === 'amount2') {
      this.amount1 = parseFloat((this.amount2 / rate).toFixed(2));
    } else if (field === 'currency1') {
      this.amount2 = parseFloat((this.amount1 * rate).toFixed(2));
    } else if (field === 'currency2') {
      this.amount1 = parseFloat((this.amount2 / rate).toFixed(2));
    }
  });
}

}