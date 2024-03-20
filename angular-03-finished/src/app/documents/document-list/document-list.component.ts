import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  OnDestroy,
} from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css',
})

export class DocumentListComponent implements OnInit, OnDestroy {
  documents: Document[] = [];
  documentId: string = '';
  subscription: Subscription;

  constructor(private documentService: DocumentService) {}

  ngOnInit() {
    this.subscription = this.documentService.getDocuments().subscribe({
      next: (documents: Document[]) => {
        this.documents = documents;
      },
      error: (error: any) => {
        console.error(error); // Maneja el error de manera adecuada
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
