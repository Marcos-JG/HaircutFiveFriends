import { Router } from "express";
import { createHaircut, getHaircuts, getHaircutById, updateHaircut, deleteHaircut, getHaircutByFaceType, getHaircutByName } from "./haircut.controller.js"
import { uploadProfilePicture } from "../../middlewares/file-uploader.js";
import { validateCreateHaircut, validateUpdateHaircut } from "../../middlewares/haircut-validator.js";

const router = Router();

router.post(
    "/create",
    uploadProfilePicture.single("imageRef"),
    validateCreateHaircut,
    createHaircut
);

router.get(
    "/",
    getHaircuts
);

router.get(
    "/FaceType/:faceType",
    getHaircutByFaceType
)

router.get(
    "/Name/:name",
    getHaircutByName
)

router.get(
    "/:id",
    getHaircutById
);

router.put(
    "/:id",
    uploadProfilePicture.single("imageRef"),
    validateUpdateHaircut,
    updateHaircut
);

router.delete(
    "/:id",
    deleteHaircut
);

export default router;