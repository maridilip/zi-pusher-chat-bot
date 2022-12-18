import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import Pusher from 'pusher-js';

@Injectable({
  providedIn: 'root',
})
export class PusherChatServiceService {
  private subject: Subject<Message> = new Subject<Message>();
  private pusherClient: Pusher;

  constructor() {
    this.pusherClient = new Pusher('cace7e82a44adb737fef', {
      cluster: 'mt1',
      authEndpoint:
        'https://insentstaging1.widget.insent.ai/pusher/presence/auth/visitor?userid=BLnlokmrahewT7RQ01671012390815',
      auth: {
        headers: {
          Authorization: 'Bearer C6RZpH3Ym4HphfpKHmHD',
        },
      },
    });
    const channel = this.pusherClient.subscribe(
      'presence-insentstaging1-widget-user-BLnlokmrahewT7RQ01671012390815'
    );

    channel.bind(
      'server-message',

      (data: any) => {
        console.log('server-message', data);
        this.subject.next(
          new Message(
            data?.messages[0].type == 'input'
              ? 'Welcome'
              : data?.messages[0]?.text,
            data?.sender?.id === 'bot',
            data?.messages[0].type == 'input' ? data?.messages[0]?.input[0] : {}
          )
        );
      }
    );
    channel.bind('client-widget-message', (data: any) => {
      console.log('client-widget-messge', data);
      this.subject.next(
        new Message(
          data?.message.text || '@test bot',
          data?.sender?.id === 'bot'
        )
      );
    });
    channel.bind('pusher:subscription_succeeded', (data: any) => {
      console.log('pusher succeeded', data);
      this.subject.next(new Message('Component initialized', true));
    });
  }

  getMessages(): Observable<Message> {
    return this.subject.asObservable();
  }
}

export class Message {
  constructor(
    public message: string,
    public isChatBot: boolean,
    public dataInput?: object
  ) {
    this.message = message;
    this.isChatBot = isChatBot;
    this.dataInput = dataInput;
  }
}
