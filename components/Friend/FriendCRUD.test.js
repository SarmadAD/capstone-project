import { MongoClient } from "mongodb";

describe("CRUD Friend-User", () => {
  let connection;
  let db;

  const exampleUser = {
    name: "Hans",
    image: "imageUrl",
    email: "Hans@testmail.de",
    friendsIds: [],
  };

  const exampleFriend = {
    name: "Sarmad",
    image: "imageUrl",
    email: "sarmad@testmail.de",
    friendsIds: [],
  };

  beforeAll(async () => {
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db();
  });

  afterAll(async () => {
    await connection.close();
  });

  it("test if friendUser can be added to friend list", async () => {
    const users = db.collection("users");
    await users.insertOne(exampleUser);
    await users.insertOne(exampleFriend);
    await users.updateOne({ _id: exampleUser._id }, { $addToSet: { friendsIds: [exampleFriend._id] } });
    const updatedUser = await users.findOne({ _id: exampleUser._id });
    expect(updatedUser.friendsIds.length).toBeGreaterThan(0);
  });

  //Not done. 
  it.skip("test if friendUser can be deleted from friend list", async () => {
    const users = db.collection("users");
    await users.updateOne(
      { _id: exampleUser._id },
      {
        $pull: {
          friendsIds: exampleFriend._id,
        },
      }
    );
    const updatedUser = await users.findOne({ _id: exampleUser._id });
    expect(updatedUser.friendsIds[0].includes(exampleFriend.id)).toBeTruthy();
  });
});
