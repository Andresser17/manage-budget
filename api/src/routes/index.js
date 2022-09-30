const { Router } = require("express");
// import all routes
const signInRouter = require("./signIn");
const signUpRouter = require("./signUp");
// const signOutRouter = require("./signOut");
const refreshRouter = require("./refresh");

const operationsRouter = require("./operations");
const createOperationsRouter = require("./createOperations");
// const updateOperationsRouter = require("./updateOperations");
// const deleteOperationsRouter = require("./deleteOperations");

// instance a new router
const router = Router();

// add routes to router
router.post("/signin", signInRouter);
router.post("/signup", signUpRouter);
// router.post("/signout", signOutRouter);
router.post("/refresh", refreshRouter);

router.get("/operations", operationsRouter);
router.post("/operations", createOperationsRouter);
// router.put("/operations", updateOperations);
// router.delete("/operations", deleteOperations);

module.exports = router;
