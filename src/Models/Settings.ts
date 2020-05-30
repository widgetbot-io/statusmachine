import {Entity, Column, BaseEntity, PrimaryColumn} from "typeorm";

@Entity()
export class Settings extends BaseEntity {
	@PrimaryColumn({ unique: true })
	snowflake!: string;

	@Column({ nullable: true })
	role?: string;

	@Column()
	oauthKey!: string;

	@Column()
	pageId!: number;

}
