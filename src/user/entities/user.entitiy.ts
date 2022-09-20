import { Board } from 'src/board/entities/board.entitiy';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn({ name: 'us_id', length: 50 })
  id: string;

  @Column({ name: 'us_email', length: 100, nullable: false })
  email: string;

  @Column({ name: 'us_password', length: 100, nullable: false })
  password: string;

  @Column({ name: 'us_profile_photo', length: 255, nullable: true })
  profilePhoto: string;

  @Column({ name: 'us_introduction', length: 10000, nullable: true })
  introduction: string;

  @Column({ name: 'us_interest', length: 255, nullable: true })
  interest: string;

  @OneToMany(() => Board, (board) => board.createdAt)
  boards: Board[];
}
