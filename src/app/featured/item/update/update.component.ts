import {Component, inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../../services/api.service";
import {DataService} from "../../../services/data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Item} from "../../../shared/models/items.model";

@Component({
    selector: 'app-update',
    templateUrl: './update.component.html',
    styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit{
    submitted = false;
    route: ActivatedRoute = inject(ActivatedRoute);
    form: FormGroup = new FormGroup({
        title: new FormControl(''),
        url: new FormControl(''),
        thumbnailUrl: new FormControl(''),
    });
    item!:Item

    constructor(private formBuilder: FormBuilder,
                private apiService: ApiService,
                private dataService: DataService,
                private router: Router
    ) {

    }

    ngOnInit() {
        const id = parseInt(this.route.snapshot.params['id'], 10);
        this.apiService.getPhoto(id).subscribe((data) => {
            if (data) {
                this.item = data;
                this.form = this.formBuilder.group(
                    {
                        title: [data.title, Validators.required],
                        url: [data.url, Validators.required],
                        thumbnailUrl: [data.thumbnailUrl, Validators.required],
                    },

                );
            }
        })

    }
    get f(): { [key: string]: AbstractControl } {
        return this.form.controls;
    }

    onSubmit(): void {
        this.submitted = true;
        if (this.form.invalid) {
            return;
        }
        const data = {
            ...this.form.value,
            id: this.item.id,
            albumId: this.item.albumId
        }
        this.apiService.updatePhoto(data.id,data).subscribe((data) => {
            if (data) {
                this.dataService.updateData(data);
                this.form.reset();
                this.router.navigate(['/home']);

            }
        })

    }
    onReset(): void {
        this.submitted = false;
        this.form.reset();
    }

}
