// Angular
import { NgModule } from '@angular/core';

// Material
import { 
    MatAutocompleteModule,
    MatExpansionModule,
    MatSelectModule,
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatMenuModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatSidenavModule,
    MatTooltipModule,
    MatDividerModule
  } from '@angular/material';
  import {CdkTableModule} from '@angular/cdk/table';
  import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
    exports: [
        BrowserAnimationsModule,
        MatExpansionModule,
        MatSelectModule,
        CdkTableModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatToolbarModule,
        MatButtonToggleModule,
        MatCardModule,
        MatMenuModule,
        MatDialogModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatSidenavModule,
        MatTooltipModule,
        MatDividerModule
    ]
})

export class MatDesignModule {
}
