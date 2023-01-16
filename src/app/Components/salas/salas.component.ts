import { Component, OnInit } from '@angular/core';
import { Salon } from '../../model/salon';
import { SalaService } from '../../Services/sala.service';
import { AUTHENTICATED_USER } from "../../Services/basic-jwtauth-services.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-salas',
  templateUrl: './salas.component.html',
  styleUrls: ['./salas.component.css']
})
export class SalasComponent implements OnInit {

  salas: Salon[] = [];

  constructor(
    private salaservice: SalaService, 
    private router:Router 
    ) { }

  ngOnInit(): void {
    if(sessionStorage.getItem(AUTHENTICATED_USER)){
      this.salaservice.getSalas().subscribe(
        (response: Salon[]) => {
          this.salas = response;
          console.log(this.salas);
          console.log(response);
        }
      )
    }
  }

  selectSalon(idSala: number) : void{
    console.log('navegando al saloncomponent', idSala);
    this.router.navigate(['/salon',idSala]);
  }
}
