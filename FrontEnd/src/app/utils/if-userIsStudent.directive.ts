import { Directive, inject, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subject, takeUntil } from 'rxjs';

@Directive({
  selector: '[ifStudent]',
  standalone: false
})
export class IfUserIsStudentDirective implements OnInit {


  protected authSrv = inject(AuthService);
  protected viewContainer = inject(ViewContainerRef);
  protected templatedRef = inject<TemplateRef<any>>(TemplateRef)

ngOnInit() {


  this.authSrv.fetchUser().subscribe((user: any)=>{
    if(user?.role==="student"){
          this.viewContainer.createEmbeddedView(this.templatedRef);
        } else {
          this.viewContainer.clear();
        }
})

}

}