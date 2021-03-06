import { Color, Gender } from "../../../common/constants";
import { Column, Entity } from "typeorm";
import { BaseEntity } from "../../base.entity";

@Entity({ name: 'shoes' })
export class Shoes extends BaseEntity {
    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    brand: string;

    @Column()
    size: number;

    @Column({ type: 'enum', enum: Color })
    color: Color;

    @Column({ type: 'enum', enum: Gender })
    gender: Gender;
}