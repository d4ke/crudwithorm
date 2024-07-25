import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';
import { log } from 'console';

export class UserController {
  async createUser(req: Request, res: Response): Promise<void> {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk
    })
    req.on('end', async () => {
      const { name, email } = JSON.parse(body);
      const user = new User();
      user.name = name;
      user.email = email;
      await AppDataSource.manager.save(user);
      res.status(201).json(user);
    })
  }

  async getUsers(req: Request, res: Response): Promise<void> {
    const users = await AppDataSource.manager.find(User);
    res.json(users);
  }

  async getUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const user = await AppDataSource.manager.findOne(User, { where: { id: parseInt(id) } });

    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    let body = ''
    req.on('data', (chunk) => {
      body += chunk
    })
    const user1 = new User();
    req.on('end', async () => {
      const { name, email } = JSON.parse(body);
      user1.name = name;
      user1.email = email;
    })

    const user = await AppDataSource.manager.findOne(User, { where: { id: parseInt(id) } });

    if (user) {
      user.name = user1.name;
      user.email = user1.email;
      await AppDataSource.manager.save(user);
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const result = await AppDataSource.manager.delete(User, id);

    if (result.affected) {
      res.status(204).send();
    } else {
      res.status(404).send('User not found');
    }
  }
}
