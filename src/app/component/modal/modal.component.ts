import { Component, ElementRef, OnInit, Input, OnDestroy } from '@angular/core';

import { ModalService } from 'src/app/service/front/modal.service';
import { GuardService } from 'src/app/service/auth/guard.service';
import { AuthentService } from 'src/app/service/auth/authent.service';

export class ICloseOption{
  conditionToRedirect : string;
  redirect : string;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() title: string;
  private element: any;

  constructor(
    private modalService: ModalService,
    public auth: AuthentService,
    private guard: GuardService,
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
  open(closeOption: ICloseOption = null): void {
    if(closeOption !== null){
      this['closeOption'] = closeOption;
    }
    this.element.style.display = 'block';
    document.body.classList.add('show');
  }

  // close modal
  close(): void {
    this.element.style.display = 'none';
    document.body.classList.remove('show');
    if(this['closeOption']){
      //console.log(eval(this['closeOption'].conditionToRedirect));
      if(eval(this['closeOption'].conditionToRedirect) === true){
        this.guard.redirect(this['closeOption'].redirect);
      }
    }
  }

}
