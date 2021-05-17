import { beforeEach, describe, expect, it } from "@jest/globals";
import EventEmitter from "./EventEmitter";

describe("EventEmitter", () => {
  let em;

  beforeEach(() => {
    em = new EventEmitter();
  });

  describe("on", () => {
    it("can setup events correctly", () => {
      em.on("test", () => {});
      expect(em.events["test"]).toHaveLength(1);
    });
  });

  describe("off", () => {
    it("does nothing if trying to remove un-registered events", () => {
      const fn1 = () => {};
      const fn2 = () => {};
      em.on("test", fn1);
      em.off("test", fn2);
      expect(em.events["test"]).toHaveLength(1);
    });

    it("can remove registered events correctly", () => {
      const fn1 = () => {};
      em.on("test", fn1);
      em.off("test", fn1);
      expect(em.events["test"]).toHaveLength(0);
    });
  });

  describe("emit", () => {
    it("can emit events to registered callbacks with the same event name", (done) => {
      const fn1 = (param) => {
        expect(param).toEqual("test1234");
        done();
      };
      const fn2 = () => {
        expect(true).toBe(false);
      };
      em.on("test", fn1);
      em.on("test2", fn2);
      em.emit("test", "test1234");
    });
  });

  describe("once", () => {
    it("can only be called once", () => {
      const fn1 = jest.fn();

      em.once("test", fn1);
      em.emit("test");
      em.emit("test");
      em.emit("test");

      expect(fn1).toHaveBeenCalledTimes(1);
    });
  });
});
