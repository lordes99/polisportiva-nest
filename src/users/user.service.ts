import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { Address } from '../address/address.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async createUser(user: User): Promise<User> {
    const newAddress = await this.addressRepository.save(user.address);
    // newAddress.then((a) => {
    //   console.log('ok');
    //   user.address = a;
    // });
    user.address = newAddress;
    // const newUser: User = this.userRepository.create(createUserDto);
    // const newUser = new User();
    // // newUser.name = user.name;
    // newUser.email = user.email;

    return this.usersRepository.save(user);
  }
}
