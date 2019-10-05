import { Component, OnInit } from '@angular/core';
import { InventaryService } from '../inventary.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  form: FormGroup;
  products;
  clients;
  orders;

  constructor(private _inventaryService:InventaryService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
        client: this.formBuilder.control('',Validators.compose([
          Validators.required
        ]
        )),
        product: this.formBuilder.control('',Validators.compose([
          Validators.required
        ])),
        /*amount: this.formBuilder.control('', Validators.compose([
          Validators.required,
          Validators.pattern(/^\d+$/)
        ]))*/
    });
    this.getClients();
    this.getProducts();
  }

  getProducts() {
    this._inventaryService.getProducts()
    .subscribe( data => {
      const resp: any = data;
      this.products = resp.data;
    })
  }

  getClients() {
    this._inventaryService.getClients()
    .subscribe( data => {
      const resp: any = data;
      this.clients = resp.data;
    })
  }

  save(obj){
    var instance:any = {
      number: 1,
      client: {_id: obj.client}
    }
    instance.orderProducts = [];
    obj.product.forEach( ele => {
      instance.orderProducts.push({
        amount:1,
        product:{_id: ele}
      });
    });

    this._inventaryService.createOrder(instance)
    .subscribe(data => {
      console.log(data);
      this.getClientOrders(obj.client);
    });
  }

  getClientOrders(id){
    this._inventaryService.getClientOrders(id)
    .subscribe( data => {
      const resp: any = data;
      this.orders = resp.data;
    })
  }

}
