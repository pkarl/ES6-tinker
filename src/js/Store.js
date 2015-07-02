var _ = require('lodash');

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

  // inventorySize(null, inventory_status.SOLD)

  inventorySize(sku, status) {
    sku = sku || false;
    status = status || false;

    if(!sku && !status) {
      return this.inventory.length;
    }

    let items = this.inventory;

    if(sku) {
      items = items.filter( (item) => {
        return item.sku === sku;
      });
    }

    if(status) {
      items = items.filter( (item) => {
        return item.status === status;
      });
    }

    return items.length;
  }

  inventoryAdd(item) {
    if(!item) {
      throw Error('item required');
    }

    this.inventory.push( Object.assign({}, item) );
  }

  // { 'name': string }
  // { 'sku': int }
  // { 'id': int }
  // { 'status': int??? }
  // { sku: 2, status: inventory_status.SOLD }
  //
  findBy(options) {
    return this.inventory.reduce( ( accumlator, item ) => {
      for (var key in options) {
        if (item.hasOwnProperty(key) && item[key] === options[key]) {
          accumlator.push(item);
        }
      }
      return accumlator;
    }, []);
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
