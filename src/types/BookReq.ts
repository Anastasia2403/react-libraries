import { Book } from "./Book";

export interface BookReq {
  bookRQ: Book;
  tenantId?: string;
  bookId?: number;
}
