import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model'
import { MOCKMESSAGES } from './MOCKMESSAGES'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  bdM: string = 'https://cms-byui-wd430-default-rtdb.firebaseio.com/messages.json';

  maxMessageId:number;
  message: Message[]=[];
  //
  messageChangedEvent  = new EventEmitter<Message[]>();
  messageListChangedEvent = new Subject<Message[]>();

  constructor(private http: HttpClient) {
    this.message = MOCKMESSAGES;
  }

  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(this.bdM).pipe(
      map((documents) => {
        // Assign the array of documents received to the documents property
        this.message = documents;

        // Call the getMaxId() method to get the maximum value used for the id property
        this.maxMessageId = this.getMaxId();
        console.log('desde document.list1: ' + this.maxMessageId);

        return documents;
      })
    );
  }

  getMessage(id: string): Message {
    return this.message.find((c) => c.id === id);
  }

  addMessage(message:Message){
    this.message.push(message);
    this.storeMessages();
  }

  getNextId(): string {
    return (this.message.length > 1) ? '' + (Number(this.message[this.message.length - 1].id) + 1) : '0';
  }

  getMaxId(): number {
    let maxId = 0;
    for (let message of this.message) {
      let currentId = parseInt(message.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  storeMessages(){
    // Convertir el arreglo de documentos en formato de texto
    const messageString = JSON.stringify(this.message);
    // Crear encabezados para la solicitud HTTP
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    // Realizar la solicitud HTTP PUT para actualizar la lista de documentos en el servidor Firebase
    this.http.put(this.bdM, messageString, { headers }).subscribe({
      next:() => {
      // Emitir el evento messageListChangedEvent con una copia de los documentos para notificar al componente que la lista de documentos ha cambiado
      this.messageListChangedEvent.next(this.message.slice());
    }, error: (error: any) => {
      console.error('Error al almacenar documentos:', error);
    }});
  }
}
