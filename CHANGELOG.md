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

