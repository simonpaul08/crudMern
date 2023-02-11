const { Genre } = require("./models/genre");
const { Movie } = require("./models/movie");
const mongoose = require("mongoose");
const config = require("config");
const { Test } = require("./models/test");
const { Chapter } = require("./models/chapter");

const data = [
  {
    name: "Comedy",
    movies: [
      { title: "Airplane", numberInStock: 5, dailyRentalRate: 2 },
      { title: "The Hangover", numberInStock: 10, dailyRentalRate: 2 },
      { title: "Wedding Crashers", numberInStock: 15, dailyRentalRate: 2 }
    ]
  },
  {
    name: "Action",
    movies: [
      { title: "Die Hard", numberInStock: 5, dailyRentalRate: 2 },
      { title: "Terminator", numberInStock: 10, dailyRentalRate: 2 },
      { title: "The Avengers", numberInStock: 15, dailyRentalRate: 2 }
    ]
  },
  {
    name: "Romance",
    movies: [
      { title: "The Notebook", numberInStock: 5, dailyRentalRate: 2 },
      { title: "When Harry Met Sally", numberInStock: 10, dailyRentalRate: 2 },
      { title: "Pretty Woman", numberInStock: 15, dailyRentalRate: 2 }
    ]
  },
  {
    name: "Thriller",
    movies: [
      { title: "The Sixth Sense", numberInStock: 5, dailyRentalRate: 2 },
      { title: "Gone Girl", numberInStock: 10, dailyRentalRate: 2 },
      { title: "The Others", numberInStock: 15, dailyRentalRate: 2 }
    ]
  }
];

async function seed() {
  await mongoose.connect(config.get("db"));

  await Movie.deleteMany({});
  await Genre.deleteMany({});

  await Test.deleteMany({});
  await Chapter.deleteMany({});

  for (let genre of data) {
    const { _id: genreId } = await new Genre({ name: genre.name }).save();
    const movies = genre.movies.map(movie => ({
      ...movie,
      genre: { _id: genreId, name: genre.name }
    }));
    await Movie.insertMany(movies);
  }

  for(let i=1; i<=5; i++){
    const chapter = new Chapter({ number: i, name: "Chapter " + i })
    for(let j=1; j<=5; j++){
      let questions = []
      for(let k=0; k<=24; k++) {
        questions.push({
          question: "Chapter " + i + "-test " + j + "-What color of the sea?",
          choices: ["red", "blue", "green", "yello"],
          answer: 1,
          description: "The sea is blue",
          audioPath: "/audio/test.wav"
        })
      }
      const test = await new Test({testNum: j, chapter: chapter._id, timelimit: 45,
        questions: questions}).save()
      chapter.tests.push(test);
      await chapter.save()
    }
  }

  await new Chapter({ number: 1, name: "Exams 1 to 7 ", isExam: true}).save();
  await new Chapter({ number: 2, name: "Exams 8 to 16 ", isExam: true}).save();


  mongoose.disconnect();

  console.info("Done!");
}

seed();
