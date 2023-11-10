import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../../../services/data.service";
import {ApiService} from "../../../services/api.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-add-item',
    templateUrl: './add-item.component.html',
    styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
    submitted = false;
    form: FormGroup = new FormGroup({
        title: new FormControl(''),
        url: new FormControl(''),
        thumbnailUrl: new FormControl(''),
    });

    constructor(private formBuilder: FormBuilder,
                private apiService: ApiService,
                private dataService: DataService,
                private router: Router
                ) {
    }

    ngOnInit() {
        this.form = this.formBuilder.group(
            {
                title: ['', Validators.required],
                url: ['', Validators.required],
                thumbnailUrl: ['', Validators.required],
            },

        );
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
            id: 2,
            albumId: 1
        }
        console.log(data)
        this.apiService.addPhoto(data).subscribe((data) => {
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
