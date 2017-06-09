import { NgModule, ModuleWithProviders } from '@angular/core';
import { Draggable } from './directives/draggable.directive';
import { Droppable } from './directives/droppable.directive';
import { Ng2DragDropService } from './services/ng2-drag-drop.service';


@NgModule({
  imports: [],
  declarations: [
    Draggable,
    Droppable
  ],
  exports: [
    Draggable,
    Droppable
  ]
})
export class Ng2DragDropModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Ng2DragDropModule,
      providers: [Ng2DragDropService]
    }
  }
}
