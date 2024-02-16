import { Component, OnInit, inject } from '@angular/core';
import { Motorcycle } from './interfaces/motorcycle.interface';
import { MotorcyclesServices } from '../services/motorcycles.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Model } from './interfaces/model.interface';
import { Brand } from './interfaces/brand.interface';

@Component({
  selector: 'app-motorcycles',
  templateUrl: './motorcycles.component.html'
})
export class MotorcyclesComponent implements OnInit {

  public motorcycles: Motorcycle[] = [];
  public models: Model[] = [];
  public brands: Brand[] = [];

  private motorcyclesService = inject(MotorcyclesServices);
  private fb = inject( FormBuilder );

  ngOnInit(): void {
    this.load();
  }

  load () {
    this.motorcyclesService.list().subscribe( data => this.motorcycles = data );
    this.motorcyclesService.brandList().subscribe( data => this.brands = data );
  }

  public myForm: FormGroup = this.fb.group({
    selectedBrandId: [null, Validators.required],
    status: [true, Validators.required],
    license_plate: ['', [Validators.required, Validators.minLength(6)]],
    model_id: [0, [Validators.required, Validators.pattern('^[0-9]*$')]]
  })

  findModels(brandId: number|null){
    if (brandId === null ) return;
    this.motorcyclesService.modelList(brandId).subscribe( data => this.models = data );
    return this.models;
  }

  create(){
    const { status, license_plate, model_id } = this.myForm.value;

    this.motorcyclesService.create(status, license_plate, model_id)
      .subscribe({
        next: () => {
          this.load();
        },
        error: ( ) => {}
      }
    )
  }
}
