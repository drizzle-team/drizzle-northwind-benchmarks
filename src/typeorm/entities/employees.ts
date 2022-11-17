import {
  Entity,
  Column,
  OneToMany,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Order } from "./orders";

@Entity({ name: "employee" })
export class Employee {
  @PrimaryColumn({ type: "integer" })
  id: number;

  @Column({ name: "last_name", type: "varchar" })
  lastName: string;

  @Column({ name: "first_name", type: "varchar", nullable: true })
  firstName: string | null;

  @Column({ name: "title", type: "varchar" })
  title: string;

  @Column({ name: "title_of_courtesy", type: "varchar" })
  titleOfCourtesy: string;

  @Column({ name: "birth_date", type: "date" })
  birthDate: Date;

  @Column({ name: "hire_date", type: "date" })
  hireDate: Date;

  @Column({ name: "address", type: "varchar" })
  address: string;

  @Column({ name: "city", type: "varchar" })
  city: string;

  @Column({ name: "postal_code", type: "varchar" })
  postalCode: string;

  @Column({ name: "country", type: "varchar" })
  country: string;

  @Column({ name: "home_phone", type: "varchar" })
  homePhone: string;

  @Column({ name: "extension", type: "varchar" })
  extension: number;

  @Column({ name: "notes", type: "text" })
  notes: string;

  @Column({ name: "reports_to", type: "integer", nullable: true })
  recipientId: number | null;
  
  @ManyToOne(() => Employee, (employee) => employee.recipient)
  @JoinColumn({ name: "reports_to" })
  recipient: Employee;

  @OneToMany(() => Order, (order) => order.employee)
  orders: Order[];
}
