import { getRepository } from 'typeorm';
import Person from '../models/Persons';

interface PersonDTO {
  type_person: string;
  name: string;
  email: string;
  status: string;
}

class PersonService {
  public async execute({ type_person, name, email, status }: PersonDTO) {
    const personRepository = getRepository(Person);

    const payload = {
      type_person,
      name,
      email,
      status,
    };
    const create = personRepository.create(payload);
    const resp = await personRepository.save(create);

    return resp;
  }
}

export default PersonService;
