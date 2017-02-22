export class DropEvent {
    nativeEvent: any;
    dragData: any;

    constructor(event: any, data: any) {
        this.nativeEvent = event;
        this.dragData = data;
    }
}