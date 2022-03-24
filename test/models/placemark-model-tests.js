import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { vineyard, testPlacemarks, maggie } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Placemark model tests", () => {

  let user = null;

  setup(async () => {
    db.init("mongo");
    await db.placemarkStore.deleteAllPlacemarks();
    await db.userStore.deleteAll();
    user = await db.userStore.addUser(maggie);
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      testPlacemarks[i].userid = user._id
      // eslint-disable-next-line no-await-in-loop
      testPlacemarks[i] = await db.placemarkStore.addPlacemark(testPlacemarks[i]);
    }   
  });

  test("create a placemark", async () => {
    const placemark = await db.placemarkStore.addPlacemark(vineyard);
    assertSubset(vineyard, placemark);
    assert.isDefined(placemark._id);
    });

  test("delete all placemarks", async () => {
    let returnedPlacemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(returnedPlacemarks.length, 10);
    await db.placemarkStore.deleteAllPlacemarks();
    returnedPlacemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(returnedPlacemarks.length, 0);
    });

  test("delete One Placemark - success", async () => {
    const id = testPlacemarks[0]._id;
    await db.placemarkStore.deletePlacemarkById(id);
    const returnedPlacemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(returnedPlacemarks.length, testPlacemarks.length - 1);
    const deletedPlacemark = await db.placemarkStore.getPlacemarkById(id);
    assert.isNull(deletedPlacemark);
    });

  test("delete One Placemark - fail", async () => {
    await db.placemarkStore.deletePlacemarkById("bad-id");
    const allPlacemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(testPlacemarks.length, allPlacemarks.length);
  });

  test("delete user placemarks", async () => {
    let userPlacemarks = await db.placemarkStore.getUserPlacemarks(user._id)
    assert.equal(userPlacemarks.length, testPlacemarks.length);
    await db.placemarkStore.deleteUserPlacemarks(user._id)
    userPlacemarks = await db.placemarkStore.getUserPlacemarks(user._id)
    assert.equal(userPlacemarks.length, 0);
  });

  test("get a placemark - success", async () => {
    const placemark = await db.placemarkStore.addPlacemark(vineyard);
    const returnedPlacemark = await db.placemarkStore.getPlacemarkById(placemark._id);
    assertSubset(vineyard, returnedPlacemark);
  });

  test("get placemarks for region - success", async () => {
    await db.placemarkStore.deleteAllPlacemarks()
    const placemark = await db.placemarkStore.addPlacemark(vineyard);
    let returnedPlacemarks = await db.placemarkStore.getPlacemarksByRegion(placemark.region);
    assert.equal(returnedPlacemarks.length, 1);
    const deletedPlacemark = await db.placemarkStore.deletePlacemarkById(placemark._id);
    returnedPlacemarks = await db.placemarkStore.getPlacemarksByRegion(placemark.region);
    assert.equal(returnedPlacemarks.length, 0)
  });


  test("get a placemark - bad params", async () => {
    assert.isNull(await db.placemarkStore.getPlacemarkById(""));
    assert.isNull(await db.placemarkStore.getPlacemarkById());
  });
});