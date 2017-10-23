import { NgModule, ModuleWithProviders } from '@angular/core';
import { Draggable } from './directives/draggable.directive';
import { Droppable } from './directives/droppable.directive';
import { NgDragDropService } from './services/ng-drag-drop.service';


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
export class NgDragDropModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgDragDropModule,
      providers: [NgDragDropService]
    };
  }
}
