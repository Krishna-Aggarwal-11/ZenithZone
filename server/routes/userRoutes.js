import express from 'express';
import { updateUser, deleteUser,logout, getUser} from '../controller/userController.js';
import { verifyUser } from '../utils/verifyUser.js';

const router = express.Router();

router.put("/update/:userId",verifyUser, updateUser);
router.delete("/delete/:userId",verifyUser, deleteUser);
router.post("/logout",logout);
router.get("/:userId",verifyUser, getUser);


export default router;