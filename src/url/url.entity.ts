import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('urls')
@Index(['longUrl', 'shortUrl'])
export class UrlEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  longUrl: string;

  @Column()
  shortUrl: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;
}
