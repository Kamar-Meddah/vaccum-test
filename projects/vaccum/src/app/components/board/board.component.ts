import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {InputInterface} from "../../models/input.interface";
import {Status} from "../../models/status.enum";
import {Position} from "../../models/position.model";
import {Commands} from "../../models/commands.enum";

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

    public size: { xSize: number, ySize: number };
    public currentPosition: Position;
    public status: Status;
    private commands: Set<Commands>;
    public xArrays = [];
    public yArrays = [];

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe((params: InputInterface) => {

            if (!params?.size.match('\^[0-9]+,[0-9]+\$') ||
                !params?.position.match('\^[0-9]+,[0-9]+\$') ||
                !params?.commands.match(`\^[ADG]+\$`) ||
                !params?.status.match(`\^[NEWS]{1}\$`)) {
                this.router.navigateByUrl('/');
            }
            const inputSize = params?.size;
            this.size = {
                xSize: parseInt(inputSize.split(',')[0], 10),
                ySize: parseInt(inputSize.split(',')[1], 10)
            };
            this.xArrays = Array(this.size.xSize).fill(0);
            this.yArrays = Array(this.size.ySize).fill(0);
            this.status = params.status;
            const inputPostion = params.position;
            this.currentPosition = new Position(
                parseInt(inputPostion.split(',')[1], 10),
                parseInt(inputPostion.split(',')[0], 10)
            );
            const inputCommands = params.commands;
            this.commands = new Set(inputCommands.split('')) as Set<Commands>;
        })
    }

    Array(size: number) {
        return Array(size);
    }
}
