var chai = require('chai');
var expect = chai.expect;

import Store from '../src/js/Store.js';

const inventory_statuses = {
  IN_STOCK: 1,
  SOLD: 2
};

let test_inventory = [
  {
    id: 1,
    name: "test item prime",
    status: inventory_statuses.IN_STOCK
  }
];

describe('Class', () => {
  it('should exist', () => {
    expect(Store).to.exist;
  });
});

describe('Store', () => {

  // purchase
  // inventory add/remove
  // errors ()

  // initalize db
  it('should not initialize without an inventory', () => {

    expect( () => { new Store() } ).to.throw('inventory required');

    let store = null;
    expect( () => { store = new Store(test_inventory) } ).to.not.throw('inventory required');
    expect( store ).to.be.an.instanceOf(Store);

  });

  // inventory add (increment based on key matches)
  it('should add an item to the inventory, when we provide an item (or fail accordingly)', () => {

    let store = new Store( test_inventory );
    let item = {
      id: 2,
      name: 'test item',
      status: inventory_statuses.IN_STOCK
    };

    expect( () => { store.inventoryAdd(); } ).to.throw('item required');

    let inventory_size = store.inventorySize();
    store.inventoryAdd( item );

    expect( store.inventorySize() ).to.be.above( inventory_size );

  });

  it('should return an item when we ask for it by ID', () => {

    let store = new Store( test_inventory );

    expect( () => { store.inventoryGetById() } ).to.throw('id required');

    expect( () => { store.inventoryGetById(-1) }).to.throw('item with id not found');

    let item = store.inventoryGetById(1);
    expect( item ).to.deep.equal( test_inventory[0] );

  });

  // it('should change status when we sell an item', () = {
  // });

});