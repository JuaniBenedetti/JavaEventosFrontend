import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackInfoService {

  constructor(
    private _snackBar: MatSnackBar
  ) { }

  show(status: string, message: string): void {
    this._snackBar.open(message, '', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: status === 'error' ? ['snackbar-error'] : status === 'warn' ? ['snackbar-warn'] : ['snackbar-ok']
    });
  }
}
