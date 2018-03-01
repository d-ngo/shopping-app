import { Directive, ElementRef, HostListener, Renderer2, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  
  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  @HostListener('click') toggleShow() {
    const el = this.elRef.nativeElement.nextElementSibling;
    if(el.classList.contains('show')) {
      this.renderer.removeClass(el, 'show');
    } else {
      this.renderer.addClass(el, 'show');
    }
  }
}
