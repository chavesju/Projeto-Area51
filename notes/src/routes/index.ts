import { Router } from 'express';

import NotesRepository from '../repositories/NotesRepository';
import NotesServices from '../services/CreateNotesServices';

const routes = Router();

routes.get('/', async (request, response) => {
  try {
    const notesRepository = new NotesRepository();
    const listNotes = await notesRepository.list();

    if (listNotes.length === 0) {
      return response.status(200).json({
        message: 'Não existe Compania cadastrado',
      });
    }

    return response.status(200).json(listNotes);
  } catch (error) {
    return response.status(500).json(error);
  }
});

routes.post('/register', async (request, response) => {
  try {
    const notesService = new NotesServices();

    const { company_id, number, path, url, date_due, amount } = request.body;

    const registerNotes = await notesService.execute({
      company_id,
      number,
      path,
      url,
      date_due,
      amount,
    });

    return response.status(201).json(registerNotes);
  } catch (error) {
    return response.status(500).json(error);
  }
});

routes.get('/details/:uuid', async (request, response) => {
  try {
    const { uuid } = request.params;
    const notesRepository = new NotesRepository();
    const notesDetails = await notesRepository.view(uuid);

    console.log(notesDetails);

    if (notesDetails === undefined) {
      return response.status(200).json({
        message: 'Nenhum contato encontrado com este ID',
      });
    }

    return response.status(200).json(notesDetails);
  } catch (error) {
    console.log(error);
    return response.status(500).json(error);
  }
});
routes.put('/update/:uuid', async (request, response) => {
  try {
    const { uuid } = request.params;
    const { company_id, number, path, url, date_due, amount } = request.body;
    const notesRepository = new NotesRepository();

    const notesUpdate = await notesRepository.update({
      id: uuid,
      company_id,
      number,
      path,
      url,
      date_due,
      amount,
    });

    if (notesUpdate === false) {
      return response.status(400).json({
        message: 'ID não encontrado',
      });
    }

    return response.status(200).json(notesUpdate);
  } catch (error) {
    console.log(error);
    return response.status(500).json(error);
  }
});
routes.delete('/remove/:uuid', async (request, response) => {
  try {
    const { uuid } = request.params;
    const notesRepository = new NotesRepository();
    const notesDetails = await notesRepository.delete(uuid);

    return response.status(200).json(notesDetails);
  } catch (error) {
    return response.status(500).json(error);
  }
});

export default routes;
