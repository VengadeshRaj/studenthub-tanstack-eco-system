## to create domain table
    `CREATE TABLE domain (
        domain_id SERIAL PRIMARY KEY,
        domain_ref VARCHAR(50) NOT NULL,
        domain_name VARCHAR(100) NOT NULL,
        is_active BOOLEAN DEFAULT TRUE,
        created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_by VARCHAR(50),
        last_modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_modified_by VARCHAR(50)
    );`

## to create student table(master table)

`CREATE TABLE student (
    student_id SERIAL PRIMARY KEY,
    student_name VARCHAR(100) NOT NULL,
    domain_id INT REFERENCES domain(domain_id) ON DELETE CASCADE,
    date_of_birth DATE,
    contact_info VARCHAR(20),
    email VARCHAR(100),
    native_place VARCHAR(100),
    father_name VARCHAR(100),
    mother_name VARCHAR(100),
    no_of_sibling INT,
    date_of_joining DATE,
    is_active BOOLEAN DEFAULT TRUE,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(50),
    last_modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_modified_by VARCHAR(50)
);`


## insert records in domain table

`INSERT INTO domain (domain_ref, domain_name, is_active, created_by, last_modified_by)
VALUES
('DMN001', 'Computer Science', TRUE, 'admin', 'admin'),
('DMN002', 'Electronics', TRUE, 'admin', 'admin'),
('DMN003', 'Mechanical', TRUE, 'admin', 'admin'),
('DMN004', 'Civil', TRUE, 'admin', 'admin'),
('DMN005', 'Automobile', TRUE, 'admin', 'admin');`

## insert dummy records in student table

`INSERT INTO student (
    student_name, domain_id, date_of_birth, contact_info, email,
    native_place, father_name, mother_name, no_of_sibling, date_of_joining,
    is_active, created_by, last_modified_by
) VALUES
('Arun Kumar', 1, '2000-03-14', '9876543210', 'arun.kumar@example.com', 'Chennai', 'Kumar', 'Lakshmi', 2, '2021-06-01', TRUE, 'admin', 'admin'),
('Priya Sharma', 1, '2001-07-19', '9876543211', 'priya.sharma@example.com', 'Madurai', 'Ravi', 'Meena', 1, '2021-06-02', TRUE, 'admin', 'admin'),
('Vikram Raj', 1, '2000-11-05', '9876543212', 'vikram.raj@example.com', 'Coimbatore', 'Raj', 'Anitha', 0, '2021-06-03', TRUE, 'admin', 'admin'),
('Divya Ramesh', 1, '2001-01-20', '9876543213', 'divya.ramesh@example.com', 'Salem', 'Ramesh', 'Kala', 1, '2021-06-04', TRUE, 'admin', 'admin'),
('Naveen Kumar', 1, '2000-09-12', '9876543214', 'naveen.kumar@example.com', 'Tirunelveli', 'Murugan', 'Sita', 3, '2021-06-05', TRUE, 'admin', 'admin'),
('Harini Devi', 2, '2001-02-25', '9876543215', 'harini.devi@example.com', 'Trichy', 'Devi', 'Kavitha', 1, '2021-06-06', TRUE, 'admin', 'admin'),
('Karthik M', 2, '1999-08-30', '9876543216', 'karthik.m@example.com', 'Erode', 'Mani', 'Viji', 2, '2021-06-07', TRUE, 'admin', 'admin'),
('Sandhya P', 2, '2001-10-10', '9876543217', 'sandhya.p@example.com', 'Kanchipuram', 'Prakash', 'Uma', 0, '2021-06-08', TRUE, 'admin', 'admin'),
('Raghul S', 2, '2000-12-22', '9876543218', 'raghul.s@example.com', 'Chidambaram', 'Siva', 'Mala', 2, '2021-06-09', TRUE, 'admin', 'admin'),
('Anitha K', 2, '2000-03-16', '9876543219', 'anitha.k@example.com', 'Vellore', 'Kannan', 'Revathi', 1, '2021-06-10', TRUE, 'admin', 'admin'),
('Gokul Raj', 3, '2001-04-18', '9876543220', 'gokul.raj@example.com', 'Thanjavur', 'Raj', 'Devi', 0, '2021-06-11', TRUE, 'admin', 'admin'),
('Meena L', 3, '2000-05-21', '9876543221', 'meena.l@example.com', 'Namakkal', 'Lakshman', 'Radha', 1, '2021-06-12', TRUE, 'admin', 'admin'),
('Vishal M', 3, '1999-06-27', '9876543222', 'vishal.m@example.com', 'Kanyakumari', 'Mani', 'Geetha', 3, '2021-06-13', TRUE, 'admin', 'admin'),
('Swetha P', 3, '2001-01-14', '9876543223', 'swetha.p@example.com', 'Dindigul', 'Pandi', 'Kaveri', 1, '2021-06-14', TRUE, 'admin', 'admin'),
('Ramesh B', 3, '2000-02-28', '9876543224', 'ramesh.b@example.com', 'Virudhunagar', 'Bala', 'Mala', 2, '2021-06-15', TRUE, 'admin', 'admin'),
('Nandhini S', 4, '2000-07-11', '9876543225', 'nandhini.s@example.com', 'Kovai', 'Suresh', 'Uma', 0, '2021-06-16', TRUE, 'admin', 'admin'),
('Saravanan M', 4, '2001-08-23', '9876543226', 'saravanan.m@example.com', 'Theni', 'Mani', 'Kavitha', 2, '2021-06-17', TRUE, 'admin', 'admin'),
('Keerthi D', 4, '2000-09-15', '9876543227', 'keerthi.d@example.com', 'Karur', 'Dinesh', 'Raji', 1, '2021-06-18', TRUE, 'admin', 'admin'),
('Kavin R', 4, '2001-10-19', '9876543228', 'kavin.r@example.com', 'Cuddalore', 'Ravi', 'Kala', 2, '2021-06-19', TRUE, 'admin', 'admin'),
('Deepa V', 4, '2000-11-25', '9876543229', 'deepa.v@example.com', 'Chennai', 'Vijay', 'Raji', 0, '2021-06-20', TRUE, 'admin', 'admin'),
('Prakash K', 5, '2001-03-29', '9876543230', 'prakash.k@example.com', 'Madurai', 'Kumar', 'Selvi', 1, '2021-06-21', TRUE, 'admin', 'admin'),
('Anjali M', 5, '2000-04-30', '9876543231', 'anjali.m@example.com', 'Theni', 'Murugan', 'Priya', 2, '2021-06-22', TRUE, 'admin', 'admin'),
('Bharath R', 5, '2001-06-11', '9876543232', 'bharath.r@example.com', 'Kanchipuram', 'Raja', 'Devi', 1, '2021-06-23', TRUE, 'admin', 'admin'),
('Kavya S', 5, '2000-07-24', '9876543233', 'kavya.s@example.com', 'Erode', 'Sankar', 'Latha', 0, '2021-06-24', TRUE, 'admin', 'admin'),
('Sundar K', 5, '1999-08-03', '9876543234', 'sundar.k@example.com', 'Trichy', 'Kumar', 'Raji', 3, '2021-06-25', TRUE, 'admin', 'admin');
`


