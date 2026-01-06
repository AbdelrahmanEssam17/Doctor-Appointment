import mongoose from "mongoose";
const PhotoSchema=new schema({
title:String,
ImgUrl:String 
},{Timestamp:true})
export const photo=model('photo',schema)