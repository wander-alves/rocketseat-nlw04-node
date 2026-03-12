import { randomUUID } from 'node:crypto';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('customers')
class Customer {
  @PrimaryColumn('uuid')
  protected id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  email: string;

  @CreateDateColumn({
    type: 'datetime',
    name: 'created_at',
  })
  createdAt: Date;

  constructor() {
    this.id = this.id ?? randomUUID();
  }
}

export { Customer };
