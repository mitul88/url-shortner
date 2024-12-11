import { createClient } from "redis";

const client = createClient();

client.on("error", (err: Error) => console.log("Redis is not connected!"));

client.connect().then(() => console.log("redis connected!"));

export const setValue = async (key: string, value: string) => {
  return client.set(key, value);
};

export const expireValue = async (key: string, timestamp: number) => {
  return client.expire(key, timestamp);
};

export const getValue = async (key: string) => {
  return client.get(key);
};

export const getObjValue = async (key: string) => {
  return client.hGetAll(key);
};

export const setObjValue = async (key: string, value: { string: string }) => {
  return client.hSet(key, value);
};

export const setObjPropValue = async (
  key: string,
  prop: string,
  val: string
) => {
  return client.hSet(key, prop, val);
};
