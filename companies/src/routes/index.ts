import { Router } from 'express';

import CompanieRepository from '../repositories/CompaniesRepository';
import CompanyServices from '../services/CreateCompaniesService';

const routes = Router();

routes.get('/', async (request, response) => {
  try {
    const companieRepository = new CompanieRepository();
    const listCompanie = await companieRepository.list();

    if (listCompanie.length === 0) {
      return response.status(200).json({
        message: 'Não existe Compania cadastrado',
      });
    }

    return response.status(200).json(listCompanie);
  } catch (error) {
    return response.status(500).json(error);
  }
});

routes.post('/register', async (request, response) => {
  try {
    const companyService = new CompanyServices();

    const { person_id, tax_id, name, email, status } = request.body;

    const registerCompany = await companyService.execute({
      person_id,
      name,
      tax_id,
      email,
      status,
    });

    return response.status(201).json(registerCompany);
  } catch (error) {
    return response.status(500).json(error);
  }
});

routes.get('/details/:uuid', async (request, response) => {
  try {
    const { uuid } = request.params;
    const companieRepository = new CompanieRepository();
    const companieDetails = await companieRepository.view(uuid);

    console.log(companieDetails);

    if (companieDetails === undefined) {
      return response.status(200).json({
        message: 'Nenhum cliente encontrado com este ID',
      });
    }

    return response.status(200).json(companieDetails);
  } catch (error) {
    console.log(error);
    return response.status(500).json(error);
  }
});
routes.put('/update/:uuid', async (request, response) => {
  try {
    const { uuid } = request.params;
    const { person_id, tax_id, name, email, status } = request.body;
    const companieRepository = new CompanieRepository();

    const companieUpdate = await companieRepository.update({
      id: uuid,
      person_id,
      tax_id,
      name,
      email,
      status,
    });

    if (companieUpdate === false) {
      return response.status(400).json({
        message: 'ID não encontrado',
      });
    }

    return response.status(200).json(companieUpdate);
  } catch (error) {
    console.log(error);
    return response.status(500).json(error);
  }
});
routes.delete('/remove/:uuid', async (request, response) => {
  try {
    const { uuid } = request.params;
    const companieRepository = new CompanieRepository();
    const companieDetails = await companieRepository.delete(uuid);

    return response.status(200).json(companieDetails);
  } catch (error) {
    return response.status(500).json(error);
  }
});

export default routes;
