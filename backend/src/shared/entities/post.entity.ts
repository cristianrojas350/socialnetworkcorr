import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Like } from './like.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  message: string;

  @Column({ default: 0 })
  likesCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, user => user.posts, { eager: true })
  author: User;

  @Column()
  authorId: string;

  @OneToMany(() => Like, like => like.post)
  likes: Like[];
} 