import { getRepository } from 'typeorm';
import Notes from '../models/Notes';

interface UpdateNotes {
  id: string;
  company_id: string;
  number: string;
  path: string;
  url: string;
  date_due: string;
  amount: number;
}

class NotesRepository {
  findUpdate(uuid: any) {
    throw new Error('Method not implemented.');
  }
  static findByAndUpdate(uuid: any) {
    throw new Error('Method not implemented.');
  }
  public async list() {
    const notesRepository = getRepository(Notes);

    const listNotes = await notesRepository.find();

    return listNotes;
  }

  public async view(id: string): Promise<Notes | undefined | boolean> {
    const notesRepository = getRepository(Notes);

    const list = await notesRepository.findOne(id);

    if (list === null) {
      return false;
    }

    return list;
  }
  public async update({
    id,
    company_id,
    number,
    path,
    url,
    date_due,
    amount,
  }: UpdateNotes) {
    const notesRepository = getRepository(Notes);
    const payload = {
      id,
      company_id,
      number,
      path,
      url,
      date_due,
      amount,
    };
    const notes = await notesRepository.findOne({
      where: { id },
    });
    if (!Notes) {
      return false;
    }
    return notesRepository.save({
      ...notes, // existing fields
      ...payload, // updated fields
    });
  }

  public async delete(id: string) {
    const notesRepository = getRepository(Notes);

    await notesRepository.delete(id);

    return {
      message: 'Contato removido com sucesso.',
    };
  }
}

export default NotesRepository;
