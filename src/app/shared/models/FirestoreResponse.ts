import { FirestoreDocument } from './FirestoreDocument';

export interface FirestoreResponse {
  documents: FirestoreDocument[];
  nextPageToken: string;
}
