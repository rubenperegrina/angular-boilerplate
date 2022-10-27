import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/modules/authentication/services/authentication.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _authenticationService: AuthenticationService
  ) {}

  handleError(error: HttpErrorResponse) {
    if(error.status === 401) {
      this._authenticationService.deleteAccessToken();
      window.location.replace("/login");
    } else {
      this._snackBar.openFromComponent(SnackBarComponent, {
          data: error.error.detail,
          panelClass: ["snack-error"]
        }); 
    }
  }
}
