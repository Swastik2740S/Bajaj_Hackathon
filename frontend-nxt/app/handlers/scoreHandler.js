export default class ScoreHandler {
  constructor() {
    this.DBWOScore = [];
    this.isLocalStorageAvailable = null;
    this.keyData = "DBWOScore";
    this.bestScore = {};
  }

  setup = (bestScoreConfig) => {
    // Create schema DB Best score and set 0 for every entity
    this.bestScore = {};
    bestScoreConfig.nameWorkout.forEach((workout) => {
      this.bestScore[workout] = {};
      bestScoreConfig.duration.forEach((dur) => {
        this.bestScore[workout][dur] = 0;
      });
    });

    if (typeof localStorage === "undefined") {
      this.isLocalStorageAvailable = false;
      alert("Warning! Local storage unavailable. Please use the latest browser");
      return;
    }

    this.isLocalStorageAvailable = true;
    const DBWOScoreStringify = localStorage.getItem(this.keyData);
    if (DBWOScoreStringify !== null) {
      this.DBWOScore = JSON.parse(DBWOScoreStringify);
    } else {
      this.saveToLocalStorage();
    }
  };

  saveToLocalStorage = () => {
    if (this.isLocalStorageAvailable) {
      localStorage.setItem(this.keyData, JSON.stringify(this.DBWOScore));
    }
  };

  addNewData = (inputData) => {
    const newScore = {
      id: +new Date(),
      nameWorkout: inputData.nameWorkout,
      duration: inputData.duration,
      repetition: inputData.repetition,
      date: new Date().toISOString(), // ✅ FIXED: Correct date format for MongoDB
    };

    // ✅ Push the new score object to the array
    this.DBWOScore.push(newScore);

    // ✅ Get email from localStorage safely
    let emailId = localStorage.getItem("uid") || "default@gmail.com"; // Prevent null value

    // ✅ Prepare data for API request
    const data = { emailId, newScore };

    // ✅ Debugging: Log data before sending
    console.log("Sending Data:", JSON.stringify(data));

    // ✅ Send data to backend
    fetch("http://localhost:5000/exercise/scores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    this.saveToLocalStorage();
  };

  getBestScoreByReps = () => {
    if (Object.keys(this.bestScore).length === 0) return {};
    
    // Search maximum score by comparing each entry
    this.DBWOScore.forEach((dataWO) => {
      if (
        this.bestScore[dataWO.nameWorkout][dataWO.duration] === 0 ||
        dataWO.repetition >= this.bestScore[dataWO.nameWorkout][dataWO.duration]
      ) {
        this.bestScore[dataWO.nameWorkout][dataWO.duration] = dataWO.repetition;
      }
    });
    return this.bestScore;
  };
}
