// import express from 'express';
// import { google, signOut, signin, signup, registerAdmin, adminLogin } from '../controllers/auth.controller.js'; // Import registerAdmin

// const router = express.Router();

// router.post("/signup", signup);
// router.post("/signin", signin);
// router.post('/google', google);
// router.get('/signout', signOut);
// router.post('/admin-register', registerAdmin); // Add this line for admin registration
// router.post('/admin-login',adminLogin)
// export default router;

import express from 'express';
import { google, signOut, signin, signup } from '../controllers/auth.controller.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post('/google', google);
router.get('/signout', signOut)

export default router;