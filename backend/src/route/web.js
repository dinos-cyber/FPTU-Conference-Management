import express from "express";

import registerController from "../controller/registrationController";
import authenticate from "../middleware/authenticate";
import adminAuthenticate from "../middleware/adminAuthenticate";
import loginController from "../controller/loginController";
import createUserController from "../controller/createUserController";
import createPaperController from "../controller/createPaperController";
import getAllPaperController from "../controller/getAllPaperController";
import activateController from "../controller/activateController";

const initWebRoute = (app) => {
  app.use(express.json());
  // app.post("/test/adduser", createUserController);
  // app.post("/test/paper", createPaperControllerTest);
  app.get("/activate:email&:token", activateController);
  app.post("/register", registerController);
  app.post("/login", loginController);
  // app.post("/paper", authenticate, createPaperController);
  // app.get("/papers", authenticate, getAllPaperController);
  // app.get("/papers/:id", authenticate, getPaperById);
  // app.put("/papers/:id", authenticate, updatePaper);
  // app.delete("/papers/:id", authenticate, deletePaper);
  // app.get("/profile", authenticate, getUserProfile);
  // app.put("/profile", authenticate, updateUserProfile);
  // app.delete("/account", authenticate, deleteUserAccount);
  // app.get("/users", adminAuthenticate, getAllUsers);
  // app.post("/users", adminAuthenticate, createUser);
  // app.put("/users/:id", adminAuthenticate, updateUser);
  // app.delete("/users/:id", adminAuthenticate, deleteUser);
  // app.put("/users/:id/admin", adminAuthenticate, setAdmin);
  // app.delete("/users/:id/admin", adminAuthenticate, removeAdmin);
};
export default initWebRoute;
