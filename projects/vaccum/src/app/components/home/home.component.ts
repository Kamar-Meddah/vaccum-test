import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Commands} from "../../models/commands.enum";
import {Router} from "@angular/router";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    public formData: FormGroup;

    constructor(private readonly fb: FormBuilder,
                private readonly router: Router) {
    }

    ngOnInit() {
        this.formData = this.fb.group({
            status: ['', Validators.required],
            position: ['', Validators.pattern('\^[0-9]+,[0-9]+\$')],
            size: ['', Validators.pattern('\^[0-9]+,[0-9]+\$')],
            commands: ['', Validators.pattern('\^[adgADG]+\$')]
        })
    }

    public onSubmit(): void {

        const values = this.formData.value;
        console.log(values)
        if (this.formData.valid) {
            this.router.navigateByUrl(
                `/board?size=${values.size}&position=${values.position}&status=${values.status}&commands=${values.commands}`
            );
        }

    }

    public cleanInputCommands($event: Event) {
        const commandsControl = this.formData.get('commands');
        const newValue = (commandsControl.value as string)
            .toUpperCase()
            .replace(
                new RegExp(`[^${[Commands.FORWARD, Commands.LEFT, Commands.RIGHT].join('')}]`, 'g'), ''
            );
        commandsControl.setValue(newValue);
    }

}
