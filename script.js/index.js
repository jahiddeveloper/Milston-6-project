const createElements = (arr) => {
  const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
  return htmlElements.join(" ");
};

const loadLesson = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((response) => response.json())
    .then((data) => displayLesson(data.data));
};

const removeActive = () => {
  const allBtn = document.querySelectorAll(".lesson-btn");
  // console.log(allBtn);
  allBtn.forEach((btn) => {
    btn.classList.remove("btn-active");
  });
};

const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      removeActive();
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      // console.log(clickBtn)
      clickBtn.classList.add("btn-active");
      displayLevelWord(data.data);
    });
};

// {
//     "id": 84,
//     "level": 1,
//     "word": "Fish",
//     "meaning": "মাছ",
//     "pronunciation": "ফিশ"
// }

const loadWordDetaile = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;

  const response = await fetch(url);
  const details = await response.json();
  displayLoadWordDetaile(details.data);
};

// {
//     "word": "Eager",
//     "meaning": "আগ্রহী",
//     "pronunciation": "ইগার",
//     "level": 1,
//     "sentence": "The kids were eager to open their gifts.",
//     "points": 1,
//     "partsOfSpeech": "adjective",
//     "synonyms": [
//         "enthusiastic",
//         "excited",
//         "keen"
//     ],
//     "id": 5
// }

const displayLoadWordDetaile = (word) => {
  console.log(word);
  const detailsBox = document.getElementById("detailes-container");
  detailsBox.innerHTML = `
          <div>
            <h2 class="text-2xl font-bold mb-8">
              ${word.word} ( <i class="fa-solid fa-microphone-lines"></i> :${
    word.pronunciation
  })
            </h2>
          </div>

          <div>
            <h2 class="text-xl font-bold mb-3">Meaning</h2>
            <p class="font-bangla text-xl">${word.meaning}</p>
          </div>

          <div>
            <h2 class="text-xl font-bold mt-8 mb-3">Example</h2>
            <p class="text-xl">${word.sentence}</p>
          </div>

          <div class="">
            <h2 class="font-bangla text-xl font-bold mt-8 mb-3">
              সমার্থক শব্দ গুলো
            </h2>
            <div class="">${createElements(word.synonyms)}</div>
          </div>

          <button class="btn btn-active btn-primary mt-8 px-6 py-6 rounded-xl">Complete Learning</button>
  `;
  document.getElementById("word_modal").showModal();
};

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (words.length === 0) {
    wordContainer.innerHTML = `
    <div class="text-center col-span-full py-12">
        <div class="flex justify-center">
          <img class="mb-4" src="./assets/alert-error.png" alt="" />
        </div>
        <p class="font-bangla text-[#79716b] mb-3">
          এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
        </p>
        <h3 class="font-bangla text-3xl font-semibold">
          নেক্সট <span>Lesson</span> এ যান
        </h3>
      </div>
    `;
    return;
  }

  for (const word of words) {
    console.log(word);
    const cart = document.createElement("div");
    cart.innerHTML = `
    <div class="bg-white py-10 px-5 rounded-xl shadow-sm text-center">
        <h2 class="font-bold text-xl mb-6">${
          word.word ? word.word : "শব্দ পাওয়া যায়নি"
        }</h2>
        <p class="text-[1.25rem]">Meaning /Pronounciation</p>
        <div class="mt-6 text-[#18181B] text-2xl font-bold">
          ${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${
      word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যায়নি"
    }
        </div>
        <div class="flex justify-between items-center mt-8">
          <button
            onclick="loadWordDetaile(${
              word.id
            })" class="font-bangla bg-[#1a91ff1a] hover:bg-[#1a91ff33] cursor-pointer btn rounded-lg text-xl"
          >
            <i class="fa-solid fa-circle-info"></i>
          </button>
          <button
            class="font-bangla bg-[#1a91ff1a] hover:bg-[#1a91ff33] cursor-pointer btn rounded-lg text-xl"
          >
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
      </div>
    `;

    wordContainer.append(cart);
  }
};

const displayLesson = (lessons) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  for (const lesson of lessons) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
                <button id="lesson-btn-${lesson.level_no}" onClick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"
                ><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button
                >`;

    levelContainer.append(btnDiv);
  }
};
loadLesson();
