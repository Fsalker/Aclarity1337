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

### Encryption

I picked [Cryptr](https://www.npmjs.com/package/cryptr) to encrypt data with, which uses `aes-256-gcm` itself.

It's much simpler to use than [Node's Crypto module](https://nodejs.org/api/crypto.html), while still being secure.

### Possible improvements

- configure [Winston](https://www.npmjs.com/package/winston) logger and use it for nicer logs.
- maybe move `encrypt` and `decrypt` from `./src/index.js` into `retrieveData.js` and `storeData.js`, because they are uniquely used in those 2 routes; but for this demo it isn't worth it, so they're staying there.

### Notes / Questions

- I've assumed that wildcards in `/retrieveData` queries are ALWAYS at the end of the id 

ie: `engineering-jobs-*-kebab` is not a wildcard query, but `kebab-*` is