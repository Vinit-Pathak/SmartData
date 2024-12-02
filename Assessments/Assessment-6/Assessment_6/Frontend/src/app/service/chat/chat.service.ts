import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private hubConnection: signalR.HubConnection;
  private messageReceived = new Subject<string>();

  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:7053/chathub')
      .build();

    this.hubConnection.on('ReceiveMessage', (message: string) => {
      this.messageReceived.next(message);
    });

    this.hubConnection.start().catch(err => console.error(err));
  }

  sendMessage(message: string) {
    this.hubConnection.invoke('SendMessage', message).catch(err => console.error(err));
  }

  receiveMessage(): Observable<string> {
    return this.messageReceived.asObservable();
  }
}