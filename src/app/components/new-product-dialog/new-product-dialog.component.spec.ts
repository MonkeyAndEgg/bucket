import { CommonModule } from '@angular/common';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NewProductDialogComponent } from './new-product-dialog.component';
import { NewProductDialogService } from './new-product-dialog.service';

describe('NewProductDialogComponent', () => {
  let component: NewProductDialogComponent;
  let fixture: ComponentFixture<NewProductDialogComponent>;
  let service: any;
  let el: DebugElement;

  beforeEach(waitForAsync(() => {
    const serviceSpy = jasmine.createSpyObj('NewProductDialogService', ['createProuct']);
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule,
        NoopAnimationsModule
      ],
      declarations: [
        NewProductDialogComponent
      ],
      providers: [
        { provide: NewProductDialogService, useValue: serviceSpy }
      ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(NewProductDialogComponent);
      component = fixture.componentInstance;
      service = TestBed.inject(NewProductDialogService);
      el = fixture.debugElement;
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display proper fields inside dialog', () => {
    const title = el.queryAll(By.css('h2'))[0];
    expect(title.nativeElement.textContent).toContain('Add a New Product');
    const formFields = el.queryAll(By.css('mat-form-field'));
    expect(formFields.length).toEqual(5);
    const selectImageButton = el.queryAll(By.css('.image-upload button'))[0];
    const createButton = el.queryAll(By.css('mat-dialog-actions button'))[0];
    expect(selectImageButton.nativeElement.textContent).toContain('Select Image');
    expect(createButton.nativeElement.textContent).toContain('Create');
  });
});
