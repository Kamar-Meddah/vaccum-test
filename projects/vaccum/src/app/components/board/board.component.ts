import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {InputInterface} from "../../models/input.interface";
import {Status} from "../../models/status.enum";
import {Position} from "../../models/position.model";
import {Commands} from "../../models/commands.enum";
import {distinctUntilChanged} from "rxjs/operators";

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

    public size: { xSize: number, ySize: number };
    public currentPosition: Position;
    public status: Status;
    private commands: Array<Commands>;
    public xArrays = [];
    public yArrays = [];

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
        this
            .activatedRoute
            .queryParams
            .pipe(distinctUntilChanged())
            .subscribe((params: InputInterface) => {

                if (!params?.size.match('\^[0-9]+,[0-9]+\$') ||
                    !params?.position.match('\^[0-9]+,[0-9]+\$') ||
                    !params?.commands.match(`\^[ADG]+\$`) ||
                    !params?.status.match(`\^[NEWS]{1}\$`)) {
                    this.router.navigateByUrl('/');
                }
                const inputSize = params?.size;
                this.size = {
                    xSize: parseInt(inputSize.split(',')[1], 10),
                    ySize: parseInt(inputSize.split(',')[0], 10)
                };
                this.xArrays = Array(this.size.xSize).fill(0);
                this.yArrays = Array(this.size.ySize).fill(0);
                this.status = params.status;
                const inputPostion = params.position;
                this.currentPosition = new Position(
                    parseInt(inputPostion.split(',')[0], 10),
                    parseInt(inputPostion.split(',')[1], 10)
                );
                const inputCommands = params.commands;
                this.commands = inputCommands.split('') as Array<Commands>;
                setTimeout(() => {
                    this.processCommands()
                }, 2000)
            })
    }

    Array(size: number) {
        return Array(size);
    }

    private processCommands(): void {
        for (let i = 0; i < this.commands.length; i++) {
            setTimeout(() => {
                const command = this.commands[i];
                if (command === 'A') {
                    this.updatePosition();
                    console.log('advance')
                } else if (command === 'D') {
                    this.rotateRight();
                    console.log('right')
                } else if (command === 'G') {
                    this.rotateLeft();
                    console.log('left')
                }
                if(i===this.commands.length-1){
                    alert(`X = ${this.currentPosition.yCoordinate}, Y = ${this.currentPosition.xCoordinate}, orientation = ${this.status}`)
                }
            }, i * 1000);

        }

    }

    private rotateRight(): void {
        if (this.status === Status.NORTH) {
            this.status = Status.EAST;
        } else if (this.status === Status.EAST) {
            this.status = Status.SOUTH
        } else if (this.status === Status.SOUTH) {
            this.status = Status.WEST
        } else if (this.status === Status.WEST) {
            this.status = Status.NORTH
        }
    }

    private rotateLeft(): void {
        if (this.status === Status.NORTH) {
            this.status = Status.WEST;
        } else if (this.status === Status.EAST) {
            this.status = Status.NORTH
        } else if (this.status === Status.SOUTH) {
            this.status = Status.EAST
        } else if (this.status === Status.WEST) {
            this.status = Status.SOUTH
        }
    }

    private updatePosition(): void {
        if (this.status === Status.NORTH) {
            if (this.currentPosition.yCoordinate > 0) {
                this.currentPosition.yCoordinate--;
            }
        } else if (this.status === Status.EAST) {
            if (this.currentPosition.xCoordinate < this.size.xSize) {
                this.currentPosition.xCoordinate++
            }
        } else if (this.status === Status.SOUTH) {
            if (this.currentPosition.yCoordinate < this.size.ySize) {
                this.currentPosition.yCoordinate++
            }
        } else if (this.status === Status.WEST) {
            if (this.currentPosition.xCoordinate > 0) {
                this.currentPosition.xCoordinate--
            }
        }
    }
}
