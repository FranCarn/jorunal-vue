export default () => ({
  isLoading: true,
  entries: [
    {
      id: new Date().getTime(),
      date: new Date().toDateString(),
      text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore, quae eveniet! Repellat, repudiandae iste illo adipisci quibusdam fugiat cum pariatur quae laudantium itaque voluptatum dolorum aut hic ex quo. Placeat.",
      picture: null, // https://image-url.com
    },
    {
      id: new Date().getTime() + 1000,
      date: new Date().toDateString(),
      text: "Dolore, quae eveniet! Repellat, repudiandae iste illo adipisci quibusdam fugiat cum pariatur quae laudantium itaque voluptatum dolorum aut hic ex quo. Placeat.",
      picture: null, // https://image-url.com
    },
    {
      id: new Date().getTime() - 1000,
      date: new Date().toDateString(),
      text: "Voluptatum dolorum aut hic ex quo. Placeat.",
      picture: null, // https://image-url.com
    },
  ],
});
