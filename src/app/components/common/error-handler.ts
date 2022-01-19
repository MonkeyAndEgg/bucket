import { HttpErrorResponse } from "@angular/common/http";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";

export function errorHandler(snackBar: MatSnackBar, errorRes: HttpErrorResponse): void {
  let errorMessage = '';
  if (errorRes.error && errorRes.error.message) {
    errorMessage = errorRes.error.message;
  } else {
    errorMessage = errorRes.message;
  }
  snackBar.open(errorMessage, undefined, {
    horizontalPosition: 'right' as MatSnackBarHorizontalPosition,
    verticalPosition: 'top' as MatSnackBarVerticalPosition,
    duration: 5 * 1000,
    panelClass: ['custom-snack-bar']
  });
}
