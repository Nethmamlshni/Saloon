import express from 'express';
import mongoose from 'mongoose';

const price = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
});

const Price = mongoose.model("Price", price);
export default Price;