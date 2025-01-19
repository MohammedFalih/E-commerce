import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../customer.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {

  totalAmout: number;
  cartProducts: any = [];

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.getCartByUserId();
  }

  getCartByUserId() {
    this.customerService.getCartByUserId().subscribe((res) => {
      console.log('CartItems: ', res);
      this.cartProducts = res.cartItemDTOList;
      this.totalAmout = res.amount;
      console.log(this.cartProducts)
    });
  }
}
