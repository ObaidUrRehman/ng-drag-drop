import { DropEvent } from "../../shared/drop-event.model";
export declare class DemoComponent {
    items: {
        name: string;
        type: string;
    }[];
    droppedFruits: any[];
    droppedVegetables: any[];
    onFruitDrop(e: DropEvent): void;
    onVegetableDrop(e: DropEvent): void;
    removeItem(item: any): void;
}
