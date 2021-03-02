import { getRepository } from 'typeorm';
import Contacts from '../models/Contacts';

interface ContactsDTO {
  company_id: string;
  phone: number;
  zip_code: number;
  address: string;
  neighborhood: string;
  number: string;
  complement: string;
  state: string;
  city: string;
}

class ContactsService {
  public async execute({
    company_id,
    phone,
    zip_code,
    address,
    neighborhood,
    number,
    complement,
    state,
    city,
  }: ContactsDTO) {
    const contactsRepository = getRepository(Contacts);

    const payload = {
      company_id,
      phone,
      zip_code,
      address,
      neighborhood,
      number,
      complement,
      state,
      city,
    };
    const create = contactsRepository.create(payload);
    const resp = await contactsRepository.save(create);

    return resp;
  }
}

export default ContactsService;
