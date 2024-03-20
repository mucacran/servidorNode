import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Observable, Subject, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  bdC: string =
    'https://cms-byui-wd430-default-rtdb.firebaseio.com/contacts.json';

  contactSelectedEvent = new EventEmitter<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();

  maxContactId: number;
  contacts: Contact[] = [];

  constructor(private http: HttpClient) {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.bdC).pipe(
      map((contacts) => {
        // Assign the array of contacts received to the contacts property
        this.contacts = contacts;

        // Call the getMaxId() method to get the maximum value used for the id property
        this.maxContactId = this.getMaxId();
        console.log('desde contact.service_1: ' + this.maxContactId);

        // Sort the list of contacts by name
        this.contacts.sort((a, b) => a.name.localeCompare(b.name));

        this.contactListChangedEvent.next(this.contacts.slice());

        return contacts;
      })
    );
  }

  getContact(id: string): Contact {
    const c = this.contacts.find((c) => c.id === id);
    return c || null;
  }

  //semana 7
  getMaxId(): number {

    let maxId = 0;
    let currentId = 0;

    this.contacts.forEach(contact => {
      //convert document.id into a number
      currentId = +contact.id
      if (currentId > maxId) {
        maxId = currentId;
      }
    })
    return maxId;
  }

  addContact(newContact: Contact) {
    if (!newContact) {
        return;
    }
  
    this.maxContactId++;

    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.storeContacts();
  }
  
  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
        return;
    }
  
    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
        return;
    }
  
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.storeContacts();
  }
  

  deleteContact(contact: Contact) {
    if (!contact) {
       return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
       return;
    }
    this.contacts.splice(pos, 1);
    this.storeContacts();
 }

 storeContacts(){
  // Convertir el arreglo de documentos en formato de texto
  const contactsString = JSON.stringify(this.contacts);
  // Crear encabezados para la solicitud HTTP
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  // Realizar la solicitud HTTP PUT para actualizar la lista de documentos en el servidor Firebase
  this.http.put(this.bdC, contactsString, { headers }).subscribe({
    next:() => {
    // Emitir el evento documentListChangedEvent con una copia de los documentos para notificar al componente que la lista de documentos ha cambiado
    this.contactListChangedEvent.next(this.contacts.slice());
  }, error: (error: any) => {
    console.error('Error al almacenar contactos:', error);
  }});
}

}
