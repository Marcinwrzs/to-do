import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';

export const appConfig = {
  providers: [
    provideHttpClient(),
    provideRouter([]),
    provideAnimations(),
    importProvidersFrom(MatDialogModule),
  ],
};
