import { NgModule, ModuleWithProviders } from '@angular/core';
import { Draggable } from './directives/draggable.directive';
import { Droppable } from './directives/droppable.directive';
import { Sortable } from './directives/sortable.directive';
import { SortableContainer } from './directives/sortable-container.directive';
import { Ng2DragDropService, Ng2SortableService } from './services/ng2-drag-drop.service';


@NgModule({
  imports: [],
  declarations: [
    Draggable,
    Droppable,
    Sortable,
    SortableContainer
  ],
  exports: [
    Draggable,
    Droppable,
    Sortable,
    SortableContainer
  ],
  providers: [
    Ng2DragDropService,
    Ng2SortableService
  ]
})
export class Ng2DragDropModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Ng2DragDropModule,
      providers: [Ng2DragDropService]
    };
  }
}
