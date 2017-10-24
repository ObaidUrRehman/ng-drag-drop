import { NgModule } from '@angular/core';
import { DropScopeFunctionDemoComponent } from './drop-scope-function-demo/drop-scope-function.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { DemoComponent } from './demo-component';
import { DragHelperComponent } from './drag-helper/drag-helper.component';
import { DefaultCssComponent } from './default-css/default-css.component';
import { DeleteItemComponent } from './delete-item/delete-item.component';
import { SwapListComponent } from './swap-list/swap-list.component';
import { CompleteDemoComponent } from './complete-demo/complete-demo.component';
import { PerformanceDemoComponent } from './performance-demo/performance-demo.component';

import { NgDragDropModule } from 'ng-drag-drop';


@NgModule({
  imports: [BrowserModule, FormsModule, NgDragDropModule.forRoot()],
  declarations: [DemoComponent,
  CompleteDemoComponent,
  SwapListComponent,
  DeleteItemComponent,
  DefaultCssComponent,
  DragHelperComponent,
  DropScopeFunctionDemoComponent,
  PerformanceDemoComponent],
  bootstrap: [DemoComponent],
  providers: []
})
export class AppModule {}
