import { AfterInsert, AfterRemove, AfterUpdate, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @AfterInsert()
    logInsert() {
        console.log("Inserted User w/ id " + this.id);
    }

    @AfterRemove()
    logRemove() {
        console.log("Removed User w/ id " + this.id);
    }

    @AfterUpdate()
    logUpdate() {
        console.log("Updated User w/ id " + this.id);
    }
}