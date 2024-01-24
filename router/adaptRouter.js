import express from 'express';
import AdaptModel from "../models/adapt.js";

const adaptRouter = express.Router();

// GET all adapts
adaptRouter.get('/', async (req, res) => {
  try {
    const adapts = await AdaptModel.find();
    res.json(adapts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a specific adapt by ID
adaptRouter.get('/:id', getAdapt, (req, res) => {
  res.json(res.adapt);
});
// New route for fetching adapts by category
// Assuming you have a TypesModel representing pet types

// GET all types
adaptRouter.get('/types', async (req, res) => {
    try {
        // Assuming you have a TypesModel representing pet types
        const allTypes = await TypesModel.find();

        if (allTypes.length === 0) {
            return res.status(404).json({ message: 'No pet types found' });
        }

        const typeNames = allTypes.map(type => type.name); // Adjust property name accordingly

        res.status(200).json(typeNames);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving pet types' });
    }
});

adaptRouter.get('/types/:types', async (req, res) => {
    try {
        const petType = req.params.types ? req.params.types.toLowerCase() : null;
        if (petType === 'all') {
            // Fetch all adapts without filtering by type
            const allAdapts = await AdaptModel.find();
            return res.status(200).json(allAdapts);
        }

        if (!petType) {
            return res.status(400).json({ error: 'Types parameter is missing' });
        }

        let adaptsOfType;

        if (petType === 'others') {
            // Get all adapts where types is not 'Dog' or 'Cat'
            adaptsOfType = await AdaptModel.find({ types: { $nin: ['Dog', 'Cat'] } });
        } else {
            // Make the query case-insensitive, excluding 'others'
            adaptsOfType = await AdaptModel.find({
                $and: [
                    { types: { $regex: new RegExp(petType, 'i') } },
                    { types: { $ne: 'others' } }
                ]
            });
        }

        if (adaptsOfType.length === 0) {
            return res.status(404).json({ message: `No adapts found for the specified types: ${petType}` });
        }

        res.status(200).json(adaptsOfType);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving adapts by types' });
    }
});



// POST a new adapt
adaptRouter.post('/adapts', async (req, res) => {
  const adapt = new AdaptModel({
    ...req.body
  });

  try {
    const newAdapt = await adapt.save();
    res.status(201).json(newAdapt);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
adaptRouter.put('/:id', getAdapt, async (req, res) => {
    try {
        const adaptToUpdate = res.adapt;

        // Update adapt properties based on the request body
        adaptToUpdate.name = req.body.name || adaptToUpdate.name;
        adaptToUpdate.img = req.body.img || adaptToUpdate.img;
        adaptToUpdate.types = req.body.types || adaptToUpdate.types;
        adaptToUpdate.about = req.body.about || adaptToUpdate.about;
        adaptToUpdate.year = req.body.year || adaptToUpdate.year;
        adaptToUpdate.sex = req.body.sex || adaptToUpdate.sex;
        adaptToUpdate.color = req.body.color || adaptToUpdate.color;
        adaptToUpdate.breed = req.body.breed || adaptToUpdate.breed;
        adaptToUpdate.coatLength = req.body.coatLength || adaptToUpdate.coatLength;
        adaptToUpdate.zip = req.body.zip || adaptToUpdate.zip;
        adaptToUpdate.city = req.body.city || adaptToUpdate.city;
        adaptToUpdate.adres = req.body.adres || adaptToUpdate.adres;
        adaptToUpdate.vaccinated = req.body.vaccinated || adaptToUpdate.vaccinated;
        adaptToUpdate.fee = req.body.fee || adaptToUpdate.fee;

        // Save the updated adapt to the database
        const updatedAdapt = await adaptToUpdate.save();

        res.json(updatedAdapt);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE an adapt by ID
adaptRouter.delete('/:id', getAdapt, async (req, res) => {
  try {
    await res.adapt.deleteOne({ _id: req.params.id });
    res.json({ message: 'Adapt deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware function to get an adapt by ID
async function getAdapt(req, res, next) {
  let adapt;

  try {
    adapt = await AdaptModel.findById(req.params.id);

    if (adapt == null) {
      return res.status(404).json({ message: 'Adapt not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.adapt = adapt;
  next();
}

export default adaptRouter;
