import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
// import { TTaskStatus } from '../../../src/constants/task.status';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  // @Column({
  //   type: 'enum',
  //   enum: TTaskStatus,
  //   default: TTaskStatus.PENDING,
  // })
  // status: TTaskStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;

  constructor(partial: Partial<Task>) {
    Object.assign(this, partial);
  }
}
