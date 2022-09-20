import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Board } from '../entities/board.entitiy';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {}
