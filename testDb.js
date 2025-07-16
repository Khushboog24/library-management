// const db = require('./db');

// (async () => {
//   try {
//     const result = await db.query('SELECT NOW()');
//     console.log('✅ Database connected successfully!');
//     console.log('Current time:', result.rows[0].now);
//     process.exit(0);
//   } catch (err) {
//     console.error('❌ Database connection failed:', err);
//     process.exit(1);
//   }
// })();
const db = require('./db');

(async () => {
  try {
    const result = await db.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_type = 'BASE TABLE';
    `);

    if (result.rows.length === 0) {
      console.log('⚠️ No tables found in the "public" schema.');
    } else {
      console.log('✅ Tables found:');
      result.rows.forEach(row => console.log(`- ${row.table_name}`));
    }

    process.exit(0);
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
    process.exit(1);
  }
})();
