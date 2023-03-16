import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { es } from 'date-fns/locale';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDateFnsModule} from '@angular/material-date-fns-adapter';
import {MatIconModule} from '@angular/material/icon';
import {MatRippleModule} from '@angular/material/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTableModule} from '@angular/material/table';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatAutocompleteModule} from '@angular/material/autocomplete';


@NgModule({
  declarations: [],
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatStepperModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDateFnsModule,
    MatIconModule,
    MatRippleModule,
    MatExpansionModule,
    MatListModule,
    MatTooltipModule,
    MatTableModule,
    MatRadioModule,
    MatCheckboxModule,
    MatAutocompleteModule
  ],
  exports: [
    MatCardModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatStepperModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDateFnsModule,
    MatIconModule,
    MatRippleModule,
    MatExpansionModule,
    MatListModule,
    MatTooltipModule,
    MatTableModule,
    MatRadioModule,
    MatCheckboxModule,
    MatAutocompleteModule
  ],
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      useValue: es,
    },
  ]
})
export class MaterialModule { }
