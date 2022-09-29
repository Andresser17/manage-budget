const { Dog, connect, disconnect } = require("../../src/db.js");

xdescribe("Dog model", () => {
  beforeAll(async () => await connect());
  afterAll(async () => await disconnect());
  beforeEach(async () => await Dog.sync({ force: true }));

  it("should throw an error if required fields are null", async () => {
    await expect(Dog.create({})).rejects.toThrowError();
  });

  it("should work when it's required fields aren't null", async () => {
    const dog = await Dog.create({
      name: "Pug",
      height: "1.2M",
      weight: "30Kg",
    });

    expect(dog).toMatchObject({
      height: "1.2M",
      id: 1,
      lifeSpan: null,
      name: "Pug",
      weight: "30Kg",
    });
  });

  it("the id has to be unique", async () => {
    const dog1 = await Dog.create({
      name: "Pug",
      height: "1.2M",
      weight: "30Kg",
    });

    const dog2 = await Dog.create({
      name: "Doberman",
      height: "1.2M",
      weight: "30Kg",
    });

    const dog3 = await Dog.create({
      name: "Labrador",
      height: "1.2M",
      weight: "30Kg",
    });

    expect([dog1.id, dog2.id, dog3.id]).toEqual([1, 2, 3]);
  });

  it("if name exist in db, throw an error", async () => {
    await Dog.create({
      name: "Pug",
      height: "1.2M",
      weight: "30Kg",
    });

    const dog2 = () =>
      Dog.create({
        name: "Pug",
        height: "1.2M",
        weight: "30Kg",
      });

    await expect(dog2).rejects.toThrowError(/validation error/i);
  });
});
