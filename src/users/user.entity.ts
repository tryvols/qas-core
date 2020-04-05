import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";
import { hash } from 'bcryptjs';

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @BeforeInsert()
    async encryptPassword() {
        this.password = await hash(this.password, 10);
    }
}