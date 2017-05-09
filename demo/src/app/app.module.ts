import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DemoComponent } from './components/demo-component';

import {Ng2DragDropModule} from 'ng2-drag-drop';


@NgModule({
  imports: [BrowserModule, FormsModule, Ng2DragDropModule],
  declarations: [DemoComponent],
  bootstrap: [DemoComponent],
  providers: []
})
export class AppModule {}
