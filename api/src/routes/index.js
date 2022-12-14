const { Router } = require("express");
// Middleware
const validateToken = require("../middleware/validateToken");
// import all routes
const signInRouter = require("./signIn");
const signUpRouter = require("./signUp");
const refreshRouter = require("./refresh");

const userDataRouter = require("./userData");

const operationsRouter = require("./operations");
const createOperationsRouter = require("./createOperations");
const updateOperationsRouter = require("./updateOperations");
const deleteOperationsRouter = require("./deleteOperations");

const categoriesRouter = require("./categories");

// instance a new router
const router = Router();

// add routes to router
router.post("/signin", signInRouter);
router.post("/signup", signUpRouter);
router.post("/refresh", refreshRouter);

router.get("/userdata", [validateToken], userDataRouter);

router.put("/operations/:id", [validateToken], updateOperationsRouter);
router.get("/operations", [validateToken], operationsRouter);
router.post("/operations", [validateToken], createOperationsRouter);
router.delete("/operations/:id", [validateToken], deleteOperationsRouter);

router.get("/categories", [validateToken], categoriesRouter);

module.exports = router;
