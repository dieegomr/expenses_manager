import { User } from '../domain/entities/user/user.entity';
import { UserRepositoryInterface } from '../domain/repositories/user.repository';

export class UserInMemoryRepository implements UserRepositoryInterface {
  public items: User[] = [];

  async save(user: User): Promise<void> {
    this.items.push(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.props.email === email);

    if (!user) return null;

    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((item) => item.id === id);

    if (!user) return null;

    return user;
  }
}
