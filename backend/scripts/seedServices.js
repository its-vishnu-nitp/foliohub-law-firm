require('dotenv').config();
const mongoose=require('mongoose');const Service=require('../models/Service');
const items=[
{name:'Corporate & Business',description:'Business formation, contracts and governance.',sortOrder:1},
{name:'Property & Real Estate',description:'Property agreements and transactions.',sortOrder:2},
{name:'Family & Personal',description:'Personal and family legal matters.',sortOrder:3},
{name:'Initial Consultation',description:'An introductory discussion about a legal matter.',sortOrder:4}
];
(async()=>{if(!process.env.MONGO_URI)throw new Error('MONGO_URI missing');await mongoose.connect(process.env.MONGO_URI);for(const item of items)await Service.updateOne({name:item.name},{$set:item},{upsert:true});console.log(`Seeded ${items.length} services`);await mongoose.disconnect()})().catch(err=>{console.error(err);process.exit(1)});
