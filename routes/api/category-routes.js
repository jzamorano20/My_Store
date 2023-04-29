const router = require('express').Router();
const { Category, Product } = require('../../models');




router.get('/', async (req, res) => {
  // find all categories and include its associated Products
  try {
    const categories = await Category.findAll({
      include: [Product]
    });
    res.status(200).json(categories)
  } catch (err) {
    res.status(500).json(err)
  }

});
// api/categories/:id
router.get('/:id', async (req, res) => {
  try {
    // Find the category with the matching ID, including its associated products
    const category = await Category.findByPk(req.params.id, { include: [{ model: Product }] });

    // If the category is not found, send a 404 status with a custom message
    if (!category) {
      res.status(404).json({ message: 'not found' });
      return;
    }

    res.status(200).json(category);
  } catch (err) {

    res.status(500).json({ message: 'not found!' });
  }
});
//api/catergoies
router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    // Handle errors by sending a 400 status with a custom message
    res.status(400).json({ message: 'creation failed' });
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updated = await Category.update(req.body, { where: { id: req.params.id } });
    !updated[0] ? res.status(404).json({ message: "not found id" }):
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'update failed' });
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleted = await Category.destroy({ where: { id: req.params.id } });
    !deleted ? res.status(404).json({ message: 'id not found' }) : res.status(200).json(deleted);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
