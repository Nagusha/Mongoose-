import express, { Request, Response } from 'express';
import { Prerequisite } from '../models/schema';

const router = express.Router();

// Create a new prerequisite
router.post('/', async (req: Request, res: Response) => {
    try {
        const prerequisite = new Prerequisite(req.body);
        await prerequisite.save();
        res.status(201).send(prerequisite);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all prerequisites
router.get('/', async (req: Request, res: Response) => {
    try {
        const prerequisites = await Prerequisite.find().populate('course prerequisite');
        res.status(200).send(prerequisites);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a single prerequisite by ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const prerequisite = await Prerequisite.findById(req.params.id).populate('course prerequisite');
        if (!prerequisite) {
            return res.status(404).send();
        }
        res.status(200).send(prerequisite);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a prerequisite by ID
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const prerequisite = await Prerequisite.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!prerequisite) {
            return res.status(404).send();
        }
        res.status(200).send(prerequisite);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a prerequisite by ID
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const prerequisite = await Prerequisite.findByIdAndDelete(req.params.id);
        if (!prerequisite) {
            return res.status(404).send();
        }
        res.status(200).send(prerequisite);
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;
