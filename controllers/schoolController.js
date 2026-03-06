import db from "../db.js";
import { v4 as uuidv4 } from "uuid";
import { calculateDistance } from "../utils/calculateDistance.js";

export const addSchool = async (req,res) => {

    try{
        const {name,address,latitude,longitude} = req.body;
        const id = uuidv4();
    if(!name || !address || !latitude || !longitude){
        return res.status(400).json({message:"All fields required"});
    }

    const sql = `
    INSERT INTO schools(id,name,address,latitude,longitude)
    VALUES(?,?,?,?,?)
    `;

    await db.execute(sql,[id,name,address,latitude,longitude]);

    res.json({message:"School added successfully"});
    }catch(err){
        res.status(500).json({message:"Server error"});
    }
};

export const listSchools = async (req,res) => {

    const {latitude,longitude} = req.query;
    console.log(latitude,longitude);
    const [schools] = await db.execute("SELECT * FROM schools");

    const sortedSchools = schools.map(school => {

        const distance = calculateDistance(
            latitude,
            longitude,
            school.latitude,
            school.longitude
        );

        return {...school,distance};

    }).sort((a,b)=> a.distance - b.distance);

    res.json(sortedSchools);
};