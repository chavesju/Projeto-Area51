import { Router } from 'express';

import PersonRepository from '../repositories/PersonsRepository';
import PersonServices from '../services/CreatePersonService';

const routes = Router();

routes.get('/', async (request, response) => {
  try {
    const personRepository = new PersonRepository();
    const listPersons = await personRepository.list();

    if (listPersons.length === 0) {
      return response.status(200).json({
        message: 'Não existe cliente cadastrado',
      });
    }

    return response.status(200).json(listPersons);
  } catch (error) {
    return response.status(500).json(error);
  }
});

routes.post('/register', async (request, response) => {
  try {
    const personService = new PersonServices();

    const { type_person, name, email, status } = request.body;

    const registerPerson = await personService.execute({
      type_person,
      name,
      email,
      status: 'active',
    });

    return response.status(201).json(registerPerson);
  } catch (error) {
    return response.status(500).json(error);
  }
});

routes.get('/details/:uuid', async (request, response) => {
  try {
    const { uuid } = request.params;
    const personRepository = new PersonRepository();
    const personDetails = await personRepository.view(uuid);

    console.log(personDetails);

    if (personDetails === undefined) {
      return response.status(200).json({
        message: 'Nenhum cliente encontrado com este ID',
      });
    }

    return response.status(200).json(personDetails);
  } catch (error) {
    console.log(error);
    return response.status(500).json(error);
  }
});
routes.put('/update/:uuid', async (request, response) => {
  try {
    const { uuid } = request.params;
    const { type_person, name, email, status } = request.body;
    const personRepository = new PersonRepository();

    const personUpdate = await personRepository.update({
      id: uuid,
      type_person,
      name,
      email,
      status,
    });

    if (personUpdate === false) {
      return response.status(400).json({
        message: 'ID não encontrado',
      });
    }

    return response.status(200).json(personUpdate);
  } catch (error) {
    console.log(error);
    return response.status(500).json(error);
  }
});
routes.delete('/remove/:uuid', async (request, response) => {
  try {
    const { uuid } = request.params;
    const personRepository = new PersonRepository();
    const personDetails = await personRepository.delete(uuid);

    return response.status(200).json(personDetails);
  } catch (error) {
    return response.status(500).json(error);
  }
});

export default routes;
