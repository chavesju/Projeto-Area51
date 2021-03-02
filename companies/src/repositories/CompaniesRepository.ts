import { getRepository } from 'typeorm';
import Companie from '../models/Companies';

interface UpdateCompanie {
  id: string;
  person_id: string;
  tax_id: number;
  name: string;
  email: string;
  status: string;
}

class CompaniesRepository {
  findUpdate(uuid: any) {
    throw new Error('Method not implemented.');
  }
  static findByAndUpdate(uuid: any) {
    throw new Error('Method not implemented.');
  }
  public async list() {
    const companieRepository = getRepository(Companie);

    const listCompanies = await companieRepository.find();

    return listCompanies;
  }

  public async view(id: string): Promise<Companie | undefined | boolean> {
    const companieRepository = getRepository(Companie);

    const list = await companieRepository.findOne(id);

    if (list === null) {
      return false;
    }

    return list;
  }
  public async update({
    id,
    tax_id,
    person_id,
    name,
    email,
    status,
  }: UpdateCompanie) {
    const companieRepository = getRepository(Companie);
    const payload = {
      id,
      tax_id,
      person_id,
      name,
      email,
      status,
    };
    const companie = await companieRepository.findOne({
      where: { id },
    });
    if (!Companie) {
      return false;
    }
    return companieRepository.save({
      ...companie, // existing fields
      ...payload, // updated fields
    });
  }

  public async delete(id: string) {
    const companieRepository = getRepository(Companie);

    await companieRepository.delete(id);

    return {
      message: 'Compania removido com sucesso.',
    };
  }
}

export default CompaniesRepository;
