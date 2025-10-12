import pkg from 'pg';

const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',    
  host: 'localhost',        
  database: 'student_db',    
  password: 'Venkat@143',
  port: 5432,               
});

pool.connect()
  .then(() => console.log('✅ Connected to PostgreSQL successfully!'))
  .catch(err => console.error('❌ Database connection failed:', err));

export default pool;
