import { Component, ElementRef, OnInit, Input, OnDestroy } from '@angular/core';

import { ModalService } from '../../service/front/modal.service';

@Component({
  selector: 'app-modal',
  template: `<div class="app-modal">
              <div class="app-modal-body">
                  <ng-content></ng-content>
              </div>
            </div>
            <div class="app-modal-background"></div>`,
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() title: string;
  private element: any;

  constructor(
    private modalService: ModalService,
    private el: ElementRef
  ) {
    this.element = el.nativeElement;
    this.close();
  }
 
  ngOnInit(): void {
      let modal = this;

      // ensure id attribute exists
      if (!this.title) {
          console.error('modal must have an title');
          return;
      }

      // move element to bottom of page (just before </body>) so it can be displayed above everything else
      document.body.appendChild(this.element);

      // close modal on background click
      this.element.addEventListener('click', function (e: any) {
          if (e.target.className === 'app-modal') {
              modal.close();
          }
      });

      // add self (this modal instance) to the modal service so it's accessible from controllers
      this.modalService.add(this);
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
      this.modalService.remove(this.title);
      this.element.remove();
  }

  // open modal
  open(): void {
      this.element.style.display = 'block';
      document.body.classList.add('show');
  }

  // close modal
  close(): void {
      this.element.style.display = 'none';
      document.body.classList.remove('show');
  }

}
