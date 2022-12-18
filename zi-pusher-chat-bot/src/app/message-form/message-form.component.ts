import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.css']
})
export class MessageFormComponent implements OnInit,OnChanges {
  @Input() message = 'test1';
  @Input() isChatBot = false;
  @Input() dataInput = {} as any;

  ngOnInit() {
    console.log(this.isChatBot);
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(this.isChatBot);
  }
}
