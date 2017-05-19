# Angular Drag & Drop (v2 and beyond)
[![npm version](https://img.shields.io/npm/v/ng2-drag-drop.svg)](https://www.npmjs.com/package/ng2-drag-drop) [![npm downloads](https://img.shields.io/npm/dm/ng2-drag-drop.svg)](https://www.npmjs.com/package/ng2-drag-drop) [![Devdependency Status](https://david-dm.org/ObaidUrRehman/ng2-drag-drop/dev-status.svg)](https://david-dm.org/ObaidUrRehman/ng2-drag-drop#info=devDependencies) [![Build Status](https://travis-ci.org/ObaidUrRehman/ng2-drag-drop.svg?branch=master)](https://travis-ci.org/ObaidUrRehman/ng2-drag-drop) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/f14c9c63579044e290d7d5cf9a9cda52)](https://www.codacy.com/app/orehman/ng2-drag-drop?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=ObaidUrRehman/ng2-drag-drop&amp;utm_campaign=Badge_Grade)

Drag & Drop for Angular 2 and beyond, based on HTML5 with no external dependencies. Provides `draggable` & `droppable` directives. Features:
* Transfer data from `draggable` to `droppable`.
* Restrict drop based on drag-drop scopes.
* Restrict drag to happen from either drag handles or the entire element.
* Add custom drag Helper Image
* Ability to add custom visual cue styles.

![Demo](https://raw.githubusercontent.com/ObaidUrRehman/ng2-drag-drop/master/drag-drop.gif)

# Demo

Check out the [Plunker demo](http://plnkr.co/edit/2bjGgzWnbFrciEiCKLew?p=preview).


The [demo folder](https://github.com/ObaidUrRehman/ng2-drag-drop/tree/master/demo) of the repository contains the same demo as Plunkr that uses SystemJS. To run that demo do an `npm install` in that folder followed by `npm start` to serve the demo app.

# Installation
```js
npm install ng2-drag-drop --save
```

# Usage

### Import default styles
Import `style.css` into your index.html. It has a set of default styles that will be applied upon drag operations. This is totally optional and you can modify the styles as per your need. See the [Adding visual cues](#adding-visual-cues) Section.

```html
<link rel="stylesheet" href="node_modules/ng2-drag-drop/style.css">
```

### Update SystemJS config
If you use SystemJS as your module loader then you will need to update the config to load the `ng2-drag-drop` module.
```js
System.config({
    map: {
        'ng2-drag-drop': 'node_modules/ng2-drag-drop'
    },
    packages: {
        'ng2-drag-drop':  { main: 'index.js',  defaultExtension: 'js' },
    }
});
```
### Import `Ng2DragDropModule`

You need to import the `Ng2DragDropModule` in the module of your app where you want to use it.

```js
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DemoComponent } from "./components/demo-component";
import { Ng2DragDropModule } from 'ng2-drag-drop';


@NgModule({
  imports: [BrowserModule, Ng2DragDropModule],
  declarations: [DemoComponent],
  bootstrap: [DemoComponent]
})
export class AppModule {}
```

### Use the `draggable` & `droppable` directives
Place the `draggable` directive on an element that you want to be draggable. The following example makes the
 List item draggable:

```html
<ul>
  <li draggable>Coffee</li>
  <li draggable>Tea</li>
  <li draggable>Milk</li>
</ul>               
```

Similarly use the `droppable` directive on an element where you want to drop `draggable`:
 
 ```html
 <div droppable>
   <p>Drop items here</p>
 </div>               
 ```

### Restrict Drop based on Scopes
You can use the `dragScope` & `dropScope` property on `draggable` and `droppable` respectively to restrict user from dropping a `draggable` element into a `droppable`.
 The Scope properties can either be string or an Array of string (to indicate multiple scope). The scopes must match in both to indicate compatible drag-drop zones.
 
 In the following example, only the `draggable` with the `drink` dropScope can be dropped on the first `droppable` and both `drink` and `meal` can be dropped in the second one.
 
```html
<ul>
  <li draggable [dragScope]="'drink'">Coffee</li>
  <li draggable [dragScope]="'drink'">Tea</li>
  <li draggable [dragScope]="'meal'">Biryani</li>
  <li draggable [dragScope]="'meal'">Kebab</li>
  ...
</ul>               
```

```html
<div droppable [dropScope]="'drink'" [dragOverClass]="'drag-target-border'">
  <p>Only Drinks can be dropped in the above container</p>
</div>               

<div droppable [dropScope]="['drink', 'meal']" [dragOverClass]="'drag-target-border'">
  <p>Both Meal and Drinks can be dropped in the above container</p>
</div>               
```
  
### Transfer Data via Drag Drop
You can transfer data from the `draggable` to the `droppable` via the `dragData` property on the `draggable` directive. 
 The data will be received in the `(onDrop)` event of the `droppable`:

```js
import {Component} from '@angular/core';

@Component({
    selector: 'app',
    template: `
<h3>Transfer Data via Drag Drop</h3>
<div class="row">
    <div class="col-sm-3">
        <ul class="list-group">
            <li draggable *ngFor="let item of items" [dragData]="item" class="list-group-item">{{item.name}}</li>
        </ul>
    </div>
    
    <div class="col-sm-3">
    <div class="panel panel-default" droppable (onDrop)="onItemDrop($event)">
        <div class="panel-heading">Drop Items here</div>
            <div class="panel-body">
                <li *ngFor="let item of droppedItems" class="list-group-item">{{item.name}}</li>
            </div>
        </div>
    </div>
</div>
`
})
export class AppComponent {
    items = [
            {name: "Apple", type: "fruit"},
            {name: "Carrot", type: "vegetable"},
            {name: "Orange", type: "fruit"}];
            
    onItemDrop(e: any) {
        // Get the dropped data here
        this.droppedItems.push(e.dragData);
    }
    constructor() { }
}             
```

### Drag Handle
Drag Handle can be defined for a `draggable` item which will restrict drag of the element unless the item is dragged from the specified element.
 The handle should be a valid selector string. Example: 
```html
<li draggable [dragHandle]="'.drag-handle'">
   Not Draggable by list item but by the handle only.    
   <div class="pull-right"><i class="drag-handle fa fa-bars fa-lg" aria-hidden="true"></i></div> 
</li>               
```

### Drag Helper Image
By default when an element is dragged, a translucent image is generated from the drag target. This image is generated automatically and varies with browser. A custom image can be used if desired. Pass the url of the image to `[dragImage]` on the `draggable` directive.

```html
<li draggable [dragImage] = "'../../images/drag-helper.png'" >
   Not Draggable by list item but by the handle only.    
   <div class="pull-right"><i class="drag-handle fa fa-bars fa-lg" aria-hidden="true"></i></div> 
</li>               
```
__Compatibility:__ This only works on Chrome & Firefox. Not supported on Edge.

### Adding visual cues
Both the `draggable` & `droppable` directives take a bunch of inputs that let you apply class on various events. Here is the list:

__Draggable Directive__
1. [dragHandleClass](#draggable-directive)
2. [dragClass](#draggable-directive)

__Droppable Directive__
1. [dragOverClass](#droppable-directive)
2. [dragHintClass](#droppable-directive)
 
 Here is how a custom class is applied to a draggable element:
 ```html
 <div draggable [dragHandleClass]="'my-draggable'">
   <p>Drop items here</p>
 </div>               
 ```

# API Doc
### Draggable directive

### Attributes

| Name   | Type      |Default Value |Description |
|:-------|:----------|:-------------|:-----------|
| `dragData`    |   `any` | `null` | The data that will be avaliable to the droppable directive on its `onDrop()` event. |
| `dragScope`   |    `string | Array<string>` | `'default'`   |  Defines compatible drag drop pairs. Values must match with `droppable.dropScope`. |
| `dragClass` (previously `dragOverClass`) | `string` | `'drag-border'` | CSS class applied on the draggable that is applied when the item is being dragged. |
| `dragHandleClass`  | `string` | `'drag-handle'` | The CSS class applied to a draggable element. If a dragHandle is defined then its applied to that handle element only. By default it is used to change the mouse over pointer. |
| `draghandle` | `string` | `null` | The selector that defines the drag Handle. If defined drag will only be allowed if dragged from the selector element. |
| `dragImage` | `string` | `null` | The url to image that will be used as custom drag image when the draggable is being dragged. |
| `dragEnabled` | `boolean` | `true` | Defines if drag is enabled. `true` by default. |

### Events

| Name   | Parameters  |Description |
|:-------|:------------|:-----------|
| `onDragStart`  | e: DOM event   | Event fired when Drag is started  |
| `onDrag`       | e: DOM event   | Event fired while the element is being dragged |
| `onDragEnd`    | e: DOM event   | Event fired when dragged ends |

For more information on Drag DOM Events: [Drag Event](https://developer.mozilla.org/en-US/docs/Web/API/DragEvent) 

### Droppable directive

### Attributes

| Name   | Type      |Default Value |Description |
|:-------|:----------|:-------------|:-----------|
| `dropScope` |    `string | Array<string>` | `'default'`   |   Defines compatible drag drop pairs. Values must match with `draggable.dragScope` |
| `dragOverClass` | `string` | `'drag-over-border'` | CSS class applied on the droppable element when the item is being dragged over valid drop target. |
| `dragHintClass` | `string` | `'drag-hint-border'` | CSS class applied on this droppable when a compatible draggable item is being dragged. This can be used to visually show allowed drop zones. |
| `dropEnabled` | `boolean` | `true` | Defines if drop is enabled. `true` by default. |

### Events

| Name   | Parameters  |Description |
|:-------|:------------|:-----------|
| `onDragEnter`  | e: DOM event   | Event fired when Drag dragged element enters a valid drop target.  |
| `onDragOver`       | e: DOM event   | Event fired when an element is being dragged over a valid drop target. |
| `onDragLeave`    | e: DOM event   | Event fired when a dragged element leaves a valid drop target. |
| `onDrop`    | e: `DropEventModel`   | Event fired when an element is dropped on a valid drop target. |

# License

MIT

