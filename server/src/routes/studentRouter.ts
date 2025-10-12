import express, { Request, Response } from "express";
import pool from "../config/database";

const router = express.Router();

router.get("/info/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM student WHERE student_id = $1",
      [id]
    );
    if (result.rows.length > 0) {
      res.status(200).json({
        success: true,
        message: "Students fetched successfully",
        data: result.rows[0],
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid student id",
        data: [],
      });
    }
  } catch (error) {
    console.error(`[${id}] Error student id`, error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

router.get("/list", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      "SELECT * FROM student ORDER BY student_id ASC"
    );
    res.status(200).json({
      success: true,
      message: "Students fetched successfully",
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching student list", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

router.post("/add", async (req: Request, res: Response) => {
  const {
    student_name,
    domain_id,
    date_of_birth,
    contact_info,
    email,
    native_place,
    father_name,
    mother_name,
    no_of_sibling,
    date_of_joining,
    created_by,
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO student (
        student_name, domain_id, date_of_birth, contact_info, email,
        native_place, father_name, mother_name, no_of_sibling,
        date_of_joining, created_by, last_modified_by
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$11)
      RETURNING *`,
      [
        student_name,
        domain_id,
        date_of_birth,
        contact_info,
        email,
        native_place,
        father_name,
        mother_name,
        no_of_sibling,
        date_of_joining,
        created_by,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Student added successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

export default router;
