// Business Logic

function Place(location, landmarks, timeOfYear, notes) {
  this.location = location;
  this.landmarks = landmarks;
  this.timeOfYear = timeOfYear;
  this.notes = notes;
  this.id = 0;
}

Place.prototype.getSummary = function () {
  return this.location + " (" + this.timeOfYear + ")";
};

function PlaceTracker() {
  this.places = {};
  this.currentId = 0;
}

PlaceTracker.prototype.assignId = function () {
  this.currentId += 1;
  return this.currentId;
};

PlaceTracker.prototype.addPlace = function (place) {
  const id = this.assignId();
  place.id = id;
  this.places[id] = place;
};

PlaceTracker.prototype.findPlace = function (id) {
  if (this.places[id] !== undefined) {
    return this.places[id];
  }
  return false;
};
PlaceTracker.prototype.deletePlace = function (id) {
  if (this.places[id] === undefined) {
    return false;
  }
  delete this.places[id];
  return true;
};

// UI Logic

const tracker = new PlaceTracker();

document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("place-form");
  const placesList = document.getElementById("places-list");

  function displayPlaces() {
    placesList.innerHTML = "";

    Object.values(tracker.places).forEach(function (place) {
      const li = document.createElement("li");
      li.textContent = place.location + " (" + place.timeOfYear + ")";
      li.setAttribute("data-id", place.id);
      placesList.appendChild(li);
    });
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const location = document.getElementById("location").value;
    const landmarks = document.getElementById("landmarks").value;
    const timeOfYear = document.getElementById("timeOfYear").value;
    const notes = document.getElementById("notes").value;

    const newPlace = new Place(location, landmarks, timeOfYear, notes);
    tracker.addPlace(newPlace);

    displayPlaces();   // 👈 This makes it show on the page

    form.reset();
  });

});

