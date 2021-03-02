import { getRepository } from 'typeorm';
import Notes from '../models/Notes';

interface NotesDTO {
  company_id: string;
  number: string;
  path: string;
  url: string;
  date_due: string;
  amount: number;
}

class NotesService {
  public async execute({
    company_id,
    number,
    path,
    url,
    date_due,
    amount,
  }: NotesDTO) {
    const notesRepository = getRepository(Notes);

    const payload = {
      company_id,
      number,
      path,
      url,
      date_due,
      amount,
    };
    const create = notesRepository.create(payload);
    const resp = await notesRepository.save(create);

    return resp;
  }
}

export default NotesService;
