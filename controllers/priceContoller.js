import Price from "../models/priceModel.js";

// Get all prices
export const getAllPrices = async (req, res) => {
    try {
        const prices = await Price.find();
        res.status(200).json(prices);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch price data", details: error.message });
    }
};

// Add a new price entry
export const addPrice = async (req, res) => {
    try {
        const newPrice = new Price(req.body);
        await newPrice.save();
        res.status(201).json(newPrice);
    } catch (error) {
        res.status(500).json({ error: "Failed to add price", details: error.message });
    }
};

// Delete a price entry
export const deletePrice = async (req, res) => {
    try {
        const deletedPrice = await Price.findByIdAndDelete(req.params.id);
        if (!deletedPrice) {
            return res.status(404).json({ message: "Price not found" });
        }
        res.status(200).json({ message: "Price deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete price", details: error.message });
    }
};

export const updatePrice = async (req, res) => {
    try {
      const updatedPrice = await Price.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedPrice) {
        return res.status(404).json({ message: "Price not found" });
      }
      res.status(200).json({ updatedPrice });
    } catch (error) {
      res.status(500).json({ error: "Failed to update price", details: error.message });
    }
  };