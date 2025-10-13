import express, { Request, Response } from "express";
import pool from "../config/database";
import {
  addStudentQuery,
  domainListQuery,
  studentInfoQuery,
  studentListQuery,
} from "../query/studentqueries";

const router = express.Router();

router.get("/domains", async (_, res: Response) => {
  try {
    const result = await pool.query(domainListQuery);
    res.status(200).json({
      success: true,
      message: "Domains fetched successfully",
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching domain list", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

router.get("/info/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(studentInfoQuery, [id]);
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

router.get("/list", async (_, res: Response) => {
  try {
    const result = await pool.query(studentListQuery);
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

router.post("/create", async (req: Request, res: Response) => {
  const {
    studentName,
    domainRef,
    dateOfBirth,
    contactInfo,
    email,
    nativePlace,
    fatherName,
    motherName,
    noOfSibling,
    dateOfJoining,
  } = req.body;

  try {
    await pool.query(addStudentQuery, [
      studentName,
      domainRef,
      dateOfBirth,
      contactInfo,
      email,
      nativePlace,
      fatherName,
      motherName,
      noOfSibling,
      dateOfJoining,
    ]);

    res.status(201).json({
      success: true,
      message: "Student added successfully",
    });
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

router.post("/update", async (req: Request, res: Response) => {
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
    await pool.query(addStudentQuery, [
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
    ]);

    res.status(201).json({
      success: true,
      message: "Student added successfully",
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
