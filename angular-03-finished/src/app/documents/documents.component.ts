import { Component } from '@angular/core';
import { Document } from './document.model';
import { DocumentService } from './document.service';

@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css'
})
export class DocumentsComponent {
  selectedDocument: Document;

  ///
  constructor(private documentService:DocumentService){}

  ngOnInit(): void{
    this.documentService.documentSelectedEvent.subscribe((contact:Document) => {
      this.selectedDocument = contact;
    })
  }
}