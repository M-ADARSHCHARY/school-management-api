import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import schoolRoutes from "./routes/schoolRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/",schoolRoutes);
app.use((req, res)=>{
    res.status(404).json({message:"Route not found"});
})

app.listen(process.env.PORT,()=>{
    console.log("Server running on port "+process.env.PORT);
});