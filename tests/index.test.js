require("dotenv").config();
const request = require("supertest");

// TODO [Improvement]: move these values in a mock data file
const employeeThree = {
  id: "employees-three",
  encryption_key: "key-two",
  value: "some string data here",
};
const boss = {
  id: "boss",
  encryption_key: "key-3",
  value: [1, 2, 3, 4],
};
const employees = [
  {
    id: "employees-one",
    encryption_key: "key1",
    value: 1234567,
  },
  {
    id: "employees-two",
    encryption_key: "key1",
    value: { moreData: null },
  },
  employeeThree,
  {
    id: "employees-four",
    encryption_key: "key1",
    value: null,
  },
  boss,
];

describe(`Should store "employees" and fetch their data`, () => {
  let server;

  beforeAll(async () => {
    server = await require("../src")();
  });

  test("Should store employees", async () => {
    for (let employee of employees) {
      await request(server)
        .post(`/storeData`)
        .send(employee)
        .expect((res) => {
          expect(res.status).toEqual(200);
        });
    }
  });

  test("Should not store data with invalid field(s)", async () => {
    await request(server)
      .post(`/storeData`)
      .send({
        id: "123",
        // encryption_key: "1dsgasd",
        value: "444",
      })
      .expect((res) => {
        expect(res.status).toEqual(400);
      });
  });

  test(`Should get employee #3 data`, async () => {
    await request(server)
      .post(`/retrieveData`)
      .send({
        id: "employees-three",
        decryption_key: "key-two",
      })
      .expect((res) => {
        expect(res.status).toEqual(200);
        const data = JSON.parse(res.text);
        expect(data.length).toEqual(1);
        expect(data[0].id).toEqual(employeeThree.id);
        expect(data[0].value).toEqual(employeeThree.value);
      });
  });

  test(`Should get employees #1's, #2's and #4's data`, async () => {
    await request(server)
      .post(`/retrieveData`)
      .send({
        id: "employees-*",
        decryption_key: "key1",
      })
      .expect((res) => {
        expect(res.status).toEqual(200);
        const data = JSON.parse(res.text);
        expect(data.length).toEqual(3);
      });
  });

  // TODO [Improvement]: test that "log.txt" actually updates too
});
