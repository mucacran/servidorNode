import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Message } from "../message.model";
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})
export class MessageEditComponent implements OnInit {
  //custom EventEmitter to output the new Message object up to the MessageListComponent
  @Output() addMessageEvent = new EventEmitter<Message>();

  //We need values entered in the subject and msgText input elements from the Document Object Model (DOM)
  //Use the @viewChild property decorator  to creates an ElementRef for the subject and msgText input elements in the DOM
  @ViewChild('subject') subject: ElementRef;
  @ViewChild('msgText') msgText: ElementRef;




  //Created a string named currentSender and initialized int with the value of you name
  currentSender: string = 'Brother Sergio';

  constructor(private messageService:MessageService) { }

  ngOnInit(): void { }

  // onSendMessage() {
  //   //get the value stored in the subject
  //   const subject = this.subject.nativeElement.value;
  //   //get the value stored in the msgText
  //   const msgText = this.msgText.nativeElement.value;
  //   //assign a hardcoded number to the id property of the new Message object
  //   const message = new Message('1', subject, msgText, this.currentSender);
  //   // call the addMessageEvent emitter emit() metho and pass it the new message
  //   this.addMessageEvent.emit(message);
  // }

  onSendMessage(){
    const subject = this.subject.nativeElement.value;
    const msgText = this.msgText.nativeElement.value;
    const message = new Message(this.messageService.getNextId(), subject, msgText, "0");
    this.messageService.addMessage(message);
  }

  onClear() {
    //assigned a blank value to the subject and msgText input elements in the form
    this.subject.nativeElement.value = '';
    this.msgText.nativeElement.value = '';

  }
}
