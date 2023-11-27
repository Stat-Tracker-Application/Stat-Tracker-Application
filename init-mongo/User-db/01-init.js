print("Executing initialization script...");

// Use the Stat-Db database
var dbName = "User-Db";
db = db.getSiblingDB(dbName);

// Create a user
db.createUser({
  user: "User1",
  pwd: "Adminpw",
  roles: [
    {
      role: "readWrite",
      db: dbName,
    },
  ],
});

// Output a message to the MongoDB log
print("User 'User1' created successfully in database 'User-Db'.");

// Display the list of users
var users = db.getUsers();
print(users);

print("end of script");
