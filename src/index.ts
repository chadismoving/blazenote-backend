import { Hono } from "hono";
import { cors } from "hono/cors";
import notes from "./routes/notes.route";
import files from "./routes/files.route";
import filesWorkers from "./routes/files-workers.route";
import images from "./routes/images.route";
import ai from "./routes/ai.route";

const app = new Hono();

// Define allowed origins
// Important! No trailing slash
const allowedOrigins = new Set([
  "https://blazenote-frontend-c9l.pages.dev",
  "https://blazenote.kind-jukebox.sxplab.com",
  
]);
// https://hono.dev/docs/middleware/builtin/cors
app.use(
  "*",
  cors({
    origin: (origin) => {
      if (allowedOrigins.has(origin)) {
        return origin; // Allow this origin
      }
      return null; // Disallow this origin
    },
    credentials: true,
    allowMethods: ["POST", "GET", "DELETE", "PUT"],
    allowHeaders: [
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Origin",
      "Access-Control-Allow-Methods",
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, Cache-Control",
    ],
  })
);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/notes", notes);
app.route("/files", files);
app.route("/files-workers", filesWorkers);
app.route("/images", images);
app.route("/ai", ai);

export default app;
