// controllers/admin.controller.js
import User from '../models/user.model.js';
import Listing from '../models/listing.model.js';

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export const verifyListing = async (req, res, next) => {
  try {
    const listing = await Listing.findByIdAndUpdate(req.params.id, { verified: true }, { new: true });
    res.status(200).json(listing);
  } catch (err) {
    next(err);
  }
};

export const deleteListing = async (req, res, next) => {
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json('Listing deleted');
  } catch (err) {
    next(err);
  }
};
