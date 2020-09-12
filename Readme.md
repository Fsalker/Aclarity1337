# Aclarity1337

### Summary

I've written this project as part of a certain assignment.

The name is a partial anagram of a certain word, on top of which I've appended a little $VV@6.

### Running the project

1. Clone the repo on your machine
2. Run `npm install` in the cloned directory
3. Create a `.env` file and fill it following the example in `example.env`
4. If needed, start a MongoDB server. Make sure you provide its URL in `.env` 
5. Run `npm run start` to run the server

Optionally, run the tests using `npm run test`.

A log file will be populated in `./logs`, where you may see various information regarding the running server (and thrown errors).

### Possible improvements

- configure [Winston](https://www.npmjs.com/package/winston) logger and use it for nicer logs.
