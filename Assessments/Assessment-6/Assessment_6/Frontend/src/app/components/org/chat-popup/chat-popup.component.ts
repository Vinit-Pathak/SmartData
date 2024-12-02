import { Component, EventEmitter, Output } from '@angular/core';
import { ChatService } from '../../../service/chat/chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as signalR from '@microsoft/signalr';

@Component({
  selector: 'app-chat-popup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-popup.component.html',
  styleUrls: ['./chat-popup.component.css']
})
export class ChatPopupComponent {
  message: string = "";
  messages: { text: string, user: string }[] = [];
  userName = sessionStorage.getItem('Name') || '';

  private _chatHubConnection: signalR.HubConnection | null | undefined;

  ngOnInit(): void {
    this._chatHubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`https://localhost:7053/chathub`, {
        timeout: 600000
      })
      .configureLogging(signalR.LogLevel.Error)
      .build();

    this.startHubConnection(this._chatHubConnection);

    this._chatHubConnection.on("messageRecieved", (message: string, user: string) => {
      this.messages.push({ text: message, user: user });
      this.message = "";
    });
  }

  onLogout() {
    this.userName = '';
    this.messages = [];
    this._chatHubConnection?.stop().then(() => {
      console.log('Connection stopped');
    }).catch((err) => {
      console.error('Error stopping connection:', err);
    });
  }

  onMessageSent() {
    this._chatHubConnection?.invoke("messageSent", this.message, this.userName);
  }

  private startHubConnection(hubConnection: signalR.HubConnection): Promise<signalR.HubConnection> {
    return hubConnection
      .start()
      .then(() => {
        console.log('Connection started. Connection ID:', hubConnection.connectionId);
        return hubConnection;
      })
      .catch(err => {
        console.error('Error while starting connection: ', err);
        return hubConnection;
      });
  }
}