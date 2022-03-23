import { Schema, model } from "mongoose";

const ProjectSchema = new Schema(
  { 
    title:{
        type: String, 
        required: true
    },
    description: {
        type:String, 
        required: true,
    },
    from_date: {
        type:String, 
        required: true,
    },
    to_date: {
        type:String, 
        required: true,
    },
    }
);

const ProjectModel = model("Project", ProjectSchema);

export { ProjectModel };