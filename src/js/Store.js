export default class Store {

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

    if(item) {
      return item;
    }

    throw Error('item with id not found');
  }

}
