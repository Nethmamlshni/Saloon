import express from "express";
import {
    createTeamMember,
    getAllTeamMembers,
    getTeamMemberById,
    updateTeamMember,
    deleteTeamMember
} from "../controllers/informationController.js";

const Inforrouter = express.Router();

// Define routes
Inforrouter.post("/team", createTeamMember);
Inforrouter.get("/team", getAllTeamMembers);
Inforrouter.get("/team/:id", getTeamMemberById);
Inforrouter.put("/team/:id", updateTeamMember);
Inforrouter.delete("/team/:id", deleteTeamMember);

export default Inforrouter;
