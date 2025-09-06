
const loadLesson = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((response) => response.json())
    .then((data) => displayLesson(data.data));
};
const displayLesson = (lessons) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  for (const lesson of lessons) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
                <button class="btn btn-outline btn-primary"
                ><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button
                >`;

    levelContainer.append(btnDiv);
  }
};
loadLesson();
