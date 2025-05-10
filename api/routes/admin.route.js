import express from 'express';
import { getAllUsers, verifyListing, deleteListing } from '../controllers/admin.controller.js';
import { verifyAdmin } from '../utils/verifyAdmin.js';
import { adminLogin } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/api/auth/admin-login', adminLogin); // Only define it once
router.get('/users', verifyAdmin, getAllUsers);
router.put('/listings/:id/verify', verifyAdmin, verifyListing);
router.delete('/listings/:id', verifyAdmin, deleteListing);

export default router;