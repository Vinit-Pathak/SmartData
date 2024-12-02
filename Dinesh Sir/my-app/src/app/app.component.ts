import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

import * as signalR from '@microsoft/signalr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'my-app';
  message: string = "";
  messages: string[] = [];

  userName: string = "";
  isUserLoggedIn: boolean = false;

  private _chatHubConnection: signalR.HubConnection | null | undefined;

  ngOnInit(): void {
    this._chatHubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`https://localhost:7175/chathub`, {
        timeout: 600000
      })
      .configureLogging(signalR.LogLevel.Error)
      .build();

    this.startHubConnection(this._chatHubConnection);

    this._chatHubConnection.on("messageRecieved", (message: string, user: string) => {
      this.messages.push(`${user}: ${message}`);
      this.message = "";
    });
  }

  onLogin() {
    this.isUserLoggedIn = true;
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
