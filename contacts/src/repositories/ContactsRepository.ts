import { getRepository } from 'typeorm';
import Contacts from '../models/Contacts';

interface UpdateContacts {
  id: string;
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

class ContactsRepository {
  findUpdate(uuid: any) {
    throw new Error('Method not implemented.');
  }
  static findByAndUpdate(uuid: any) {
    throw new Error('Method not implemented.');
  }
  public async list() {
    const contactsRepository = getRepository(Contacts);

    const listContacts = await contactsRepository.find();

    return listContacts;
  }

  public async view(id: string): Promise<Contacts | undefined | boolean> {
    const contactsRepository = getRepository(Contacts);

    const list = await contactsRepository.findOne(id);

    if (list === null) {
      return false;
    }

    return list;
  }
  public async update({
    id,
    company_id,
    phone,
    zip_code,
    address,
    neighborhood,
    number,
    complement,
    state,
    city,
  }: UpdateContacts) {
    const contactsRepository = getRepository(Contacts);
    const payload = {
      id,
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
    const contacts = await contactsRepository.findOne({
      where: { id },
    });
    if (!Contacts) {
      return false;
    }
    return contactsRepository.save({
      ...contacts, // existing fields
      ...payload, // updated fields
    });
  }

  public async delete(id: string) {
    const contactsRepository = getRepository(Contacts);

    await contactsRepository.delete(id);

    return {
      message: 'Contato removido com sucesso.',
    };
  }
}

export default ContactsRepository;
