import express from "express";
import {
  createServiceCtrl,
  getServiceCtrl,
  searchServicesCtrl,
  getAllServices,
} from "../controllers/services/servicesCtrl.js";;
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();
router.get('/services', getAllServices); 
router.get("/services/provider/:id", getServiceCtrl);

router.use(authMiddleware);
router.post("/services", createServiceCtrl);
router.get("/services/search", searchServicesCtrl);

export default router;
