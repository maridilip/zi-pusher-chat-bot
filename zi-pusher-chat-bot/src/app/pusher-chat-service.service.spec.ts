import { TestBed } from '@angular/core/testing';

import { PusherChatServiceService } from './pusher-chat-service.service';

describe('PusherChatServiceService', () => {
  let service: PusherChatServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PusherChatServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
