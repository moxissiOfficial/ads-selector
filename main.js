const advertisements = [
  {
    type: "HTML",
    payload: "<div>Levny byt v centru prahy 2KK za 30 milionu!</div>",
    price: {
      normal: 30,
      young: 0,
      adult: 50,
      senior: 0,
    },
    protect: "Izrael*|*Rusko*",
  },
  {
    type: "img",
    content: "<image-source>",
    price: {
      normal: 50,
      muz: 100,
    },
  },
  {
    type: "img",
    content: "<image-source>",
    price: {
      normal: 1,
      muz: 20,
    },
  },
];

const placeAds = () => {
  //Select interested elemenets
  const textElements = Array.from(document.querySelectorAll("p, h1, h2, h3, h4, h5, h6"));
  const textContents = textElements.map((textElement) => textElement.textContent);

  //Filter ads
  const filteredAds = advertisements.filter((advertisement) => {
    if (advertisement.protect) {
      const prohibitedWords = advertisement.protect.split("|");
      return !prohibitedWords.some((word) => {
        return textContents.some((text) => {
          if (word.endsWith("*") && text.split(" ")[0].includes(word.slice(0, word.length - 1))) {
            return true;
          }
          if (word.startsWith("*") && word.endsWith("*") && text.includes(word.slice(1, word.length - 1))) {
            return true;
          }
          return false;
        });
      });
    }
    return true;
  });

  console.log(filteredAds);
};

placeAds();
