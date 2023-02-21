import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { users } from '../data/users.data';

@Injectable()
export class UsersService {
  private counterId = 1;
  private users = users;
  async create(createUserDto: CreateUserDto) {
    this.counterId = this.counterId + 1;

    const newUser = {
      id: this.counterId,
      ...createUserDto,
    };
    this.users.push(newUser);
    console.log(newUser);
    return newUser;
  }

  async findAll() {
    return this.users;
  }

  async findOne(id: number) {
    const user = this.users.find((item) => item.id === id);
    if (!user)
      throw new HttpException(`user #${id} NOT FOUND`, HttpStatus.BAD_REQUEST);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    const index = this.users.findIndex((item) => item.id === id);
    this.users[index] = {
      ...user,
      ...updateUserDto,
    };
    return this.users[index];
  }

  remove(id: number) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) throw new NotFoundException(`User #${id} Not Foud`);
    this.users.splice(index, 1);
    return true;
  }
}
