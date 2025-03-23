import mongoose from "mongoose";

const teamMemberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    position: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    credentials: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    animationClass: { type: String , default: "animate__fadeInUp" },
});

const  TeamMember = mongoose.model("TeamMember", teamMemberSchema);
export default TeamMember;
