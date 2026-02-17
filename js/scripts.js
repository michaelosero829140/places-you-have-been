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
tracker.addPlace(newPlace);
displayPlaces();   // 👈 This must be here

PlaceTracker.prototype.deletePlace = function (id) {
  if (this.places[id] === undefined) {
    return false;
  }
  delete this.places[id];
  return true;
};

// UI Logic

const tracker = new PlaceTracker();

function displayPlaces() {
  const placesList = document.getElementById("places-list");
  placesList.innerHTML = "";

  Object.values(tracker.places).forEach(function(place) {
    const li = document.createElement("li");
    li.textContent = place.getSummary();
    li.setAttribute("data-id", place.id);
    placesList.appendChild(li);
  });
}

function displayDetails(id) {
  const place = tracker.findPlace(id);
  const detailsDiv = document.getElementById("place-details");

  if (place) {
    detailsDiv.innerHTML = `
      <h3>${place.location}</h3>
      <p><strong>Landmarks:</strong> ${place.landmarks}</p>
      <p><strong>Time of Year:</strong> ${place.timeOfYear}</p>
      <p><strong>Notes:</strong> ${place.notes}</p>
      <button id="delete-btn">Delete</button>
    `;

    document.getElementById("delete-btn").onclick = function () {
      tracker.deletePlace(id);
      displayPlaces();
      detailsDiv.innerHTML = "";
    };
  }
}

document.getElementById("place-form").addEventListener("submit", function(event) {
  event.preventDefault();

  const location = document.getElementById("location").value;
  const landmarks = document.getElementById("landmarks").value;
  const timeOfYear = document.getElementById("timeOfYear").value;
  const notes = document.getElementById("notes").value;

  const newPlace = new Place(location, landmarks, timeOfYear, notes);
  tracker.addPlace(newPlace);

  displayPlaces();
  this.reset();
});

document.getElementById("places-list").addEventListener("click", function(event) {
  const id = parseInt(event.target.getAttribute("data-id"));
  if (id) {
    displayDetails(id);
  }
});
