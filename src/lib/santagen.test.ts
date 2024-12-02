import { describe, expect, it, test } from "vitest";
import { genSanta, prng } from "./santagen";

describe("seedableRandom", async () => {
  test("should generate a random number", async () => {
    expect(prng("Kjell")).toBe(0.5873793816076399);
  });
});

describe("genSanta", async () => {
  it("should require at least two names", async () => {
    const names = ["Alice"];

    expect(() => genSanta(names)).toThrowError(
      "Need at least two participants"
    );
  });

  it("should not accept repeat names", async () => {
    const names = ["Alice", "Alice"];

    expect(() => genSanta(names)).toThrowError("No duplicate names allowed");
  });

  it("should handle two names", async () => {
    const names = "as".split("");

    const expected = new Map([
      ["a", "s"],
      ["s", "a"],
    ]);

    const actual = genSanta(names);

    expect(actual).toEqual(expected);
  });

  it("should never gift to oneself", async () => {
    for (let i = 0; i < 100; i++) {
      const name1 = Math.random().toString(36).substring(2, 15);
      const name2 = Math.random().toString(36).substring(2, 15);
      const name3 = Math.random().toString(36).substring(2, 15);

      const actual = genSanta([name1, name2, name3]);
      expect(actual.get(name1)).not.toBe(name1);
      expect(actual.get(name2)).not.toBe(name2);
      expect(actual.get(name3)).not.toBe(name3);
    }
  });

  it("should handle a longer list", async () => {
    const names = ["Alice", "Bob", "Charlie", "David", "Eve"];

    const expected = new Map([
      ["Alice", "Bob"],
      ["Bob", "Charlie"],
      ["Charlie", "David"],
      ["David", "Eve"],
      ["Eve", "Alice"],
    ]);

    const actual = genSanta(names);

    expect(actual).toEqual(expected);
  });
});
