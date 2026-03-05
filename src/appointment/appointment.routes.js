import { Router } from "express";
import multer from "multer";
import { 
    createAppointment, 
    getAppointments, 
    getAppointmentById,
    getAppointmentsByDate,
    getAppointmentsByBarber,
    getAppointmentsByClient,
    updateAppointment,
    cancelAppointment
} from "./appointment.controller.js";

const router = Router();
const parseFormData = multer().none();

router.post("/create", parseFormData, createAppointment);
router.get("/", getAppointments);
router.get("/date/:date", getAppointmentsByDate);
router.get("/barber/:barberId", getAppointmentsByBarber);
router.get("/client/:clientId", getAppointmentsByClient);
router.get("/:id", getAppointmentById);
router.put("/:id", parseFormData, updateAppointment);
router.delete("/:id", cancelAppointment);

export default router;