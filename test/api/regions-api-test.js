import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { placemarkService } from "./placemark-service.js";
import { burgundy, testRegions } from "../fixtures.js";

suite("Region API tests", () => {

  setup(async () => {
    await placemarkService.deleteAllRegions();
    for (let i = 0; i < testRegions.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testRegions[i] = await placemarkService.createRegion(testRegions[i]);
    }
  });

  teardown(async () => {});

  test("create region", async () => {
    const returnedRegion = await placemarkService.createRegion(burgundy)
    assertSubset (burgundy, returnedRegion);
    const returnedRegions = await placemarkService.getAllRegions();
    assert.equal(returnedRegions.length, testRegions.length + 1);
  });

  test("find a region", async () => {
    const region = await placemarkService.createRegion(burgundy);
    const returnedRegion = await placemarkService.getRegion(region.name);
    assertSubset(burgundy, returnedRegion);
  });

  test("find a region - bad params", async () => {
    try {
      const returnedRegion = await placemarkService.getRegion("no name");
      assert.fail ("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Region with this name", "Incorrect Response Message");
    }
  });

  test("Delete a region", async () => {
    const region = await placemarkService.createRegion(burgundy);
    await placemarkService.deleteRegion(region.name);
    const returnedRegions = await placemarkService.getAllRegions();
    assert.equal(returnedRegions.length, 6);
    try {
      const returnedRegion = await placemarkService.getRegion(region.name);
      assert.fail ("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Region with this name", "Incorrect Response Message");
    }
  });
});