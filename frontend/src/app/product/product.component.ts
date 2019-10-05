import { Component, OnInit } from '@angular/core';
import { InventaryService } from '../inventary.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products;
  form: FormGroup;


  constructor(private _inventaryService:InventaryService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getProducts();
    this.form = this.formBuilder.group({
      name: this.formBuilder.control('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$')
      ])),
    });
  }

  getProducts() {
    this._inventaryService.getProducts()
    .subscribe( data => {
      const resp: any = data;
      this.products = resp.data;
    })
  }

  save(obj){
    //console.log(client);
    this._inventaryService.createProduct(obj)
    .subscribe(data => {
      console.log(data);
      this.getProducts();
    });
  }

}
