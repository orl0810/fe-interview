// error.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ErrorService {
  private _errorMessage: string | null = null;

  setError(message: string) {
    this._errorMessage = message;
    console.error('[App Error]:', message);
  }

  getError(): string | null {
    return this._errorMessage;
  }

  clear() {
    this._errorMessage = null;
  }
}
