import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';
import {MessageService} from '../message.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
})

export class MessageListComponent implements OnInit{

    //sample list of message to the test this component
    messages: Message[]=[];
    subscription: Subscription;

    constructor(private messageService: MessageService){}

    ngOnInit(): void {
      this.subscription = this.messageService.getMessages().subscribe({
        next: (messages: Message[]) => {
          this.messages = messages;
        },
        error: (error: any) => {
          console.error(error); // Maneja el error de manera adecuada
        },
      });
    }
}