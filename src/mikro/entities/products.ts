import { Cascade, Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Supplier } from "./suppliers";
import { Detail } from "./details";

@Entity({ tableName: "product" })
export class Product {
  @PrimaryKey()
    id: number;

  @Property({ fieldName: "name" })
    name: string;

  @Property({ fieldName: "quantity_per_unit" })
    qtPerUnit: string;

  @Property({ fieldName: "unit_price", columnType: "decimal", precision: 10, scale: 2, default: 0 })
    unitPrice: number;

  @Property({ fieldName: "units_in_stock" })
    unitsInStock: number;

  @Property({ fieldName: "units_on_order" })
    unitsOnOrder: number;

  @Property({ fieldName: "reorder_level" })
    reorderLevel: number;

  @Property({ fieldName: "discontinued" })
    discontinued: number;

  @Property({ fieldName: "supplier_id" })
    supplierId: number;
  @ManyToOne(() => Supplier)
    supplier: Supplier;

  @OneToMany(() => Detail, (detail) => detail.product, { cascade: [Cascade.ALL] })
    details = new Collection<Detail>(this);
}
