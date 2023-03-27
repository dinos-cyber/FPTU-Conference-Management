import express from "express";

import registerController from "../controller/registrationController";
import authenticate from "../middleware/authenticate";
import adminAuthenticate from "../middleware/adminAuthenticate";
import loginController from "../controller/loginController";
import createPaperController from "../controller/createPaperController";
import getAllPaperController from "../controller/getAllPaperController";
import activateController from "../controller/activateController";
import uploadFileController from "../controller/uploadFileController";
import { setAdminController } from "../controller/setAdminAuthentication";
import getAllUserPaperController from "../controller/getAllUserPaperController";
import downloadFileController from "../controller/downloadFileController";
import { getPaper } from "../controller/getPaperController";
import { deletePaper } from "../controller/deletePaperController";
import { updatePaper } from "../controller/updatePaperController";
import { getUserProfile } from "../controller/getUserProfileController";
import { updateUserProfile } from "../controller/updateUserProfileController";
import { deleteUserAccount } from "../controller/deleteUserController";
import { getAllUsers } from "../controller/getAllUserController";
import { createUser } from "../controller/createUserController";
import { removeAdmin } from "../controller/removeAdminAuthentication";
const initWebRoute = (app) => {
  app.use(express.json());

  app.get("/activate/:token", activateController);
  app.post("/register", registerController);
  app.post("/login", loginController);
  app.post("/paper", authenticate, createPaperController);
  app.post("/upload/:path", authenticate, uploadFileController);
  app.get("/download/:path", authenticate, downloadFileController);
  app.get("/papers/:id", authenticate, getPaper);
  app.post("/updatepapers/:id", authenticate, updatePaper);
  app.get("/allpaper", authenticate, getAllUserPaperController);
  // test below
  app.delete("/papers/:id", authenticate, deletePaper);
  app.get("/profile", authenticate, getUserProfile);
  app.post("/profile", authenticate, updateUserProfile);
  app.delete("/account", authenticate, deleteUserAccount);
  app.get("/users", adminAuthenticate, getAllUsers);
  app.post("/users", adminAuthenticate, createUser);
  app.put("/users/:id", adminAuthenticate, updateUserProfile);
  app.delete("/users/:id", adminAuthenticate, deleteUserAccount);
  app.get("/papers", adminAuthenticate, getAllPaperController);
  app.put("/users/:id/admin", adminAuthenticate, setAdminController);
  app.delete("/users/:id/admin", adminAuthenticate, removeAdmin);
};
export default initWebRoute;
