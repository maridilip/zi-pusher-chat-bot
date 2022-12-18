import {Component, ComponentRef,  OnInit, ViewChild, ViewContainerRef} from '@angular/core';

import { PusherChatServiceService } from './pusher-chat-service.service';
import { MessageFormComponent } from './message-form/message-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-chat-application';
  @ViewChild("viewContainerRef", { read: ViewContainerRef }) vcr!: ViewContainerRef;
  ref!: ComponentRef<MessageFormComponent>;

  //wo:any;
  constructor(private pusherChatServiceService:PusherChatServiceService ) {
   // this.wo = this.document.defaultView;
  }
  addChild(message: string, isChatBot: boolean, dataInput: {} | undefined) {
    let ref = this.vcr.createComponent(MessageFormComponent);
    ref.setInput('message', message);
    console.log(typeof isChatBot);
    ref.setInput('isChatBot', isChatBot);
    ref.setInput('dataInput', dataInput || {});
    ref.changeDetectorRef.detectChanges();
  }

  ngOnInit() {
    this.pusherChatServiceService.getMessages().subscribe((data) => {
      this.addChild(data.message, data.isChatBot, data.dataInput);
    });
  }

  onkeyDown() {
    console.log('user started typing');
  }
}
