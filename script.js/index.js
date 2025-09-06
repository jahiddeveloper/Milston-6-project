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

  for (const word of words) {
    console.log(word);
    const cart = document.createElement("div");
    cart.innerHTML = `
    <div class="bg-white py-10 px-5 rounded-xl shadow-sm text-center">
        <h2 class="font-bold text-xl mb-6">${word.word}</h2>
        <p class="text-[1.25rem]">Meaning /Pronounciation</p>
        <div class="mt-6 text-[#18181B] text-3xl font-bold">
          ${word.meaning} / ${word.pronunciation}
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
