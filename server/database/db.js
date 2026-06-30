const {Pool} = require('pg');

const dbConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5433,
};

console.log('Configuración de DB: ',{
    user: dbConfig.user,
    host: dbConfig.host,
    database: dbConfig.database,
    port: dbConfig.port,
});

const pool = new Pool(dbConfig);

//test initial conection

pool.connect((err,client,release)=>{
    if(err){
        console.log('Error al conectar a PostgreSQL: ',err);
        return;
    }else{
        console.log('Conexión existosa a PostgreSQL');
        release();
    }
});

module.exports = {
    query: (text,params) => pool.query(text,params),
    pool
}