import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entitiy';

@EntityRepository(User)
export class UserRepository extends Repository<User> {}
