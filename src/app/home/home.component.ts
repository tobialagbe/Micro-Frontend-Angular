import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../transaction.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user!: any;
  transactions!: any[];
  error: boolean = false;
  errorMsg!: string;
  notif: boolean = false;
  notificationMsg!: string;

  constructor(
    private transactionService: TransactionService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.fetchTransactionData();
  }

  fetchTransactionData(){
    this.transactionService.fetchData().subscribe(
      (data: any) => {
        const err = data['error'];
        const res = data['data'];
        const resFormatted = JSON.parse(res.replaceAll("'", '"'));

        if (!err && resFormatted.status == "Valid") {
          this.user = resFormatted.user;
          this.transactions = resFormatted.transactions;
        }else{
          this.error = true;
          this.errorMsg = resFormatted.message || "Error fetching transaction data";
        }
      }
    );
  }


  getInitials(name: string = "") {
    let names: string[] = [];

    if (this.user && this.user.firstName) {
      names.push(this.user.firstName);
    }
    if (this.user && this.user.lastName) {
      names.push(this.user.lastName);
    }

    let initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }

    return initials;
  }


  cancelTransaction(transaction: {}){
    console.log(transaction);
    this.transactionService.cancel(transaction).subscribe(
      (data: any) => {
        console.log(data);
        const err = data['error'];
        const res = data['data'];

        if (!err && res.status == "Success") {
          this.notif = true;
          this.notificationMsg = "Transaction cancelled";
          setTimeout(() => {
            this.notif = false;
          }, 4000);
        }else{
          this.error = true;
          this.errorMsg = "Error fetching transaction data";
        }
      }
    );
  }


logout(){
  this.authService.logout();
}

}
