import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Status} from "../../models/status.enum";

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss']
})
export class SquareComponent implements OnInit {

  @Input('current') public current:boolean=false;
  @Input('status') public status:Status;

  constructor(private activatedRoute:ActivatedRoute) { }

  ngOnInit() {}

}
