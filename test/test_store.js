var chai = require('chai');
var expect = chai.expect;

import { Store, inventory_statuses } from '../src/js/Store.js';
import { test_inventory as source_inventory } from './data.js';

describe('Class', () => {
  it('should exist', () => {
    expect(Store).to.exist;
  });
});

describe('Store', () => {

  let inv;

  beforeEach( (done) => {
    inv = Array.from(source_inventory);
    done();
  });

  // initalize db
  it('should not initialize without an inventory', () => {

    expect( () => { new Store() } ).to.throw('inventory required');

    let store = null;
    expect( () => { store = new Store(inv) } ).to.not.throw('inventory required');
    expect( store ).to.be.an.instanceOf(Store);

  });

  // inventory add (increment based on key matches)
  it('should add an item to the inventory, when we provide an item (or fail accordingly)', () => {

    let store = new Store( inv );
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

    let itemCat = {
      id: 1,
      sku: 2,
      name: "cat",
      status: inventory_statuses.IN_STOCK
    };

    let store = new Store( inv );

    store.inventoryAdd( itemCat );

    expect( () => { store.inventoryGetById() } ).to.throw('id required');
    expect( () => { store.inventoryGetById(-1) }).to.throw('item with id not found');

    let item = store.inventoryGetById(1);
    expect( item ).to.deep.equal( itemCat );

  });

  it('should reflect sold status properly when we sell an item', () => {
    let itemCat = {
      id: 1,
      sku: 1,
      name: "kitty cat",
      status: inventory_statuses.IN_STOCK
    };

    let store = new Store( inv );

    store.inventoryAdd( itemCat );

    expect( store.inventorySell(1) ).to.be.ok;
    expect( store.inventoryGetById(1).status ).to.equal( inventory_statuses.SOLD );

    expect( () => { store.inventorySell(1) } ).to.throw('item is already marked as sold');
    expect( () => { store.inventorySell(666) } ).to.throw('item with id not found');
  });

  it('should return an accurate inventory count (of items IN STOCK) when SKU is queried', () => {

    let itemPb = {
      sku: 2,
      name: "peanut butter",
      status: inventory_statuses.IN_STOCK
    };

    let itemCat = {
      sku: 1,
      name: "Kitty Cat",
      status: inventory_statuses.IN_STOCK
    };

    let store = new Store( inv );

    store.inventoryAdd( itemPb );
    store.inventoryAdd( itemPb );
    store.inventoryAdd( itemPb );
    store.inventoryAdd( itemCat );

    // add one w/SOLD status
    itemPb.status = inventory_statuses.SOLD;
    store.inventoryAdd( itemPb );

    let size1 = store.inventorySize(2); // sku of 2 === 4
    let size2 = store.inventorySize(2, inventory_statuses.SOLD); // sku of 2, status of SOLD === 1
    let size3 = store.inventorySize(1, inventory_statuses.IN_STOCK); // === 1

    expect( size1 ).to.equal(4);
    expect( size2 ).to.equal(1);
    expect( size3 ).to.equal(1);

  });

  it('we can find items by various keys/filters', () => {

    let itemPb = {
      sku: 2,
      name: "peanut butter",
      status: inventory_statuses.IN_STOCK
    };

    let itemCat = {
      sku: 1,
      name: "Kitty Cat",
      status: inventory_statuses.IN_STOCK
    };

    let store = new Store( inv );

    store.inventoryAdd( itemPb );
    store.inventoryAdd( itemCat );

    var foundItem = store.findBy({ sku: 2 });

    expect( foundItem.length ).to.equal( 1 );
    expect( foundItem[0].sku ).to.equal( 2 );
  });

});
