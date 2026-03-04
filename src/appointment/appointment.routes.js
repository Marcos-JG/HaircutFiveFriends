import { Router } from "express";
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

router.post("/create", createAppointment);
router.get("/", getAppointments);
router.get("/date/:date", getAppointmentsByDate);
router.get("/barber/:barberId", getAppointmentsByBarber);
router.get("/client/:clientId", getAppointmentsByClient);
router.get("/:id", getAppointmentById);
router.put("/:id", updateAppointment);
router.delete("/:id", cancelAppointment);

export default router;