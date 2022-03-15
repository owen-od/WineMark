import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { placemarkService } from "./placemark-service.js";
import { burgundy, testRegions, testPlacemarks, maggie } from "../fixtures.js";

const regions = new Array(testRegions.length);

suite("Region API tests", () => {

  let user = null;

  setup(async () => {
    await placemarkService.deleteAllRegions();
    await placemarkService.deleteAllPlacemarks();
    user = await placemarkService.createUser(maggie);
    for (let i = 0; i < testRegions.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      regions[i] = await placemarkService.createRegion(testRegions[i]);
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

  test("find region placemarks", async () => {
    const region = await placemarkService.createRegion(burgundy);
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      testPlacemarks[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createPlacemark(testPlacemarks[i]);
    }
    let regionPlacemarks = await placemarkService.getRegionPlacemarks(region.name);
    assert.equal(regionPlacemarks.length, 2);
    await placemarkService.deleteAllPlacemarks();
    regionPlacemarks = await placemarkService.getRegionPlacemarks(region.name);
    assert.equal(regionPlacemarks.length, 0);
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