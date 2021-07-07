import faker from "faker";

export const fakeNewsItems = (n = 9) => {
  const newsItems = [];

  for (let i = 0; i < n; i++) {
    newsItems.push({
      i,
      title: faker.lorem.sentence(),
      text: faker.lorem.paragraphs(),
      date: faker.date.recent(),
      image: `${faker.image.cats()}?random=${i}`,
    });
  }

  return newsItems;
};
