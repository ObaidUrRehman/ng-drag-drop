import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { DemoComponent } from './demo-component';
import { DragHelperComponent } from './drag-helper/drag-helper.component';
import { DefaultCssComponent } from './default-css/default-css.component';
import { DeleteItemComponent } from './delete-item/delete-item.component';
import { SwapListComponent } from './swap-list/swap-list.component';
import { CompleteDemoComponent } from './complete-demo/complete-demo.component';
import { SortableDemoComponent } from './sortable-demo/sortable-demo.component';

import { Ng2DragDropModule } from 'ng2-drag-drop';


@NgModule({
  imports: [BrowserModule, FormsModule, Ng2DragDropModule],
  declarations: [DemoComponent,
  CompleteDemoComponent,
  SwapListComponent,
  DeleteItemComponent,
  DefaultCssComponent,
  DragHelperComponent,
  SortableDemoComponent],
  bootstrap: [DemoComponent],
  providers: []
})
export class AppModule {}
