
## How to run

if you want to run this on your machine, you just need:

```
pnpm i
pnpm tsx src/common/benchmark.ts
```


## Sample runs

```
cpu: AMD Ryzen 9 5900X 12-Core Processor
runtime: node v16.18.1 (x64-linux)

benchmark      time (avg)             (min … max)       p75       p99      p995
------------------------------------------------- -----------------------------
• select * from customer
------------------------------------------------- -----------------------------
b3         253.87 µs/iter   (243.63 µs … 2.77 ms) 248.21 µs 402.05 µs 520.94 µs
b3:p        242.2 µs/iter   (235.88 µs … 1.18 ms) 239.09 µs 341.76 µs 379.37 µs
drizzle    207.76 µs/iter    (193.1 µs … 1.01 ms) 203.32 µs 378.86 µs 686.33 µs
drizzle:p  172.78 µs/iter      (167.05 µs … 1 ms) 170.92 µs  204.4 µs 356.89 µs
knex       303.22 µs/iter   (282.06 µs … 1.34 ms)    301 µs 478.92 µs 915.14 µs
kysely      270.4 µs/iter   (257.37 µs … 1.21 ms) 265.37 µs 426.33 µs 773.33 µs
mikro        1.45 ms/iter     (1.17 ms … 4.14 ms)   1.38 ms   3.15 ms   4.02 ms
typeorm    988.41 µs/iter   (869.54 µs … 2.32 ms)   1.02 ms   1.54 ms   1.99 ms
prisma     880.68 µs/iter      (799 µs … 1.92 ms) 837.01 µs   1.37 ms   1.63 ms

summary for select * from customer
  drizzle:p
   1.2x faster than drizzle
   1.4x faster than b3:p
   1.47x faster than b3
   1.57x faster than kysely
   1.75x faster than knex
   5.1x faster than prisma
   5.72x faster than typeorm
   8.39x faster than mikro

• select * from customer where id = ?
------------------------------------------------- -----------------------------
b3           1.58 ms/iter    (1.19 ms … 58.14 ms)   1.42 ms      3 ms  23.95 ms
b3:p       539.89 µs/iter   (526.04 µs … 3.28 ms) 533.52 µs 690.92 µs      1 ms
drizzle      2.81 ms/iter     (2.49 ms … 5.65 ms)   2.65 ms   5.32 ms   5.65 ms
drizzle:p  512.54 µs/iter (501.96 µs … 999.37 µs) 508.13 µs 711.38 µs 856.87 µs
knex         3.59 ms/iter     (3.08 ms … 7.05 ms)   3.62 ms   6.43 ms   7.05 ms
kysely       2.54 ms/iter     (2.09 ms … 7.12 ms)   2.49 ms   6.79 ms   6.84 ms
mikro       18.53 ms/iter   (15.82 ms … 24.94 ms)  19.26 ms  24.94 ms  24.94 ms
typeorm     12.05 ms/iter   (10.22 ms … 15.96 ms)  13.02 ms  15.96 ms  15.96 ms
prisma       21.2 ms/iter   (17.55 ms … 24.45 ms)  22.77 ms  24.45 ms  24.45 ms

summary for select * from customer where id = ?
  drizzle:p
   1.05x faster than b3:p
   3.09x faster than b3
   4.96x faster than kysely
   5.47x faster than drizzle
   7.01x faster than knex
   23.52x faster than typeorm
   36.15x faster than mikro
   41.37x faster than prisma

• select * from customer where company_name like ?
------------------------------------------------- -----------------------------
b3:p         2.05 ms/iter     (1.99 ms … 2.77 ms)   2.05 ms   2.47 ms    2.7 ms
drizzle:p    1.78 ms/iter     (1.71 ms … 2.76 ms)   1.77 ms   2.51 ms   2.58 ms
knex          3.7 ms/iter      (3.47 ms … 5.5 ms)   3.65 ms   5.22 ms    5.5 ms
kysely       3.14 ms/iter     (2.89 ms … 5.83 ms)   3.11 ms   5.42 ms   5.83 ms
mikro       14.04 ms/iter   (12.86 ms … 16.51 ms)  14.57 ms  16.51 ms  16.51 ms
typeorm      10.1 ms/iter    (9.29 ms … 11.54 ms)   10.3 ms  11.54 ms  11.54 ms
prisma      14.78 ms/iter   (13.79 ms … 16.26 ms)  14.95 ms  16.26 ms  16.26 ms

summary for select * from customer where company_name like ?
  drizzle:p
   1.15x faster than b3:p
   1.76x faster than kysely
   2.08x faster than knex
   5.68x faster than typeorm
   7.9x faster than mikro
   8.31x faster than prisma

• "SELECT * FROM employee"
------------------------------------------------- -----------------------------
b3          53.03 µs/iter     (49.06 µs … 4.4 ms)  50.65 µs   79.1 µs  79.99 µs
b3:p        41.01 µs/iter     (39.73 µs … 2.6 ms)  40.56 µs  49.73 µs  55.35 µs
drizzle     60.81 µs/iter    (54.85 µs … 1.48 ms)  59.27 µs  79.05 µs  92.47 µs
drizzle:p   30.59 µs/iter  (29.75 µs … 709.32 µs)   30.3 µs   33.5 µs  39.64 µs
knex        70.54 µs/iter    (65.18 µs … 1.88 ms)  67.81 µs  78.35 µs  89.54 µs
kysely      62.39 µs/iter    (54.44 µs … 4.68 ms)  57.33 µs  93.78 µs 110.58 µs
mikro      425.38 µs/iter     (308.7 µs … 3.7 ms) 428.15 µs   1.82 ms   2.71 ms
typeorm    211.11 µs/iter   (187.67 µs … 1.67 ms) 205.82 µs 482.85 µs 711.75 µs
prisma      267.8 µs/iter    (239.4 µs … 1.49 ms) 261.71 µs 388.93 µs 429.84 µs

summary for "SELECT * FROM employee"
  drizzle:p
   1.34x faster than b3:p
   1.73x faster than b3
   1.99x faster than drizzle
   2.04x faster than kysely
   2.31x faster than knex
   6.9x faster than typeorm
   8.75x faster than prisma
   13.9x faster than mikro

• select * from employee where id = ? left join reportee
------------------------------------------------- -----------------------------
b3         381.92 µs/iter  (312.78 µs … 28.01 ms) 327.22 µs 398.24 µs 463.95 µs
b3:p       104.13 µs/iter   (97.77 µs … 17.96 ms) 100.21 µs 105.86 µs 113.13 µs
drizzle    826.19 µs/iter   (723.09 µs … 3.23 ms) 805.54 µs   2.31 ms   2.38 ms
drizzle:p   105.8 µs/iter   (103.43 µs … 1.61 ms)  104.9 µs 112.55 µs 120.52 µs
knex         1.07 ms/iter  (779.49 µs … 10.19 ms)   1.02 ms   3.92 ms   5.35 ms
kysely     858.13 µs/iter   (708.23 µs … 5.05 ms) 786.71 µs    3.9 ms   4.23 ms
mikro        2.26 ms/iter     (1.76 ms … 3.93 ms)   2.41 ms   3.74 ms   3.87 ms
typeorm      3.73 ms/iter     (3.11 ms … 6.21 ms)   4.02 ms   5.91 ms   6.21 ms
prisma       3.11 ms/iter     (2.84 ms … 4.22 ms)    3.1 ms      4 ms   4.22 ms

summary for select * from employee where id = ? left join reportee
  b3:p
   1.02x faster than drizzle:p
   3.67x faster than b3
   7.93x faster than drizzle
   8.24x faster than kysely
   10.24x faster than knex
   21.71x faster than mikro
   29.83x faster than prisma
   35.82x faster than typeorm

• SELECT * FROM supplier
------------------------------------------------- -----------------------------
b3          94.69 µs/iter    (89.09 µs … 2.36 ms)  90.91 µs 159.24 µs  160.4 µs
b3:p        82.61 µs/iter  (81.47 µs … 678.31 µs)  82.44 µs  85.04 µs  85.82 µs
drizzle     81.59 µs/iter  (77.67 µs … 908.41 µs)  79.66 µs 102.75 µs 138.96 µs
drizzle:p   59.34 µs/iter  (58.18 µs … 367.34 µs)  59.07 µs  61.81 µs  64.19 µs
knex       111.31 µs/iter   (106.15 µs … 1.17 ms) 109.07 µs 134.32 µs 161.77 µs
kysely       99.7 µs/iter    (94.55 µs … 2.11 ms)  97.47 µs 114.51 µs 126.42 µs
mikro      551.67 µs/iter   (471.36 µs … 2.72 ms) 516.18 µs   2.03 ms   2.28 ms
typeorm    330.25 µs/iter    (309.4 µs … 1.38 ms) 321.45 µs 600.12 µs 857.49 µs
prisma     349.09 µs/iter (320.72 µs … 697.65 µs) 348.15 µs  420.1 µs 437.67 µs

summary for SELECT * FROM supplier
  drizzle:p
   1.37x faster than drizzle
   1.39x faster than b3:p
   1.6x faster than b3
   1.68x faster than kysely
   1.88x faster than knex
   5.57x faster than typeorm
   5.88x faster than prisma
   9.3x faster than mikro

• select * from supplier where id = ?
------------------------------------------------- -----------------------------
b3         450.88 µs/iter  (364.99 µs … 54.03 ms)  394.5 µs 438.19 µs 464.99 µs
b3:p       169.43 µs/iter      (160 µs … 1.57 ms) 162.92 µs 278.99 µs 290.54 µs
drizzle    824.16 µs/iter   (747.95 µs … 4.13 ms) 781.59 µs   2.62 ms   2.77 ms
drizzle:p   158.2 µs/iter   (154.99 µs … 1.28 ms) 156.49 µs 167.39 µs 211.54 µs
knex         1.16 ms/iter     (1.03 ms … 3.26 ms)    1.1 ms   2.84 ms   3.06 ms
kysely      709.6 µs/iter    (633.4 µs … 4.45 ms) 656.45 µs   4.08 ms   4.22 ms
mikro         5.5 ms/iter     (4.96 ms … 7.47 ms)    5.8 ms   6.95 ms   7.47 ms
typeorm      2.99 ms/iter     (2.79 ms … 4.29 ms)   3.04 ms   3.76 ms   4.29 ms
prisma       5.91 ms/iter     (5.52 ms … 7.19 ms)   5.86 ms   7.19 ms   7.19 ms

summary for select * from supplier where id = ?
  drizzle:p
   1.07x faster than b3:p
   2.85x faster than b3
   4.49x faster than kysely
   5.21x faster than drizzle
   7.34x faster than knex
   18.91x faster than typeorm
   34.78x faster than mikro
   37.38x faster than prisma

• SELECT * FROM product
------------------------------------------------- -----------------------------
b3          176.1 µs/iter   (171.53 µs … 2.16 ms) 174.46 µs 183.98 µs 202.75 µs
b3:p       166.45 µs/iter   (163.95 µs … 1.67 ms) 165.41 µs 169.88 µs  192.1 µs
drizzle    139.52 µs/iter   (133.03 µs … 1.25 ms) 135.52 µs 267.39 µs 276.94 µs
drizzle:p  124.66 µs/iter (110.67 µs … 913.93 µs) 116.31 µs 247.44 µs 251.13 µs
knex       194.76 µs/iter    (189.28 µs … 1.3 ms) 192.52 µs 209.57 µs  238.9 µs
kysely     183.72 µs/iter   (178.29 µs … 1.81 ms) 181.24 µs 189.11 µs 195.57 µs
mikro        1.48 ms/iter      (1.3 ms … 3.46 ms)   1.38 ms   3.21 ms   3.32 ms
typeorm    644.96 µs/iter   (607.18 µs … 1.58 ms) 629.07 µs   1.17 ms   1.27 ms
prisma     621.12 µs/iter   (566.32 µs … 1.19 ms) 617.07 µs 751.58 µs 803.93 µs

summary for SELECT * FROM product
  drizzle:p
   1.12x faster than drizzle
   1.34x faster than b3:p
   1.41x faster than b3
   1.47x faster than kysely
   1.56x faster than knex
   4.98x faster than prisma
   5.17x faster than typeorm
   11.9x faster than mikro

• SELECT * FROM product LEFT JOIN supplier WHERE product.id = ?
------------------------------------------------- -----------------------------
b3           1.67 ms/iter     (1.44 ms … 2.37 ms)   1.87 ms   2.01 ms   2.02 ms
b3:p       279.83 µs/iter  (205.4 µs … 153.26 ms) 208.03 µs 220.35 µs 234.14 µs
drizzle      3.58 ms/iter     (3.28 ms … 5.49 ms)   3.46 ms   5.24 ms   5.49 ms
drizzle:p  235.03 µs/iter    (230.9 µs … 1.35 ms) 233.65 µs 243.84 µs 303.74 µs
knex         4.86 ms/iter     (4.29 ms … 7.34 ms)   5.05 ms   7.19 ms   7.34 ms
kysely       3.79 ms/iter      (3.4 ms … 8.26 ms)   3.53 ms   7.71 ms   8.26 ms
mikro       11.72 ms/iter   (10.74 ms … 13.93 ms)  12.08 ms  13.93 ms  13.93 ms
typeorm     10.79 ms/iter    (9.84 ms … 12.34 ms)  11.27 ms  12.34 ms  12.34 ms
prisma      17.92 ms/iter   (15.67 ms … 19.35 ms)  18.48 ms  19.35 ms  19.35 ms

summary for SELECT * FROM product LEFT JOIN supplier WHERE product.id = ?
  drizzle:p
   1.19x faster than b3:p
   7.12x faster than b3
   15.21x faster than drizzle
   16.11x faster than kysely
   20.67x faster than knex
   45.92x faster than typeorm
   49.85x faster than mikro
   76.23x faster than prisma

• SELECT * FROM product WHERE product.name LIKE ?
------------------------------------------------- -----------------------------
b3           1.97 ms/iter    (1.82 ms … 23.15 ms)   1.86 ms   2.16 ms  12.57 ms
b3:p          1.5 ms/iter     (1.46 ms … 5.86 ms)   1.48 ms   1.65 ms   2.47 ms
drizzle       1.9 ms/iter     (1.76 ms … 4.48 ms)   1.81 ms    4.4 ms   4.46 ms
drizzle:p    1.33 ms/iter     (1.29 ms … 4.62 ms)   1.32 ms   2.18 ms   2.39 ms
knex         3.15 ms/iter     (2.97 ms … 5.49 ms)   3.05 ms   5.25 ms   5.49 ms
kysely       2.51 ms/iter     (2.36 ms … 6.66 ms)   2.41 ms   6.18 ms   6.25 ms
mikro       13.67 ms/iter   (12.69 ms … 15.12 ms)  14.27 ms  15.12 ms  15.12 ms
typeorm      8.38 ms/iter     (7.71 ms … 9.84 ms)   8.67 ms   9.84 ms   9.84 ms
prisma      14.47 ms/iter   (13.67 ms … 15.18 ms)  14.46 ms  15.18 ms  15.18 ms

summary for SELECT * FROM product WHERE product.name LIKE ?
  drizzle:p
   1.12x faster than b3:p
   1.42x faster than drizzle
   1.48x faster than b3
   1.89x faster than kysely
   2.36x faster than knex
   6.29x faster than typeorm
   10.27x faster than mikro
   10.87x faster than prisma

• select all order with sum and count
------------------------------------------------- -----------------------------
b3         135.36 ms/iter (132.14 ms … 146.24 ms) 136.87 ms 146.24 ms 146.24 ms
b3:p       133.72 ms/iter (131.62 ms … 136.58 ms) 135.51 ms 136.58 ms 136.58 ms
drizzle    154.99 ms/iter (152.08 ms … 160.94 ms) 156.68 ms 160.94 ms 160.94 ms
drizzle:p   155.2 ms/iter  (152.68 ms … 157.9 ms) 157.32 ms  157.9 ms  157.9 ms
knex       134.18 ms/iter (131.29 ms … 138.22 ms) 135.37 ms 138.22 ms 138.22 ms
kysely     135.64 ms/iter  (134.1 ms … 136.98 ms) 136.75 ms 136.98 ms 136.98 ms
typeorm       7.81 s/iter       (7.61 s … 8.43 s)     7.9 s    8.43 s    8.43 s
prisma        3.74 s/iter       (3.67 s … 3.83 s)    3.77 s    3.83 s    3.83 s

summary for select all order with sum and count
  b3:p
   1x faster than knex
   1.01x faster than b3
   1.01x faster than kysely
   1.16x faster than drizzle
   1.16x faster than drizzle:p
   27.93x faster than prisma
   58.38x faster than typeorm

• SELECT * FROM order_detail WHERE order_id = ?
------------------------------------------------- -----------------------------
b3          31.15 ms/iter    (28.8 ms … 40.32 ms)  30.85 ms  40.32 ms  40.32 ms
b3:p        25.97 ms/iter   (25.27 ms … 29.34 ms)  26.05 ms  29.34 ms  29.34 ms
drizzle     31.68 ms/iter   (28.27 ms … 46.73 ms)  31.31 ms  46.73 ms  46.73 ms
drizzle:p   22.47 ms/iter    (21.71 ms … 25.7 ms)  22.58 ms   25.7 ms   25.7 ms
knex        34.01 ms/iter   (33.53 ms … 35.04 ms)  34.06 ms  35.04 ms  35.04 ms
kysely      34.67 ms/iter   (33.38 ms … 35.53 ms)  34.89 ms  35.53 ms  35.53 ms
mikro      129.41 ms/iter  (124.6 ms … 135.78 ms) 130.88 ms 135.78 ms 135.78 ms
mikro:2     63.65 ms/iter    (61.55 ms … 66.7 ms)  64.46 ms   66.7 ms   66.7 ms
typeorm    105.37 ms/iter (103.93 ms … 107.96 ms) 106.49 ms 107.96 ms 107.96 ms
prisma      90.68 ms/iter  (87.74 ms … 108.28 ms)  89.67 ms 108.28 ms 108.28 ms

summary for SELECT * FROM order_detail WHERE order_id = ?
  drizzle:p
   1.16x faster than b3:p
   1.39x faster than b3
   1.41x faster than drizzle
   1.51x faster than knex
   1.54x faster than kysely
   2.83x faster than mikro:2
   4.04x faster than prisma
   4.69x faster than typeorm
   5.76x faster than mikro
```
