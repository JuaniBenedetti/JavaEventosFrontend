import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {

  @Output() navigateTo: EventEmitter<string> = new EventEmitter();
  @Output() closeMenu: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit() {}

}
