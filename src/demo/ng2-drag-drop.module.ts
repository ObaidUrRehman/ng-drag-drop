import {NgModule} from '@angular/core';
import {Draggable} from "./directives/draggable";
import {Droppable} from "./directives/droppable";


@NgModule({
  imports: [],
  declarations: [
    Draggable,
    Droppable
  ],
  exports: [
    Draggable,
    Droppable
  ],
  providers: [],
})
export class Ng2DragDropModule {
}
