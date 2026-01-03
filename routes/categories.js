import express from "express";
// import DonationUser from "../models/DonationUser.js";
import auth from "../middleware/auth.js";
import { Op } from 'sequelize';
import model from '../models/index.cjs';

const { User,   Categories, CategoriesLists, CategoriesListItems, PurchaseDetails } = model;

const router = express.Router();

// Get all categories
// router.get("/categories", auth, async (req, res) => {
router.get("/categories", async (req, res) => {
  try {
    const categories = await Categories.findAll();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add Categories-list
router.post("/categories-list", async (req, res) => {
    const { type, imageName, categoryId } = req.body;
    try {
        const categoriesList = await CategoriesLists.findOne({ where: { [Op.or]: [{ type }] } });
        if (categoriesList) {
            return res.status(422)
                .send({ message: 'Type already exists' });
        }

        // Create new categories list
        const newData = await CategoriesLists.create({
            type,
            image_name: imageName,
            category_id: categoryId
        });

        res.status(201).json({ id: newData.id, type: newData.type, imageName: newData?.image_name, categoryId: newData?.category_id, updatedAt: newData.updatedAt, createdAt: newData.createdAt });
    } catch (e) {
        console.log(e);
        return res.status(500)
            .send(
                { message: 'Could not perform operation at this time, kindly try again later.' });
    }
});

// Get all categories-list
router.get("/categories-list", async (req, res) => {
  try {
    const categoriesList = await CategoriesLists.findAll();
    res.json(categoriesList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all categories-list by id
router.post("/categories-list-by-id", async (req, res) => {
  try {
    const { category_id } = req.body;
    const categoriesList = await CategoriesLists.findAll({ where: { [Op.or]: [{ category_id }] } });
    res.json(categoriesList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add Categories-list-items
router.post("/categories-list-items", async (req, res) => {
    const { itemName, imageName, price, discountPrice, ratings, sendItemsCount, listId } = req.body;
    try {
        const categoriesListItems = await CategoriesListItems.findOne({ where: { [Op.or]: [{ item_name: itemName }] } });
        if (categoriesListItems) {
            return res.status(422)
                .send({ message: 'Item name already exists' });
        }

        // Create new categories list
        const newData = await CategoriesListItems.create({
            item_name: itemName,
            image_name: imageName,
            price,
            discount_price: discountPrice,
            ratings: ratings,
            send_items_count: sendItemsCount,
            list_id: listId
        });

        res.status(201).json({ id: newData?.id, itemName: newData.item_name, imageName: newData?.image_name, price: newData?.price, discountPrice: newData?.discount_price, ratings: newData?.ratings, sendItemsCount: newData?.send_items_count, listId: newData?.list_id, updatedAt: newData.updatedAt, createdAt: newData.createdAt });
    } catch (e) {
        console.log(e);
        return res.status(500)
            .send(
                { message: 'Could not perform operation at this time, kindly try again later.' });
    }
});

// Get all categories-list-items by id
router.post("/categories-list-items-by-id", auth, async (req, res) => {
  try {
    const { listId } = req.body;
    const categoriesListItems = await CategoriesListItems.findAll({ where: { [Op.or]: [{ list_id: listId }] } });
    res.json(categoriesListItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get categories-list-items details by list_item_id
router.post("/categories-list-items-details", async (req, res) => {
  try {
    const { id } = req.body;
    const categoriesListItems = await CategoriesListItems.findAll({ where: { [Op.or]: [{ id }] } });
    res.json(...categoriesListItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add purchase detail (for the authenticated user)
router.post("/purchase-detail", async (req, res) => {
    const { userId, categoriesId, listId, listItemId, quantity, amount } = req.body;
    console.log("======" + JSON.stringify(req.body))
    try {
        // const purchaseDetail = await PurchaseDetails.findOne({ where: { [Op.or]: [{ user_id: userId }] } });
        // console.log("-------" + purchaseDetail)
        // if (!purchaseDetail) {
        //     return res.status(422)
        //         .send({ message: 'Enter all the required information!' });
        // }

        // Create new purchase list
        const newData = await PurchaseDetails.create({
            user_id: userId,
            categories_id: categoriesId,
            list_id: listId,
            list_item_id: listItemId,
            quantity,
            amount
        });

        res.status(201).json({ id: newData.id, userId: newData.user_id, categoriesId: newData?.categories_id, listId: newData?.listId, listItemId: newData?.list_item_id, quantity: newData?.quantity, amount: newData?.amount, updatedAt: newData.updatedAt, createdAt: newData.createdAt });
    } catch (e) {
        console.log(e);
        return res.status(500)
            .send(
                { message: 'Could not perform operation at this time, kindly try again later.' });
    }
});

export default router;
