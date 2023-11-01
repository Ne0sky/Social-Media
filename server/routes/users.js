import express from "express";

import {
    getUser,
    getUserFriends,
    addRemoveFriend,
} from "../controllers/users.js";

import { verifytoken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", verifytoken, getUser) // frontend sends the id
router.get("/:id/friends", verifytoken, getUserFriends);

/* PATCH */
router.patch(":/id/:friendId", verifytoken, addRemoveFriend) // route -> middleware -> controller

export default router