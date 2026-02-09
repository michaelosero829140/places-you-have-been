let currentId = 0;

export default class Place {
  constructor(location, landmarks, season, notes) {
    this.id = ++currentId;
    this.location = location;
    this.landmarks = landmarks;
    this.season = season;
    this.notes = notes;
  }

  getLandmarks() {
    return this.landmarks.join(", ");
  }

  getSummary() {
    return `${this.location} (${this.season})`;
  }
}

import Place from "./place.js";

const places = [];

const form = document.getElementById("place-form");
const list = document.getElementById("places-list");
const detailsDiv = document.getElementById("place-details");

function displayPlaces() {
  list.innerHTML = "";

  places.forEach(place => {
    const li = document.createElement("li");
    li.textContent = place.location;

    li.addEventListener("click", () => {
      displayDetails(place);
    });

    list.appendChild(li);
  });
}

function displayDetails(place) {
  detailsDiv.innerHTML = `
    <p><strong>Location:</strong> ${place.location}</p>
    <p><strong>Landmarks:</strong> ${place.getLandmarks()}</p>
    <p><strong>Time of Year:</strong> ${place.season}</p>
    <p><strong>Notes:</strong> ${place.notes}</p>
  `;
}

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const location = document.getElementById("location").value;
  const landmarks = document.getElementById("landmarks").value
    .split(",")
    .map(l => l.trim());
  const season = document.getElementById("season").value;
  const notes = document.getElementById("notes").value;

  const newPlace = new Place(location, landmarks, season, notes);
  places.push(newPlace);

  displayPlaces();
  form.reset();
});

import Place from "../js/place.js";

describe("Place", () => {

  test("should create a place object with properties", () => {
    const place = new Place("Paris", ["Eiffel Tower"], "Spring", "Beautiful trip");
    expect(place.location).toEqual("Paris");
    expect(place.season).toEqual("Spring");
  });

  test("should assign unique id", () => {
    const place1 = new Place("Rome", [], "Summer", "");
    const place2 = new Place("London", [], "Winter", "");
    expect(place1.id).not.toEqual(place2.id);
  });

  test("should return landmarks as string", () => {
    const place = new Place("Tokyo", ["Shibuya", "Skytree"], "Fall", "");
    expect(place.getLandmarks()).toEqual("Shibuya, Skytree");
  });

});

