import Service from "../../models/service.js";

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
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getServiceCtrl = async (req, res) => {
  try {
    const services = await Service.find({ provider: req.params.id });
    if (!services) {
      res.status(404).json({ message: "No services found Yet" });
    }
    res.status(200).json({ services });
  } catch (error) {
    console.log();
    res.status(500).json({ message: `Something went wrong` });
  }
};

export const searchServicesCtrl = async (req, res) => {
  try {
    const { serviceType, city, country, availability } = req.query;

    const filter = {};

    if (serviceType) {
      filter.serviceType = serviceType.trim();
    }

    if (availability) {
      const availabilityArray = availability
        .split(",")
        .map((day) => day.trim());
      filter.availability = { $in: availabilityArray };
    }

    if (city) {
      filter["location.city"] = { $regex: new RegExp(city.trim(), "i") };
    }
    if (country) {
      filter["location.country"] = { $regex: new RegExp(country.trim(), "i") };
    }

    const services = await Service.find(filter);

    if (!services.length) {
      return res
        .status(404)
        .json({ message: "No services found matching your criteria." });
    }

    return res.status(200).json({ services });
  } catch (error) {
    console.error(`Error searching services: ${error.message}`);
    return res
      .status(500)
      .json({ message: "Server error, please try again later." });
  }
};