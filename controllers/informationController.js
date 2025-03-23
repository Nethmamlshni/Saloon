import TeamMember from "../models/informationModel.js";

// Add a new team member
export const createTeamMember = async (req, res) => {
    try {
        const teamMember = new TeamMember(req.body);
        await teamMember.save();
        res.status(201).json(teamMember);
    } catch (error) {
        res.status(500).json({ error: "Failed to add team member", details: error.message });
    }
};

// Get all team members
export const getAllTeamMembers = async (req, res) => {
    try {
        const teamMembers = await TeamMember.find();
        res.status(200).json(teamMembers);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch team members", details: error.message });
    }
};

// Get a single team member by ID
export const getTeamMemberById = async (req, res) => {
    try {
        const teamMember = await TeamMember.findById(req.params.id);
        if (!teamMember) {
            return res.status(404).json({ message: "Team member not found" });
        }
        res.status(200).json(teamMember);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch team member", details: error.message });
    }
};

// Update a team member
export const updateTeamMember = async (req, res) => {
    try {
        const updatedTeamMember = await TeamMember.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTeamMember) {
            return res.status(404).json({ message: "Team member not found" });
        }
        res.status(200).json(updatedTeamMember);
    } catch (error) {
        res.status(500).json({ error: "Failed to update team member", details: error.message });
    }
};

// Delete a team member
export const deleteTeamMember = async (req, res) => {
    try {
        const deletedTeamMember = await TeamMember.findByIdAndDelete(req.params.id);
        if (!deletedTeamMember) {
            return res.status(404).json({ message: "Team member not found" });
        }
        res.status(200).json({ message: "Team member deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete team member", details: error.message });
    }
};
