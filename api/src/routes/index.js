const { Router } = require("express");
// Middleware
const validateToken = require("../middleware/validateToken");
// import all routes
const signInRouter = require("./signIn");
const signUpRouter = require("./signUp");
const refreshRouter = require("./refresh");

const operationsRouter = require("./operations");
const createOperationsRouter = require("./createOperations");
const updateOperationsRouter = require("./updateOperations");
// const deleteOperationsRouter = require("./deleteOperations");

const categoriesRouter = require("./categories");

// instance a new router
const router = Router();

// add routes to router
router.post("/signin", signInRouter);
router.post("/signup", signUpRouter);
router.post("/refresh", refreshRouter);

router.put("/operations/:id", [validateToken], updateOperationsRouter);
router.get("/operations", [validateToken], operationsRouter);
router.post("/operations", [validateToken], createOperationsRouter);
// router.delete("/operations/:id", [validateToken], deleteOperations);

router.get("/categories", [validateToken], categoriesRouter);

module.exports = router;
