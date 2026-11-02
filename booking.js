(function () {
  var STORAGE_KEY = "book-space-travel";

  var DESTINATION_LABELS = {
    "low-earth-orbit": "Low Earth orbit",
    "the-moon": "The Moon",
    mars: "Mars"
  };

  function load() {
    try {
      var raw = sessionStorage.getItem(STORAGE_KEY);
      var data = raw ? JSON.parse(raw) : {};
      return data && typeof data === "object" ? data : {};
    } catch (error) {
      return {};
    }
  }

  function save(data) {
    var json = JSON.stringify(data);
    sessionStorage.setItem(STORAGE_KEY, json);
    localStorage.setItem(STORAGE_KEY, json);
  }

  function display(key, value) {
    var text = typeof value === "string" ? value.trim() : "";
    if (!text) {
      return "Not answered";
    }
    if (key === "destination") {
      return DESTINATION_LABELS[text] || "Not answered";
    }
    return text;
  }

  function fillAnswers(root, data) {
    var answers = root.querySelectorAll("[data-answer]");
    for (var i = 0; i < answers.length; i++) {
      var key = answers[i].getAttribute("data-answer");
      answers[i].textContent = display(key, data[key]);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    var data = load();
    var details = document.getElementById("details-form");
    var destination = document.getElementById("destination-form");
    var answers = document.getElementById("recorded-answers");

    if (details) {
      var name = document.getElementById("full-name");
      var address = document.getElementById("address");
      if (name && typeof data["full-name"] === "string") {
        name.value = data["full-name"];
      }
      if (address && typeof data.address === "string") {
        address.value = data.address;
      }
      details.addEventListener("submit", function () {
        var next = load();
        next["full-name"] = name ? name.value.trim() : "";
        next.address = address ? address.value.trim() : "";
        delete next.email;
        save(next);
      });
    }

    if (destination) {
      if (data.destination) {
        var selected = destination.querySelector(
          'input[name="destination"][value="' + CSS.escape(data.destination) + '"]'
        );
        if (selected) {
          selected.checked = true;
        }
      }
      destination.addEventListener("submit", function () {
        var next = load();
        var chosen = destination.querySelector('input[name="destination"]:checked');
        next.destination = chosen ? chosen.value : "";
        save(next);
      });
    }

    if (answers) {
      fillAnswers(answers, data);
    }
  });
})();
