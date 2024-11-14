// Google Sheets CSV export URL
const fileUrl =
  "https://docs.google.com/spreadsheets/d/1ppYBgITkwuHTFsqlzjOU5YqsdVLjkcwtKmpOSYVpoZI/export?format=csv";

document.getElementById("draw-btn").addEventListener("click", drawWinners);

let participants = [];

// if (localStorage.getItem("drawCompleted") === "true") {
//   document.getElementById("draw-btn").disabled = true;
//   document.getElementById("error-message").style.display = "block";
// } else {
//   fetchAndProcessFile(fileUrl);
// }

fetchAndProcessFile(fileUrl);
// Fetch and process the CSV file from Google Sheets
function fetchAndProcessFile(url) {
  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      Papa.parse(data, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          participants = results.data
            .map((row) => row.Name)
            .filter((name) => name);
          console.log("Participants:", participants);
        },
        error: function (error) {
          console.error("Error parsing CSV file:", error);
          alert("Failed to parse CSV file.");
        }
      });
    })
    .catch((error) => {
      console.error("Error fetching the file:", error);
      alert("Failed to fetch or load the CSV file.");
    });
}

function drawWinners() {
  if (participants.length === 0) {
    alert("No participants loaded. Please check the file.");
    return;
  }

  const shuffled = shuffleArray(participants);
  const winners = shuffled.slice(0, 5);

  const elements = document.querySelectorAll("p");

  elements[4].classList.add("animate__animated", "animate__fadeInBottomLeft");

  elements[3].classList.add("animate__animated", "animate__fadeInBottomRight");

  elements[2].classList.add("animate__animated", "animate__fadeInTopLeft");

  elements[1].classList.add("animate__animated", "animate__fadeInTopRight");

  elements[0].classList.add("animate__animated", "animate__fadeIn");

  document.getElementById(
    "first-winner"
  ).textContent = `1st Winner: ${winners[0]}`;
  document.getElementById(
    "second-winner"
  ).textContent = `2nd Winner: ${winners[1]}`;
  document.getElementById(
    "third-winner"
  ).textContent = `3rd Winner: ${winners[2]}`;
  document.getElementById(
    "fourth-winner"
  ).textContent = `4th Winner: ${winners[3]}`;
  document.getElementById(
    "fifth-winner"
  ).textContent = `5th Winner: ${winners[4]}`;

  document.getElementById("draw-btn").disabled = true;
  localStorage.setItem("drawCompleted", "true");
  document.getElementById("draw-btn").style.display = "none";
}

function shuffleArray(array) {
  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}
