export const inventory_statuses = {
  IN_STOCK: 1,
  SOLD: 2
};

export class Store {

  constructor(inventory) {

    if(!inventory) {
      throw Error('inventory required');
    }

    this.inventory = Array.from( inventory );

  }

  inventorySize() {
    return this.inventory.length;
  }

  inventoryAdd(item) {
    if(!item) {
      throw Error('item required');
    }

    this.inventory.push( item );
  }

  inventoryGetById( id ) {
    if(!id) {
      throw Error('id required');
    }

    var item = this.inventory.find((el) => {
      return el.id == id;
    });

    if ( item ) {
      return item;
    }

    throw Error('item with id not found');
  }

  inventorySell( id ) {
    let item = this.inventoryGetById(id);

    if ( item.status === inventory_statuses.SOLD ) {
      throw Error ('item is already marked as sold');
    }

    item.status = inventory_statuses.SOLD;

    return item;
  }

}
