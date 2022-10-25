module.exports = {
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "",
  database: "db_sql_PI",
  define: {
    timestamps: true,
    underscored: true,
  },
  jwtSecret: "7fad2ee3eb5a7cce3ee1a0c81cb4a101",
  jwtSession: {session: false},

};
