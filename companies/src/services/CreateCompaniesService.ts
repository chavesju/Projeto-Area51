import { getRepository } from 'typeorm';
import Company from '../models/Companies';

interface CompanieDTO {
  person_id: string;
  tax_id: number;
  name: string;
  email: string;
  status: string;
}

class CompanieService {
  public async execute({
    person_id,
    tax_id,
    name,
    email,
    status,
  }: CompanieDTO) {
    const companieRepository = getRepository(Company);

    const payload = {
      person_id,
      tax_id,
      name,
      email,
      status,
    };
    const create = companieRepository.create(payload);
    const resp = await companieRepository.save(create);

    return resp;
  }
}

export default CompanieService;
