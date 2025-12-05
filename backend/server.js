const http = require("http");
const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";
const DB_NAME = "kaarTechDB";
const COLLECTION_NAME = "kaar_users";

const client = new MongoClient(MONGO_URI);

const setCors = (res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
};

const sendJson = (res, statusCode, data) => {
  setCors(res);
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
};

const parseBody = (req) =>
  new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
      if (body.length > 1e6) {
        req.connection.destroy();
        reject(new Error("Payload too large"));
      }
    });
    req.on("end", () => {
      try {
        const parsed = JSON.parse(body || "{}");
        resolve(parsed);
      } catch (err) {
        reject(new Error("Invalid JSON"));
      }
    });
    req.on("error", reject);
  });

const startServer = async () => {
  await client.connect();
  const db = client.db(DB_NAME);
  const users = db.collection(COLLECTION_NAME);

  const server = http.createServer(async (req, res) => {
    setCors(res);

    if (req.method === "OPTIONS") {
      res.writeHead(204);
      res.end();
      return;
    }

    if (req.method === "POST" && req.url === "/register") {
      try {
        const { username, email, password } = await parseBody(req);
        if (!username || !email || !password) {
          sendJson(res, 400, { error: "username, email, and password are required" });
          return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await users.insertOne({ username, email, password: hashedPassword, createdAt: new Date() });

        sendJson(res, 200, { username, email, hashedPassword });
      } catch (err) {
        const status = err.message === "Invalid JSON" ? 400 : 500;
        sendJson(res, status, { error: err.message || "Server error" });
      }
      return;
    }

    sendJson(res, 404, { error: "Not found" });
  });

  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer().catch((err) => {
  console.error("Failed to start server", err);
  process.exit(1);
});


