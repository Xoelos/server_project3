const axios = require("axios");
let jobSearch = "front end";

axios
  .get(
    `https://jobs.github.com/positions.json?description=${jobSearch}&full_time=true&location=california`
  )
  .then(response => {
    let counts = {};
    let result = [];

    response.data.forEach((element, indexId) => {
      let desc = element.description;

      desc = desc
        .replace(/[^a-zA-Z ]/g, " ")
        .split(" ")
        .filter(word => word.length > 2)
        .sort();

      for (var i = 0; i < desc.length; i++) {
        var word = desc[i].toLowerCase();
        //   word = word.charAt(0).toUpperCase() + word.slice(1);
        counts[word] = counts[word] ? counts[word] + 1 : 1;
      }
    });

    for (var j in counts) {
      result.push([j, counts[j]]);
    }

    result.sort((a, b) => {
      let x = a[1];
      let y = b[1];
      return y - x;
    });

    console.table(result);
  });

//   phantom.js
