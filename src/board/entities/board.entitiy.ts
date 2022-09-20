import { User } from 'src/user/entities/user.entitiy';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Board {
  @PrimaryGeneratedColumn({ name: 'bo_id' })
  id: number;

  @Column({ name: 'bo_title', length: 100 })
  title: string;

  @Column({ name: 'bo_content', length: '15000' })
  content: string;

  @Column({ name: 'bo_photo', length: 500, nullable: true })
  photo: string;

  @Column({ name: 'bo_hashtag', length: 200, nullable: true })
  hashtag: string;

  @Column({ name: 'bo_craetedAt' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.boards)
  @JoinColumn({ name: 'bo_createdBy' })
  createdBy: User;
}
