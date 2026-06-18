import express from "express";
import "dotenv/config";
import { router as bookRouter } from "./routes/books.routes.js";
import { router as passageRouter } from './routes/passages.routes.js'
import searchRouter from "./routes/search.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.set("json replacer", (key, value) =>
  typeof value === "bigint" ? value.toString() : value,
);

app.use('/api/v1/books', bookRouter)
app.use('/api/v1/passages', passageRouter)
app.use('/api/v1/search', searchRouter)


export const start = () => {
  app.listen(PORT, () => {
    console.log(`The application is running at http://localhost:${PORT}`);
  });
};
