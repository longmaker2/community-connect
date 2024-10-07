import Service from '../../models/service.js';

export const createServiceCtrl = async (req, res) => {
  const loginUser = req.user;
  try {
    const { name, description, duration, price } = req.body;
    const service = await Service.create({
      name,
      description,
      duration,
      price,
      provider: loginUser._id,
    });
    res.status(201).json({ service });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getServiceCtrl = async (req, res) => {
  try {
    const services = await Service.find({ provider: req.params.id });
    if (!services) {
      res.status(404).json({ message: 'No services found Yet'});
    }
    res.status(200).json({ services });
  } catch (error) {
    console.log()
    res.status(500).json({ message: `Something went wrong` });
  }
};
