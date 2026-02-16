describe("Place", function () {

  it("creates a Place object with properties", function () {
    const place = new Place("Paris", "Eiffel Tower", "Summer", "Nice trip");
    expect(place.location).toEqual("Paris");
    expect(place.landmarks).toEqual("Eiffel Tower");
  });

  it("returns formatted summary", function () {
    const place = new Place("Rome", "Colosseum", "Spring", "Historic");
    expect(place.getSummary()).toEqual("Rome (Spring)");
  });

});

describe("PlaceTracker", function () {

  let tracker;

  beforeEach(function () {
    tracker = new PlaceTracker();
  });

  it("adds a place", function () {
    const place = new Place("Tokyo", "Shibuya", "Winter", "Cold");
    tracker.addPlace(place);
    expect(tracker.places[1].location).toEqual("Tokyo");
  });

  it("assigns unique IDs", function () {
    const p1 = new Place("A", "L1", "Jan", "Test");
    const p2 = new Place("B", "L2", "Feb", "Test");
    tracker.addPlace(p1);
    tracker.addPlace(p2);
    expect(p1.id).not.toEqual(p2.id);
  });

  it("finds a place", function () {
    const place = new Place("London", "Big Ben", "Autumn", "Rainy");
    tracker.addPlace(place);
    expect(tracker.findPlace(place.id)).toEqual(place);
  });

  it("deletes a place", function () {
    const place = new Place("Cairo", "Pyramids", "March", "Hot");
    tracker.addPlace(place);
    tracker.deletePlace(place.id);
    expect(tracker.findPlace(place.id)).toEqual(false);
  });

});
