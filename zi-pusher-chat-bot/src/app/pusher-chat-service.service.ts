import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import Pusher from 'pusher-js';

@Injectable({
  providedIn: 'root'
})
export class PusherChatServiceService {
  private subject: Subject<Message> = new Subject<Message>();
  private pusherClient: Pusher;

  constructor() { 
    this.pusherClient = new Pusher('9899c4665953dcebb475', { cluster: 'ap2' });
    const channel = this.pusherClient.subscribe('realtime-feeds');
    
        channel.bind(
          'posts',
          (data: { message: string; }) => {
            this.subject.next(new Message(data.message));
          }
        );
  }

  getMessages(): Observable<Message> {
    return this.subject.asObservable();
  }
}

export class Message {
  constructor(
    public message: string,
    
  ) {
    this.message = message;
    
  }
}