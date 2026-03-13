import { randomUUID } from 'node:crypto';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('surveys')
class Survey {
  @PrimaryColumn('uuid')
  protected id: string;

  @Column('varchar')
  title: string;

  @Column('varchar')
  description: string;

  @CreateDateColumn({
    type: 'datetime',
    name: 'created_at',
  })
  createdAt: Date;

  constructor() {
    this.id = this.id ?? randomUUID();
  }
}

export { Survey };
