import express from 'express';

import {
    getAllServices,
    getServiceById,
    updateService,
    createService,
    deleteService
} from '../controllers/servicesController.js';

const Servicerouter = express.Router();

Servicerouter.get('/service', getAllServices);
Servicerouter.get('/service/:id', getServiceById);
Servicerouter.put('/service/:id', updateService);
Servicerouter.post('/service', createService);
Servicerouter.delete('/service/:id', deleteService);

export default Servicerouter;