import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { burgundy, testRegions } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Region Model tests", () => {

    setup(async () => {
      db.init("mongo");
      await db.regionsStore.deleteAllRegions();
      for (let i = 0; i < testRegions.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        testRegions[i] = await db.regionsStore.addRegion(testRegions[i]);
      }
    });

    test("get a region - success", async () => {
      const region = await db.regionsStore.addRegion(burgundy);
      const returnedRegion = await db.regionsStore.getOneRegion(region.name);
      assertSubset(burgundy, returnedRegion);
    });

    test("get a region - bad params", async () => {
      assert.isNull(await db.regionsStore.getOneRegion(""));
      assert.isNull(await db.regionsStore.getOneRegion());
    });

    test("add a region", async () => {
      const region = await db.regionsStore.addRegion(burgundy);
      assertSubset(burgundy, region);
      assert.isDefined(region._id);
    });

    test("delete all regions", async () => {
      let returnedRegions = await db.regionsStore.getAllRegions();
      assert.equal(returnedRegions.length, 7);
      await db.regionsStore.deleteAllRegions();
      returnedRegions = await db.regionsStore.getAllRegions();
      assert.equal(returnedRegions.length, 0);
    });

    test("delete One Region - success", async () => {
        // eslint-disable-next-line prefer-destructuring
      const name = testRegions[0].name;
      await db.regionsStore.deleteOneRegion(name);
      const returnedRegions = await db.regionsStore.getAllRegions();
      assert.equal(returnedRegions.length, testRegions.length - 1);
      const deletedRegion = await db.regionsStore.getOneRegion(name);
      assert.isNull(deletedRegion);
    });
  
    test("delete One Region - fail", async () => {
      await db.regionsStore.deleteOneRegion("bad-id");
      const allRegions = await db.regionsStore.getAllRegions();
      assert.equal(testRegions.length, allRegions.length);
    });
});