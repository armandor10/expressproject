import { Component, OnInit } from '@angular/core';
import { InventaryService } from '../inventary.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  clients;
  form: FormGroup;

  constructor(private _inventaryService:InventaryService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getClients();
    this.form = this.formBuilder.group({
      name: this.formBuilder.control('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$')
      ])),
    });
  }

  getClients() {
    this._inventaryService.getClients()
    .subscribe( data => {
      const resp: any = data;
      this.clients = resp.data;
    })
  }

  saveClient(client){
    //console.log(client);
    this._inventaryService.createClient(client)
    .subscribe(data => {
      console.log(data);
      this.getClients();
    });
  }

}
