import { readData, writeData } from "../helper/readAndWriteData.js";

// Endpoints for Admin
export const getAllAdmins = (req, res) => {
  const admins = readData("db/admins.json");
  res.json(admins);
};

export const getAdminById = (req, res) => {
  const admins = readData("db/admins.json");
  const admin = admins.find((a) => a.id === parseInt(req.params.id));
  if (admin) {
    res.json(admin);
  } else {
    res.status(404).send("Admin not found");
  }
};

export const createAdmin = (req, res) => {
  const admins = readData("db/admins.json");
  const newAdminId = admins[admins.length - 1].id + 1;
  const newAdmin = Object.assign({ id: newAdminId }, req.body);
  admins.push(newAdmin);
  writeData("db/admins.json", admins);
  res.status(201).json(newAdmin);
};

export const editAdmin = (req, res) => {
  const admins = readData("db/admins.json");
  const adminIndex = admins.findIndex((a) => a.id === parseInt(req.params.id));
  if (adminIndex === -1) {
    return res.status(404).send("Admin not found");
  }

  const updatedAdmin = { ...admins[adminIndex], ...req.body };
  admins[adminIndex] = updatedAdmin;
  writeData("db/admins.json", admins);
  res.json(updatedAdmin);
};

export const deleteAdmin = (req, res) => {
  const admins = readData("db/admins.json");
  const adminIndex = admins.findIndex((a) => a.id === parseInt(req.params.id));
  if (adminIndex === -1) {
    return res.status(404).send("Admin not found");
  }

  admins.splice(adminIndex, 1);
  writeData("db/admins.json", admins);
  res.status(204).send("Sueccessfully deleted");
};
