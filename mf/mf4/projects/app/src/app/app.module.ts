import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {
    const webComponent = createCustomElement(AppComponent, { injector });

    if (!customElements.get('ang-mf')) {
      customElements.define('ang-mf', webComponent);
    } else {
      let newDiv = document.createElement('ang-mf');
      newDiv.id = 'mf4';
      let header = document.querySelector('#header')!
      header.appendChild(newDiv);
    }
  }

  ngDoBootstrap() {}
}
