require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const helmet=require('helmet');
const rateLimit=require('express-rate-limit');
const app=express();
app.disable('x-powered-by');
app.use(helmet());
const origins=(process.env.CLIENT_ORIGINS||'http://localhost:5500,http://127.0.0.1:5500,http://localhost:3000').split(',').map(s=>s.trim()).filter(Boolean);
app.use(cors({origin:(origin,callback)=>{if(!origin||origins.includes(origin))return callback(null,true);return callback(new Error('CORS origin not allowed'))}}));
app.use(express.json({limit:'16kb'}));
app.use('/api',rateLimit({windowMs:15*60*1000,limit:120,standardHeaders:'draft-7',legacyHeaders:false}));
app.get('/api/health',(_req,res)=>res.json({ok:true,app:'Foliohub Law Firm API'}));
app.use('/api/bookings',require('./routes/bookingRoutes'));
app.use('/api/services',require('./routes/serviceRoutes'));
app.use('/api/contact',require('./routes/contactRoutes'));
app.use((_req,res)=>res.status(404).json({success:false,message:'Route not found.'}));
app.use((err,req,res,next)=>{console.error(err.message);res.status(err.message==='CORS origin not allowed'?403:500).json({success:false,message:'Request failed. Please try again later.'})});
const PORT=process.env.PORT||5000;
if(!process.env.MONGO_URI){console.error('MONGO_URI is required. Copy .env.example to .env and configure it.');process.exit(1)}
mongoose.connect(process.env.MONGO_URI,{serverSelectionTimeoutMS:10000})
 .then(()=>app.listen(PORT,()=>console.log(`Foliohub API listening on port ${PORT}`)))
 .catch(err=>{console.error('MongoDB connection failed:',err.message);process.exit(1)});
