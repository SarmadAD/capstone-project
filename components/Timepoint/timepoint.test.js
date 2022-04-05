import { timepoints } from "../../db";
import { render, screen, cleanup } from "@testing-library/react";
import { MongoClient } from "mongodb";
import { TimepointModel } from "../../model/TimepointModel";

describe("Timepoint", () => {
  it("Check if first timepoint is not null and undefinded", () => {
    expect(timepoints[0]).not.toBeNull();
    expect(timepoints[0]).not.toBeUndefined();
  });
  it.todo("test if timepoint is rendered");
});

describe("CRUD Timepoint", () => {
  let connection;
  let db;

  const exampleTimepoint = {
    id: "testid",
    title: "testtitle",
    content: "testcontent",
    date: "25.2.2222",
    picture: "testpicture",
    type: "testtype",
  };

  const updatedTimepoint = {
    id: "testidupdate",
    title: "testtitleupdated",
    content: "testcontentupdated",
    date: "25.2.2222",
    picture: "testpicture",
    type: "testtype",
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
  it("test if timepoint can be created", async () => {
    const timepoints = db.collection("timepoints");
    await timepoints.insertOne(exampleTimepoint);
    const insertedTimepoint = await timepoints.findOne({ id: exampleTimepoint.id });
    expect(insertedTimepoint).toEqual(exampleTimepoint);
  });

  it("test if timepoint can be changed", async () => {
    const timepoints = db.collection("timepoints");
    await timepoints.updateOne(exampleTimepoint, { $set: updatedTimepoint });
    const findUpdatedTimepoint = await timepoints.findOne({ id: exampleTimepoint.id });
    expect(findUpdatedTimepoint).not.toEqual(exampleTimepoint);
  });

  it("test if timepoint can be deleted", async () => {
    const timepoints = db.collection("timepoints");
    await timepoints.deleteOne({ _id: exampleTimepoint.id });
    const deletedTimepoint = await timepoints.findOne({ id: exampleTimepoint.id });
    expect(deletedTimepoint).toBeNull();
  });
});
