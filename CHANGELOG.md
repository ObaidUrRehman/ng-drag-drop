## 5.0.0 (2018-06-20)
- Migrate to angular 6.0.1 and Rxjs 6.1.0 Pull Request ([#135](https://github.com/ObaidUrRehman/ng2-drag-drop/pull/135))

## 4.0.1 (2018-04-03) - Maintenance Release
- Fix: Allow draghandle to work for touchscreens when used with polyfill. Pull Request ([#112](https://github.com/ObaidUrRehman/ng2-drag-drop/pull/112))
- Fix: Overlapping droppable with non matching dropScope steals drop event.  Pull Request ([#110](https://github.com/ObaidUrRehman/ng2-drag-drop/pull/110))
## 4.0.0 (2017-10-24)
- Package renamed to `ng-drag-drop`
- Module renamed from `Ng2DragDropModule` to `NgDragDropModule`
- Package no longer compatible with Angular 2.0. Peer dependency is now angular >= 4.3.0 
## 3.0.2 (2017-10-23)
- Package `ng2-drag-drop` deprecated. This is the final release. Renamed to `ng-drag-drop`.
## 3.0.1 (2017-10-19)
- Add support for async dropScope function, closes
([#97](https://github.com/ObaidUrRehman/ng2-drag-drop/issues/97)) via Pull Request ([#98](https://github.com/ObaidUrRehman/ng2-drag-drop/pull/98))
- Fix null draghandler, closes
([#100](https://github.com/ObaidUrRehman/ng2-drag-drop/issues/100))

## 3.0.0 (2017-10-19)
- Version skipped

## 2.9.2 (2017-09-19)
- This is actually version 2.9.0. See the note below.

## 2.9.0, 2.9.1 (2017-09-19)
__Note:__ These versions are skipped because npm failed to execute `prepublishonly` task before publishing.
Enhacements:
- Performance Improvement, closes ([#86](https://github.com/ObaidUrRehman/ng2-drag-drop/issues/86)) via 
Pull Request ([#94](https://github.com/ObaidUrRehman/ng2-drag-drop/pull/94))

## 2.8.0 (2017-09-14)
Bugfixes:
- Fixed AOT Compilation, closes
([#95](https://github.com/ObaidUrRehman/ng2-drag-drop/issues/95))

## 2.7.0 (2017-09-13)
__Note:__ This version is broken and does not compile under AOT, use 2.8.0 instead.

Enhacements:
- Added `dragTransit` class, closes
([#87](https://github.com/ObaidUrRehman/ng2-drag-drop/issues/87))

Bugfixes:
- Drag handle intermittently not working, closes
([#89](https://github.com/ObaidUrRehman/ng2-drag-drop/issues/89))


## 2.6.0 (2017-08-17)
Enhacements:
- DropScope can now be function, closes
([#79](https://github.com/ObaidUrRehman/ng2-drag-drop/issues/79))
- Use use `prepublishOnly` instead of `prepublish` script in `package.json`, closes
([#78](https://github.com/ObaidUrRehman/ng2-drag-drop/issues/78))

## 2.5.0 (2017-07-18)
Bugfixes:
- Set draggble property on the `draggable` directive via `HostBinding()`. Resolves ([#65](https://github.com/ObaidUrRehman/ng2-drag-drop/issues/65))
- Use DropEvent for Type Checking, pull request
([#63](https://github.com/ObaidUrRehman/ng2-drag-drop/pull/63))
- Droppable not working between different components, closes ([#50](https://github.com/ObaidUrRehman/ng2-drag-drop/issues/50)) via pull request ([#61](https://github.com/ObaidUrRehman/ng2-drag-drop/pull/61))

## 2.0.1 (2017-05-29)
Bugfixes:
- Clear service data on drop end, closes
([#56](https://github.com/ObaidUrRehman/ng2-drag-drop/issues/56))

## 2.0.0 (2017-05-19)
Bugfixes:
- dragOverClass assigned to non valid drop targets, closes
([#28](https://github.com/ObaidUrRehman/ng2-drag-drop/issues/28))
- unable to transpile with tsc 2.3.2, node 7.10.0, npm 4.2.0, pull request
([#51](https://github.com/ObaidUrRehman/ng2-drag-drop/pull/51))
- fixed issue where the dragImage was not displayed on first drag operation, is appended to DOM and stays there forever.

Enhacements:
- Added a default set of CSS that can be used out of the box.
- Added `dragHandleClass` on `draggable` that is applied to either draggable or its handle element (if defined).

__BREAKING CHANGES__
* `Draggable.dragOverClass` has been renamed to `dragClass`

## 1.5.1 (2017-04-19)

Bugfixes:

- ObjectUnsubscribedError bug fix, closes
([#43](https://github.com/ObaidUrRehman/ng2-drag-drop/issues/43))

## 1.5.0 (2017-04-17)

Enhacements:

- Added ability to disable draggable and droppable, closes
([#41](https://github.com/ObaidUrRehman/ng2-drag-drop/issues/41))

- Highlight valid drop targets upon drag start, closes
([#27](https://github.com/ObaidUrRehman/ng2-drag-drop/issues/27))

- Added custom dragHandler feature on draggable. Currently only supports images will enhance this in later releases, closes
([#22](https://github.com/ObaidUrRehman/ng2-drag-drop/issues/22))


## 1.4.1 (2017-04-11)

Bugfixes:

- Fix for firefox, closes ([#40](https://github.com/ObaidurRehman/ng2-drag-drop/issues/40))

## 1.4.0 (2017-04-08)

Bugfixes:

- Removed dependencies & added peerDependencies. Should resolve AOT build issues
([#24](https://github.com/ObaidUrRehman/ng2-drag-drop/issues/24)) &
([#38](https://github.com/ObaidUrRehman/ng2-drag-drop/issues/38))



## 1.3.0 (2017-04-06)

Enhacements:

- Added AOT Support, closes
([#24](https://github.com/ObaidUrRehman/ng2-drag-drop/issues/24))

## 1.2.0 (2017-03-10)

Bugfixes:

- removed `draggable=false` attribute on droppable, closes 
([#13](https://github.com/ObaidUrRehman/ng2-drag-drop/issues/13))


Enhacements:

- droppable.dragOverClass is applied only on droppable element, closes 
([#15](https://github.com/ObaidUrRehman/ng2-drag-drop/issues/15))


## 1.1.0 (2017-03-09)

Enhacements:

- droppable.dragOverClass is applied only on droppable element, closes 
([#15](https://github.com/ObaidUrRehman/ng2-drag-drop/issues/15))


## 1.0.0 (2017-03-07)

Bugfixes:

- Support Microsoft Edge Browser, closes ([#8](https://github.com/ObaidurRehman/ng2-drag-drop/issues/8))

Features:
- Scope is now an array of string, closes ([#11](https://github.com/ObaidurRehman/ng2-drag-drop/issues/8))

