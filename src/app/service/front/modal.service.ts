import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modals: any[] = [];

  constructor() { }
 
  add(modal: any) {
      // add modal to array of active modals
      this.modals.push(modal);
  }

  remove(title: string) {
      // remove modal from array of active modals
      this.modals = this.modals.filter(x => x.title !== title);
  }

  open(title: string, closeOption = null) {
    // open modal specified by title
    let modal: any = this.modals.filter(x => x.title === title)[0];
    modal.open(closeOption);
  }
  
  close(title: string, executeCloseOption: boolean = true) {
    // close modal specified by title
    let modal: any = this.modals.filter(x => x.title === title)[0];
    modal.close(executeCloseOption);
  }
}
