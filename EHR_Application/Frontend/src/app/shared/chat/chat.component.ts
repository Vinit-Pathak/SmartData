import { Component, inject, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue, child, push } from 'firebase/database';
import { firebaseConfig } from '../../others/firebase-config';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements OnInit {
  senderId: string = '';
  receiverId: string = '';
  message: string = '';
  messages: any[] = [];
  userData = JSON.parse(sessionStorage.getItem('userData') || '{}');

  constructor(private route: ActivatedRoute, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.senderId = this.userData.userId;

    if (this.userData.userTypeId === 1) {
      this.receiverId = this.route.snapshot.paramMap.get('providerId')!;
    } else {
      this.receiverId = this.route.snapshot.paramMap.get('patientId')!;
    }

    this.listenForMessages(this.senderId, this.receiverId);
  }

  sendMessage(receiverId: string, message: string): void {
    const trimmedMessage = message.trim();

    // Validate message
    if (!trimmedMessage) {
      this.toastr.error('Message cannot be empty.', 'Validation Error',{
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
      });
      return;
    }

    const messageId = push(ref(db, `messages/${this.senderId}_${receiverId}`)).key;
    const senderName = this.userData.firstName + ' ' + this.userData.lastName;

    if (messageId) {
      const messageRefSenderReceiver = ref(db, `messages/${this.senderId}_${receiverId}/${messageId}`);
      set(messageRefSenderReceiver, {
        senderId: this.senderId,
        senderName: senderName,
        receiverId: receiverId,
        message: trimmedMessage,
        timestamp: Date.now(),
      });

      const messageRefReceiverSender = ref(db, `messages/${receiverId}_${this.senderId}/${messageId}`);
      set(messageRefReceiverSender, {
        senderId: this.senderId,
        senderName: senderName,
        receiverId: receiverId,
        message: trimmedMessage,
        timestamp: Date.now(),
      });
    }

    this.message = ''; 
  }

  listenForMessages(senderId: string, receiverId: string): void {
    const messagesRefSenderReceiver = ref(db, `messages/${senderId}_${receiverId}`);
    const messagesRefReceiverSender = ref(db, `messages/${receiverId}_${senderId}`);

    onValue(messagesRefSenderReceiver, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        this.messages = Object.values(data).sort((a: any, b: any) => a.timestamp - b.timestamp);
      }
    });

    onValue(messagesRefReceiverSender, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        this.messages = Object.values(data).sort((a: any, b: any) => a.timestamp - b.timestamp);
      }
    });
  }




}
