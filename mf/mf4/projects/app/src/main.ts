import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

const Engine = window['Engine'];
if (environment.production) {
  enableProdMode();
}

const MF4 = {
  id: 'mf4',
  render: () =>
    platformBrowserDynamic()
      .bootstrapModule(AppModule)
      .catch((err) => console.error(err)),
  unmount: () => {
    console.log('unmounting angular');
    document.querySelector('ang-mf')?.remove();
     platformBrowserDynamic().destroy()
  },
};

Engine.register(MF4);
