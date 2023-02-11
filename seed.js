const { User } = require("./models/user");
const mongoose = require("mongoose");
const config = require("config");
const { Test } = require("./models/test");
const { Chapter } = require("./models/chapter");

async function seed() {
  await mongoose.connect(config.get("db"));

  await User.deleteMany({});

  await Test.deleteMany({});
  await Chapter.deleteMany({});

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

  let chapter = new Chapter({ number: 1, name: "Exams 1 to 7 ", isExam: true});
  for(let j=1; j<=5; j++){
    let questions = []
    for(let k=0; k<=24; k++) {
      questions.push({
        question: "Exams 1 to 7 -test " + j + "-What color of the sea?",
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

  chapter = new Chapter({ number: 2, name: "Exams 8 to 16 ", isExam: true});
  for(let j=1; j<=5; j++){
    let questions = []
    for(let k=0; k<=24; k++) {
      questions.push({
        question: "Exams 1 to 7 -test " + j + "-What color of the sea?",
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

  //username:admin@email.com password: asdfasdf
  await new User({name: "admin", email: "admin@email.com", password: "$2b$10$4KnNFlKWiH.HUzMF/3P/9.kcB9wSzYADkLsxqMEo30h/hJLQWipue", roles: [ { role: 'root', db: 'admin' } ]}).save();
  mongoose.disconnect();

  console.info("Done!");
}

seed();
