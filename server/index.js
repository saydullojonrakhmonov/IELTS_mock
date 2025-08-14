const express = require ('express');
const cors  = require( 'cors');

const adminRoutes = require("./routes/admin-routes");
const userRoutes = require("./routes/user-routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/admin", adminRoutes)
app.use("/user", userRoutes)

const startServer = async () => {
    try {
      const PORT = process.env.PORT || 3000;
      app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
      });
    } catch (error) {
      console.error("Failed to connect to DB:", error);
    }
  };
  
  startServer();