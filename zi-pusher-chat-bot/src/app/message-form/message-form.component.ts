import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.css']
})
export class MessageFormComponent  {
  public  message:string = '';
  private isSending: boolean = false;
  private httpClient: HttpClient;

  public content: string = '';
  public errorMsg: string = '';
  public infoMsg: string = '';
  constructor(private http: HttpClient) {
    this.httpClient = http;
  }
  submit() {
    this.errorMsg = '';
    this.isSending = true;
    this.infoMsg = 'Processing your request.. Wait a minute';
    this.http
      .post('https://insentstaging1.widget.insent.ai/pusher/presence/auth/visitor?userid=womMft6C1xP7swWMP1670659379761',{
        userid:'womMft6C1xP7swWMP1670659379761'
      })
      .toPromise()
      .then((data) => {
        console.log(data);
        setTimeout(() => {
          this.infoMsg = '';
        }, 1000);

        this.isSending = false;
        this.content = '';
        
      })
      .catch(error => {
        this.infoMsg = '';
        this.errorMsg = error.error.message;

        this.isSending = false;
      });
  }
}
