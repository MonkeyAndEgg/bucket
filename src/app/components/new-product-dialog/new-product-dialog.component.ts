import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductType } from 'src/app/constants/product-type.constants';
import { NewProductDialogService } from './new-product-dialog.service';

@Component({
  selector: 'app-new-product-dialog',
  templateUrl: './new-product-dialog.component.html',
  styleUrls: ['./new-product-dialog.component.css']
})
export class NewProductDialogComponent implements OnInit {
  productForm = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    price: new FormControl('', [
      Validators.required
    ]),
    description: new FormControl('', []),
    numOfStocks: new FormControl(null, [
      Validators.required
    ]),
    type: new FormControl('', {
      validators: [
        Validators.required
      ]
    }),
    image: new FormControl(null, {
      validators: [
        Validators.required
      ]
    })
  });
  imagePreview = '';
  productTypes = [
    {
      label: ProductType.BAGS_LABEL, value: ProductType.BAGS_VALUE
    },
    {
      label: ProductType.ELECTRONIC_DEVICES_LABEL, value: ProductType.ELECTRONIC_DEVICES_VALUE
    },
    {
      label: ProductType.FURNITURE_LABEL, value: ProductType.FURNITURE_VALUE
    },
    {
      label: ProductType.FOOD_AND_BEVERAGE_LABEL, value: ProductType.FOOD_AND_BEVERAGE_VALUE
    },
    {
      label: ProductType.PETS_LABEL, value: ProductType.PETS_VALUE
    },
    {
      label: ProductType.OTHERS_LABEL, value: ProductType.OTHERS_VALUE
    }
  ];

  constructor(private service: NewProductDialogService) { }

  ngOnInit(): void {
  }

  onImageSelected(event: Event) {
    if (event && event.target) {
      // @ts-ignore: Object is possibly 'null'.
      const file = (event.target as HTMLInputElement).files[0];
      this.productForm.patchValue({image: file});
      // @ts-ignore: Object is possibly 'null'.
      this.productForm.get('image').updateValueAndValidity();
      const filterReader = new FileReader();
      filterReader.onload = () => {
        this.imagePreview = filterReader.result as string;
      };
      filterReader.readAsDataURL(file);
    }
  }

  onCreate(): void {
    this.service.createProuct(this.productForm.value);
  }
}
