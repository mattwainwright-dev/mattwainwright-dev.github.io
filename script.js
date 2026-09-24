const datasetToggle = document.getElementById("dataset-toggle");
const datasetPanel = document.getElementById("dataset-panel");
const datasetPreview = document.getElementById("dataset-preview");

const fullDatasetToggle = document.getElementById("full-dataset-toggle");
const fullDataset = document.getElementById("full-dataset");

let datasetLoaded = false;
let headers = [];
let artists = [];
let currentDatasetAudio = null;
let currentDatasetButton = null;

datasetToggle.addEventListener("click", async () => {
  datasetPanel.hidden = !datasetPanel.hidden;

  if (datasetPanel.hidden) {
    datasetToggle.textContent = "Explore Dataset";
    return;
  }

  datasetToggle.textContent = "Close Dataset";

  if (datasetLoaded) {
    return;
  }

  const response = await fetch("data/pulse-artists.csv");

  if (!response.ok) {
    datasetPreview.textContent = "Could not load the dataset.";
    return;
  }

  const csvText = await response.text();
  const rows = csvText.trim().split("\n");

  headers = rows[0].split(",");
  artists = rows.slice(1).map((row) => row.split(","));

  const artistIndex = headers.indexOf("artist_name");
  const genreIndex = headers.indexOf("genre");
  const originIndex = headers.indexOf("origin");
  const formedIndex = headers.indexOf("formed_year");
  const statusIndex = headers.indexOf("status");

  let tableHTML = `
    <table class="dataset-table">
      <thead>
        <tr>
          <th>Artist</th>
          <th>Genre</th>
          <th>Origin</th>
          <th>Formed</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
  `;

  artists.forEach((artist) => {
    tableHTML += `
      <tr>
        <td>${artist[artistIndex]}</td>
        <td>${artist[genreIndex]}</td>
        <td>${artist[originIndex]}</td>
        <td>${artist[formedIndex]}</td>
        <td>${artist[statusIndex]}</td>
      </tr>
    `;
  });

  tableHTML += `
      </tbody>
    </table>
  `;

  datasetPreview.innerHTML = tableHTML;
  datasetLoaded = true;
});

fullDatasetToggle.addEventListener("click", () => {
  fullDataset.hidden = !fullDataset.hidden;

  if (fullDataset.hidden) {
    fullDatasetToggle.textContent = "View Full Dataset";
    return;
  }

  fullDatasetToggle.textContent = "Close Full Dataset";

  const artistIndex = headers.indexOf("artist_name");
  const genreIndex = headers.indexOf("genre");
  const originIndex = headers.indexOf("origin");
  const formedIndex = headers.indexOf("formed_year");
  const foundingIndex = headers.indexOf("founding_members");
  const currentIndex = headers.indexOf("current_members");
  const formerIndex = headers.indexOf("notable_former_members");
  const statusIndex = headers.indexOf("status");
  const bioIndex = headers.indexOf("bio");
  const imageIndex = headers.indexOf("image_url");
  const websiteIndex = headers.indexOf("official_url");
  const audioIndex = headers.indexOf("audio_url");

  let fullHTML = "";

  artists.forEach((artist) => {
    fullHTML += `
      <article class="dataset-record">
        <h5>${artist[artistIndex]}</h5>

        <div class="dataset-details">
          <p><strong>Genre:</strong> ${artist[genreIndex]}</p>
          <p><strong>Origin:</strong> ${artist[originIndex]}</p>
          <p><strong>Formed:</strong> ${artist[formedIndex]}</p>
          <p><strong>Status:</strong> ${artist[statusIndex]}</p>
          <p><strong>Founding Members:</strong> ${artist[foundingIndex]}</p>
          <p><strong>Current Members:</strong> ${artist[currentIndex]}</p>
          <p><strong>Notable Former Members:</strong> ${artist[formerIndex]}</p>
        </div>

        <p class="dataset-bio">
          ${artist[bioIndex]}
        </p>

        <div class="dataset-record-links">
          <a href="${artist[imageIndex]}" target="_blank">Image</a>
          <a href="${artist[websiteIndex]}" target="_blank">Official Site</a>
          <button
            class="dataset-audio-button"
            data-audio="https://mattwainwright-dev.github.io/capstone/${artist[audioIndex]}"
            type="button"
          >
            Audio Preview
          </button>
        </div>
      </article>
    `;
  });

  fullDataset.innerHTML = fullHTML;

  const audioButtons = document.querySelectorAll(".dataset-audio-button");

  audioButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (currentDatasetAudio && currentDatasetButton === button) {
        currentDatasetAudio.pause();
        currentDatasetAudio.currentTime = 0;

        button.textContent = "Audio Preview";

        currentDatasetAudio = null;
        currentDatasetButton = null;

        return;
      }

      if (currentDatasetAudio) {
        currentDatasetAudio.pause();
        currentDatasetAudio.currentTime = 0;

        currentDatasetButton.textContent = "Audio Preview";
      }

      currentDatasetAudio = new Audio(button.dataset.audio);
      currentDatasetButton = button;

      currentDatasetAudio.volume = 0.5;
      currentDatasetAudio.play();

      button.textContent = "Stop Preview";

      currentDatasetAudio.addEventListener("ended", () => {
        button.textContent = "Audio Preview";

        currentDatasetAudio = null;
        currentDatasetButton = null;
      });
    });
  });
});

const principleEnter = document.getElementById("principle-enter");
const philosophyCards = document.querySelector(".philosophy-cards");
const pulsePrinciple = document.getElementById("pulse-principle");

principleEnter.addEventListener("click", () => {
  console.log("PRINCIPLE BUTTON CLICKED");
  philosophyCards.style.display = "none";
  pulsePrinciple.hidden = false;
  pulsePrinciple.scrollIntoView({ behavior: "smooth" });
});

const philosophyBack = document.querySelector(".philosophy-back");

philosophyBack.addEventListener("click", () => {
  pulsePrinciple.hidden = true;
  philosophyCards.style.display = "flex";
  document.getElementById("philosophy").scrollIntoView({ behavior: "smooth" });
});

const deedEnter = document.getElementById("deed-enter");
const devsDeed = document.getElementById("devs-deed");
const deedBack = document.querySelector(".deed-back");

deedEnter.addEventListener("click", () => {
  philosophyCards.style.display = "none";
  devsDeed.hidden = false;
  devsDeed.scrollIntoView({ behavior: "smooth" });
});

deedBack.addEventListener("click", () => {
  devsDeed.hidden = true;
  philosophyCards.style.display = "flex";
  document.getElementById("philosophy").scrollIntoView({ behavior: "smooth" });
});