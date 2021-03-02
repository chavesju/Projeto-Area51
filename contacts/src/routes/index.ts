import { Router } from 'express';

import ContactsRepository from '../repositories/ContactsRepository';
import ContactsServices from '../services/CreateContactsService';

const routes = Router();

routes.get('/', async (request, response) => {
  try {
    const contactsRepository = new ContactsRepository();
    const listContacts = await contactsRepository.list();

    if (listContacts.length === 0) {
      return response.status(200).json({
        message: 'Não existe Compania cadastrado',
      });
    }

    return response.status(200).json(listContacts);
  } catch (error) {
    return response.status(500).json(error);
  }
});

routes.post('/register', async (request, response) => {
  try {
    const contactsService = new ContactsServices();

    const {
      company_id,
      phone,
      zip_code,
      address,
      neighborhood,
      number,
      complement,
      state,
      city,
    } = request.body;

    const registerContacts = await contactsService.execute({
      company_id,
      phone,
      zip_code,
      address,
      neighborhood,
      number,
      complement,
      state,
      city,
    });

    return response.status(201).json(registerContacts);
  } catch (error) {
    return response.status(500).json(error);
  }
});

routes.get('/details/:uuid', async (request, response) => {
  try {
    const { uuid } = request.params;
    const contactsRepository = new ContactsRepository();
    const contactsDetails = await contactsRepository.view(uuid);

    console.log(contactsDetails);

    if (contactsDetails === undefined) {
      return response.status(200).json({
        message: 'Nenhum contato encontrado com este ID',
      });
    }

    return response.status(200).json(contactsDetails);
  } catch (error) {
    console.log(error);
    return response.status(500).json(error);
  }
});
routes.put('/update/:uuid', async (request, response) => {
  try {
    const { uuid } = request.params;
    const {
      company_id,
      phone,
      zip_code,
      address,
      neighborhood,
      number,
      complement,
      state,
      city,
    } = request.body;
    const contactsRepository = new ContactsRepository();

    const contactsUpdate = await contactsRepository.update({
      id: uuid,
      company_id,
      phone,
      zip_code,
      address,
      neighborhood,
      number,
      complement,
      state,
      city,
    });

    if (contactsUpdate === false) {
      return response.status(400).json({
        message: 'ID não encontrado',
      });
    }

    return response.status(200).json(contactsUpdate);
  } catch (error) {
    console.log(error);
    return response.status(500).json(error);
  }
});
routes.delete('/remove/:uuid', async (request, response) => {
  try {
    const { uuid } = request.params;
    const contactsRepository = new ContactsRepository();
    const contactsDetails = await contactsRepository.delete(uuid);

    return response.status(200).json(contactsDetails);
  } catch (error) {
    return response.status(500).json(error);
  }
});

export default routes;
