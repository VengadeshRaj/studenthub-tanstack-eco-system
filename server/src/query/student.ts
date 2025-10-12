const studentInfoQuery = `select student_id as "studentId",
student_name as "studentName",
domain_name as "domainName",
date_of_birth as "dateOfBirth",
email,
contact_info as "contactInfo",
native_place as "nativePlace",
father_name as "fatherName",
mother_name as "motherName",
no_of_sibling as "noOfSibiling",
date_of_joining as "dateOfJoining",
student.is_active as "status"
from student inner join domain on student.domain_id = domain.domain_id where student_id=$1`;

const studentListQuery = `select student_id as "studentId",
student_name as "studentName",
domain_name as "domainName",
date_of_birth as "dateOfBirth",
contact_info as "contactInfo"
from student inner join domain on student.domain_id = domain.domain_id order by student_id asc`;

const addStudentQuery = `INSERT INTO student (
        student_name, domain_id, date_of_birth, contact_info, email,
        native_place, father_name, mother_name, no_of_sibling,
        date_of_joining, created_by, last_modified_by
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$11)`;

const domainListQuery = `select domain_ref as "domainRef",
domain_name as "domainName" 
from domain where is_active = true`;

export { studentInfoQuery, studentListQuery, addStudentQuery, domainListQuery };
