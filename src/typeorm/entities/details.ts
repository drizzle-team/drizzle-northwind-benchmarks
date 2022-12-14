import {
  Column, Entity, JoinColumn, ManyToOne, PrimaryColumn,
} from "typeorm";
import { Order } from "./orders";
import { Product } from "./products";

@Entity({ name: "order_detail" })
export class Detail {
  @Column({ name: "unit_price", type: "decimal", precision: 10, scale: 2, default: 0 })
    unitPrice: number;

  @Column({ name: "quantity", type: "integer" })
    quantity: number;

  @Column({ name: "discount", type: "decimal", precision: 10, scale: 2, default: 0 })
    discount: number;

  @PrimaryColumn({ name: "order_id", type: "integer" })
    orderId: number;
  @ManyToOne(() => Order, (order) => order.details, { onDelete: "CASCADE" })
  @JoinColumn({ name: "order_id" })
    order: Order;

  @PrimaryColumn({ name: "product_id", type: "integer" })
    productId: number;
  @ManyToOne(() => Product, (product) => product.details, { onDelete: "CASCADE" })
  @JoinColumn({ name: "product_id" })
    product: Product;
}
