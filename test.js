const createElements = (arr) => {
  const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
  console.log(htmlElements.join(" "));
};

const synonyms = ["HI", "Hello", "How are you", "Good Morning"];
createElements(synonyms);
