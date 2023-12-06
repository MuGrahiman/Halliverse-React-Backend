import express from "express";
import {
  fetchAllUser,
  fetchUserById,
  fetchUserBySearchQuery,
  fetchUserByFilter,
  postTeam,
  getTeam,
} from "./Controller.js";
const Router = express.Router();
Router.get("/user/data", fetchAllUser);
Router.get("/user/search", fetchUserBySearchQuery);
Router.get("/user/filter", fetchUserByFilter);
Router.get("/user/:id", fetchUserById);
Router.get("/team", getTeam);
Router.post("/team", postTeam);
export default Router;
