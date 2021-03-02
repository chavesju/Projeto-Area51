import { getRepository } from 'typeorm';
import Person from '../models/Persons';

interface UpdatePerson {
  id: string;
  name: string;
  email: string;
  type_person: string;
  status: string;
}

class PersonsRepository {
  findUpdate(uuid: any) {
    throw new Error('Method not implemented.');
  }
  static findByAndUpdate(uuid: any) {
    throw new Error('Method not implemented.');
  }
  public async list() {
    const personRepository = getRepository(Person);

    const listPersons = await personRepository.find();

    return listPersons;
  }

  public async view(id: string): Promise<Person | undefined | boolean> {
    const personRepository = getRepository(Person);

    const list = await personRepository.findOne(id);

    if (list === null) {
      return false;
    }

    return list;
  }
  public async update({ id, name, email, type_person, status }: UpdatePerson) {
    const personRepository = getRepository(Person);
    const payload = {
      id,
      name,
      email,
      type_person,
      status,
    };
    const person = await personRepository.findOne({
      where: { id },
    });
    if (!person) {
      return false;
    }
    return personRepository.save({
      ...person, // existing fields
      ...payload, // updated fields
    });
  }

  public async delete(id: string) {
    const personRepository = getRepository(Person);

    await personRepository.delete(id);

    return {
      message: 'Cliente removido com sucesso.',
    };
  }
}

export default PersonsRepository;
