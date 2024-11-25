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
      male: 100,
    },
  },
  {
    type: "img",
    content: "<image-source>",
    price: {
      normal: 1,
      male: 20,
    },
  },
];

const placeAds = () => {
  const cookiesText = "personalizedAds=21:male";
  //Select interested elemenets
  const textElements = Array.from(document.querySelectorAll("p, h1, h2, h3, h4, h5, h6"));
  const textContents = textElements.map((textElement) => textElement.textContent);

  //Filter ads
  const filteredAds = (advertisements) => {
    return advertisements.filter((advertisement) => {
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
  };

  //Personal ads filter
  const sortPersonalizedAds = (advertisements) => {
    let gender = "not-specified";
    let ageGroup = "normal";

    //Cookie parser
    if (cookiesText) {
      const cookies = cookiesText.split(";");
      cookies.forEach((cookie) => {
        if (cookie.startsWith("personalizedAds")) {
          const personalInfo = cookie.split("=")[1];
          const [age, genderFromCookie] = personalInfo.split(":");
          gender = genderFromCookie ? genderFromCookie : "not-specified"; // Defaultní hodnota
          ageGroup = age < 20 ? "young" : age >= 20 && age <= 64 ? "adult" : "senior";
        }
      });
    }

    return advertisements
      .filter((ads) => {
        //Filtering by gender and age
        if (ads.price[ageGroup] !== undefined && ads.price[ageGroup] > 0) {
          return true;
        }

        if (gender === "male" && ads.price.male !== undefined && ads.price.male > 0) {
          return true;
        }

        if (gender === "female" && ads.price.female !== undefined && ads.price.female > 0) {
          return true;
        }

        if (ads.price.normal !== undefined && ads.price.normal > 0) {
          return true;
        }
        return false;
      })
      .sort((a, b) => {
        const getPrice = (ads) => {
          if (ads.price[ageGroup] !== undefined) return ads.price[ageGroup];
          if (gender === "male" && ads.price.male !== undefined) return ads.price.male;
          if (gender === "female" && ads.price.female !== undefined) return ads.price.female;
          return ads.price.normal !== undefined ? ads.price.normal : 0;
        };

        //Return sorted by price
        return getPrice(b) - getPrice(a);
      });
  };

  console.log(filteredAds(advertisements));
  console.log(sortPersonalizedAds(advertisements));
};

placeAds();
