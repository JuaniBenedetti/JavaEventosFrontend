import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { RestarPeticion, SumarPeticion } from 'src/app/model/state/progressBarState';

@Injectable()
export class PendingRequestInterceptor implements HttpInterceptor {

  constructor(
    private store: Store
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.store.dispatch(new SumarPeticion());
    return next.handle(request).pipe(
      finalize(() => this.store.dispatch(new RestarPeticion()))
    );
  }
}
