import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {InputInterface} from "../../models/input.interface";

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

    public size: { xSize: number, ySize: number };
    public xArrays = [];
    public yArrays = [];

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe((params: InputInterface) => {
            const inputSize = params?.size;
            if (!params?.size.match('\^[0-9]+,[0-9]+\$')) {
                this.router.navigateByUrl('/');
            }
            this.size = {
                xSize: parseInt(inputSize.split(',')[0], 10),
                ySize: parseInt(inputSize.split(',')[1], 10)
            };
            this.xArrays = Array(this.size.xSize).fill(0);
            this.yArrays = Array(this.size.ySize).fill(0);
            console.log(this.size);

        })
    }

    Array(size: number) {
        return Array(size);
    }
}
