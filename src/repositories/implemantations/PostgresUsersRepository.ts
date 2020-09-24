import { IUserRepository } from "../IUserRepository";
import { User } from "../../entities/User";

export class PostgresUsersRepository implements IUserRepository {
  private users: User[] = [];

  constructor(){}

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find(user => user.email === email);

    return user;
  }

  async save(user: User): Promise<void> {
    this.users.push(user);
  }
}