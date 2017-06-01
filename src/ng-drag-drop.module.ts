import { NgModule, ModuleWithProviders } from '@angular/core';
import { Draggable } from './directives/draggable.directive';
import { Droppable } from './directives/droppable.directive';
import { Sortable } from './directives/sortable.directive';
import { SortableContainer } from './directives/sortable-container.directive';
import { NgDragDropService, Ng2SortableService } from './services/ng-drag-drop.service';


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
  ]
})
export class NgDragDropModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgDragDropModule,
      providers: [NgDragDropService, Ng2SortableService]
    };
  }
}
