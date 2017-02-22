import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {DemoComponent} from "./components/demo-component";
import {Ng2DragDropModule} from "./Ng2DragDrop/ng2-drag-drop.module";


@NgModule({
  imports: [BrowserModule, Ng2DragDropModule],
  declarations: [DemoComponent],
  bootstrap: [DemoComponent],
  providers: []
})
export class AppModule {}
