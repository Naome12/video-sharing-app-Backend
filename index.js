import express from"express"
import userRoutes from "./routes/users.routes.js"
import videoRoutes from "./routes/videos.routes.js"
import commentRoutes from "./routes/comments.routes.js"
import authRoutes from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"
import connection from'./config.js'

const app =express()
connection();
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/video",videoRoutes);
app.use("/api/comment",commentRoutes);

app.use((err,req,res,next)=>{
    const status = err.status || 500
    const message = err.message || "Something went wrong"
    return res.status(status).json({
        success:false,
        status,
        message
    })
})
const PORT= 6000

app.listen(PORT,()=>{
    console.log("Connected")
})

// express mongoose bcryptjs jsonwebtoken cookie-parser nodemon dotenv