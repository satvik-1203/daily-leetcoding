const leetcodeData = require("../data/leetcode.json");
const fs = require("fs/promises");
const path = require("path");

test("Meta data format in data/leetcode.json", () => {
  leetcodeData.forEach((data) => {
    const keys = Object.keys(data);

    expect(keys).toEqual(
      expect.arrayContaining(["name", "difficulty", "topics", "date", "link"])
    );
  });
});

test("All links available", async () => {
  let filenames = await fs.readdir("code");

  leetcodeData.forEach((data) => {
    expect(filenames).toContain(data.link + ".md");

    filenames = filenames.filter((filename) => filename != data.link + ".md");
  });
});

test("Formate of meta data", () => {
  leetcodeData.forEach((data) => {
    expect(["easy", "medium", "hard"]).toContain(data.difficulty);

    data.name.split(" ").forEach((word) => {
      if (word[0] == "-") return;

      expect(word.charCodeAt(0)).toBeLessThanOrEqual(90);
      expect(word.charCodeAt(0)).toBeGreaterThanOrEqual(65);
    });
  });
});
