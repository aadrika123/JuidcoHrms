import app from "./app";
import { scheduler } from "./scheduler";

const PORT = process.env.PORT || 7001;

app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`);
});

scheduler.start();
