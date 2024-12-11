import { Express } from "express";
import express from "express";

export = (app: Express) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
};
