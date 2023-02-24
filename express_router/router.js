const express = require("express");
const router = express.Router();
const {Restaurant} = require("../models/index")
const {check, validationResult, body} = require("express-validator");


router.use(express.json());
router.use(express.urlencoded({extended: true}))

router.get("/restaurants", async (req, res) => {
    const restaurants = await Restaurant.findAll();
    res.json(restaurants);
})

router.get("/restaurants/:id", async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id);
    res.json(restaurant);
})

router.post("/restaurants",
    [
        body('name').notEmpty().withMessage('name field is required.')
        .trim().isLength({min: 10, max: 30}).withMessage('name must be between 10 and 30 characters long.'),
        body('location').notEmpty().withMessage('location field is required.').trim(),
        body('cuisine').notEmpty().withMessage('cuisine field is required.').trim(),
    ], 
    async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const restaurant = await Restaurant.create(req.body);
    res.json(restaurant);
})

router.put("/restaurants/:id", async (req, res) => {
    const restaurant = await Restaurant.update(req.body, {
        where: {
            id: req.params.id
        }
    });
    res.json(restaurant);
})

router.delete("/restaurants/:id", async (req, res) => {
    const restaurant = await Restaurant.destroy({
        where: {
            id: req.params.id
        }
    });
    res.json(restaurant);
})







module.exports = router;