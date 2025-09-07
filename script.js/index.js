const loadLesson = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((response) => response.json())
    .then((data) => displayLesson(data.data));
};

const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayLevelWord(data.data));
};

// {
//     "id": 84,
//     "level": 1,
//     "word": "Fish",
//     "meaning": "মাছ",
//     "pronunciation": "ফিশ"
// }

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
            class="font-bangla bg-[#1a91ff1a] hover:bg-[#1a91ff33] cursor-pointer btn rounded-lg text-xl"
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
                <button onClick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary"
                ><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button
                >`;

    levelContainer.append(btnDiv);
  }
};
loadLesson();
