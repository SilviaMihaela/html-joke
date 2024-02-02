const btn = document.getElementById("btn-joke");
const jokeContainer = document.querySelector(".joke-container");

function addJoke(gluma) {
  jokeContainer.textContent = gluma;
}

function tellMeAJoke(gluma) {
  VoiceRSS.speech({
    key: "5ff4b1b6ab8143f488a977bc3a2f2a9c",
    src: gluma,
    hl: "en-us",
    v: "Mary",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

async function getDataFromAPI() {
  const url = "https://v2.jokeapi.dev/joke/Any";
  let joke = "";
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.type === "single") {
      joke = data.joke;
    } else {
      joke = data.setup + "\n" + data.delivery;
    }
    addJoke(joke);
    tellMeAJoke(joke);
    console.log(joke);
  } catch (eroare) {
    console.log("API error: ", eroare);
  }
}

btn.addEventListener("click", getDataFromAPI);
