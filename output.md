# Sample benchmarks output

`b3:p` - better-sqlite3 driver using prepared statements

`drizzle:p` - drizzle orm using prepared statements

## Machine specs

```plain
RAM: 32GB
CPU: AMD Ryzen 9 7900X 12-Core Processor
Runtime: node v16.14.2 (x64-linux)
```

---

```plain
benchmark      time (avg)             (min … max)       p75       p99      p995
------------------------------------------------- -----------------------------
• select * from customer
------------------------------------------------- -----------------------------
b3         175.84 µs/iter   (158.25 µs … 1.87 ms) 172.86 µs 226.94 µs 292.24 µs
b3:p       163.81 µs/iter (152.45 µs … 875.27 µs) 162.14 µs 184.53 µs 214.05 µs
drizzle    161.11 µs/iter   (134.67 µs … 2.27 ms) 152.66 µs 736.49 µs 881.99 µs
drizzle:p  129.47 µs/iter (117.19 µs … 840.73 µs) 125.45 µs 258.74 µs 518.51 µs
knex        212.5 µs/iter   (182.68 µs … 1.66 ms) 209.57 µs 421.85 µs   1.05 ms
kysely     187.39 µs/iter    (165.9 µs … 1.77 ms) 182.72 µs 337.62 µs 745.12 µs
mikro        1.19 ms/iter   (866.38 µs … 3.92 ms)   1.17 ms   3.63 ms   3.66 ms
typeorm    821.28 µs/iter   (652.67 µs … 2.44 ms) 880.12 µs   1.72 ms   1.85 ms
prisma     777.09 µs/iter    (667.21 µs … 1.5 ms) 790.74 µs   1.21 ms    1.4 ms

summary for select * from customer
  drizzle:p
   1.24x faster than drizzle
   1.27x faster than b3:p
   1.36x faster than b3
   1.45x faster than kysely
   1.64x faster than knex
   6x faster than prisma
   6.34x faster than typeorm
   9.19x faster than mikro

• select * from customer where id = ?
------------------------------------------------- -----------------------------
b3           1.17 ms/iter   (773.8 µs … 68.71 ms) 980.62 µs   1.44 ms   1.65 ms
b3:p       352.63 µs/iter   (328.17 µs … 3.86 ms) 351.25 µs 424.83 µs 454.32 µs
drizzle      2.05 ms/iter      (1.67 ms … 4.4 ms)   1.85 ms   3.86 ms   3.96 ms
drizzle:p   338.7 µs/iter   (317.57 µs … 1.49 ms) 336.45 µs 695.22 µs   1.06 ms
knex            2 ms/iter     (1.61 ms … 4.76 ms)    1.8 ms   4.51 ms   4.71 ms
kysely       1.48 ms/iter     (1.18 ms … 6.74 ms)   1.26 ms   6.01 ms    6.6 ms
mikro       18.49 ms/iter   (15.73 ms … 22.77 ms)  19.43 ms  22.77 ms  22.77 ms
typeorm     12.93 ms/iter   (10.65 ms … 18.22 ms)  13.68 ms  18.22 ms  18.22 ms
prisma      14.58 ms/iter    (12.94 ms … 17.9 ms)   15.2 ms   17.9 ms   17.9 ms

summary for select * from customer where id = ?
  drizzle:p
   1.04x faster than b3:p
   3.46x faster than b3
   4.37x faster than kysely
   5.91x faster than knex
   6.06x faster than drizzle
   38.17x faster than typeorm
   43.06x faster than prisma
   54.58x faster than mikro

• select * from customer where company_name like ?
------------------------------------------------- -----------------------------
b3:p         1.36 ms/iter     (1.31 ms … 3.08 ms)   1.34 ms   2.28 ms   2.69 ms
drizzle:p    1.23 ms/iter     (1.17 ms … 2.18 ms)    1.2 ms   2.09 ms    2.1 ms
knex         2.34 ms/iter     (2.03 ms … 5.83 ms)   2.17 ms   5.12 ms   5.45 ms
kysely          2 ms/iter     (1.77 ms … 6.31 ms)   1.85 ms   6.19 ms    6.3 ms
mikro       14.41 ms/iter    (11.57 ms … 19.6 ms)  15.99 ms   19.6 ms   19.6 ms
typeorm      9.53 ms/iter    (8.37 ms … 11.54 ms)   10.1 ms  11.54 ms  11.54 ms
prisma      11.87 ms/iter   (10.82 ms … 13.42 ms)  12.25 ms  13.42 ms  13.42 ms

summary for select * from customer where company_name like ?
  drizzle:p
   1.11x faster than b3:p
   1.63x faster than kysely
   1.91x faster than knex
   7.76x faster than typeorm
   9.67x faster than prisma
   11.73x faster than mikro

• "SELECT * FROM employee"
------------------------------------------------- -----------------------------
b3          37.23 µs/iter    (32.12 µs … 5.82 ms)  33.92 µs  42.59 µs  48.29 µs
b3:p        27.84 µs/iter    (25.66 µs … 1.52 ms)  27.03 µs  34.99 µs  41.45 µs
drizzle     45.52 µs/iter    (36.05 µs … 2.83 ms)  40.26 µs  67.26 µs 135.44 µs
drizzle:p   21.34 µs/iter    (19.09 µs … 1.38 ms)  20.26 µs  30.68 µs  36.13 µs
knex        46.69 µs/iter     (38.75 µs … 3.5 ms)  41.99 µs  59.75 µs  69.25 µs
kysely         41 µs/iter    (34.27 µs … 4.31 ms)   36.8 µs  56.65 µs  62.87 µs
mikro      336.76 µs/iter   (261.28 µs … 2.53 ms) 325.16 µs   1.98 ms   2.14 ms
typeorm    205.88 µs/iter   (163.84 µs … 1.86 ms) 207.03 µs 648.38 µs   1.13 ms
prisma     239.04 µs/iter   (196.81 µs … 2.35 ms) 251.38 µs 423.61 µs 478.82 µs

summary for "SELECT * FROM employee"
  drizzle:p
   1.3x faster than b3:p
   1.74x faster than b3
   1.92x faster than kysely
   2.13x faster than drizzle
   2.19x faster than knex
   9.65x faster than typeorm
   11.2x faster than prisma
   15.78x faster than mikro

• select * from employee where id = ? left join reportee
------------------------------------------------- -----------------------------
b3         312.42 µs/iter  (211.26 µs … 31.35 ms) 237.32 µs 278.53 µs 464.51 µs
b3:p        69.53 µs/iter    (63.33 µs … 1.86 ms)  66.95 µs  83.41 µs  109.8 µs
drizzle    882.74 µs/iter   (679.55 µs … 3.31 ms) 764.24 µs    2.7 ms   2.89 ms
drizzle:p   88.14 µs/iter    (78.73 µs … 1.68 ms)  83.22 µs 135.76 µs 606.87 µs
knex       597.01 µs/iter   (442.96 µs … 4.35 ms) 538.56 µs   3.71 ms   3.93 ms
kysely     609.21 µs/iter   (454.75 µs … 7.89 ms) 528.76 µs    5.9 ms   6.98 ms
mikro        2.35 ms/iter     (1.87 ms … 4.75 ms)   2.44 ms   4.31 ms   4.57 ms
typeorm      4.14 ms/iter     (3.12 ms … 6.62 ms)   4.58 ms   6.35 ms   6.62 ms
prisma       2.31 ms/iter     (1.93 ms … 4.45 ms)    2.4 ms   3.69 ms   3.71 ms

summary for select * from employee where id = ? left join reportee
  b3:p
   1.27x faster than drizzle:p
   4.49x faster than b3
   8.59x faster than knex
   8.76x faster than kysely
   12.7x faster than drizzle
   33.23x faster than prisma
   33.86x faster than mikro
   59.49x faster than typeorm

• SELECT * FROM supplier
------------------------------------------------- -----------------------------
b3          65.64 µs/iter    (57.63 µs … 3.93 ms)  62.19 µs  74.33 µs  82.24 µs
b3:p         56.9 µs/iter     (52.21 µs … 2.7 ms)  55.31 µs  69.05 µs  78.93 µs
drizzle     63.24 µs/iter    (49.94 µs … 2.42 ms)  55.58 µs  84.05 µs 427.01 µs
drizzle:p   62.59 µs/iter    (49.65 µs … 2.36 ms)  54.86 µs  94.19 µs 395.63 µs
knex        77.02 µs/iter    (65.45 µs … 3.32 ms)  71.72 µs  98.05 µs 120.38 µs
kysely      70.28 µs/iter    (60.77 µs … 3.53 ms)  65.88 µs  89.05 µs 115.12 µs
mikro      475.57 µs/iter   (369.27 µs … 3.17 ms) 440.19 µs   2.81 ms   2.94 ms
typeorm    314.23 µs/iter      (249 µs … 2.21 ms) 308.16 µs   1.46 ms   1.57 ms
prisma     313.94 µs/iter   (257.94 µs … 1.67 ms) 327.46 µs 585.19 µs   1.48 ms

summary for SELECT * FROM supplier
  b3:p
   1.1x faster than drizzle:p
   1.11x faster than drizzle
   1.15x faster than b3
   1.24x faster than kysely
   1.35x faster than knex
   5.52x faster than prisma
   5.52x faster than typeorm
   8.36x faster than mikro

• select * from supplier where id = ?
------------------------------------------------- -----------------------------
b3         341.76 µs/iter  (243.66 µs … 62.44 ms) 265.54 µs 317.48 µs 335.32 µs
b3:p       114.69 µs/iter   (107.09 µs … 3.32 ms) 113.66 µs 130.95 µs 141.67 µs
drizzle    685.88 µs/iter   (506.38 µs … 3.96 ms) 550.62 µs   3.54 ms   3.74 ms
drizzle:p  110.32 µs/iter   (97.15 µs … 13.36 ms) 103.59 µs 162.04 µs 200.33 µs
knex       616.04 µs/iter   (485.19 µs … 4.17 ms) 532.04 µs   3.66 ms   3.81 ms
kysely     487.89 µs/iter   (372.65 µs … 6.67 ms) 405.34 µs   5.68 ms   6.31 ms
mikro        5.62 ms/iter     (4.76 ms … 7.63 ms)   5.94 ms   7.63 ms   7.63 ms
typeorm      3.53 ms/iter      (2.97 ms … 5.5 ms)   3.81 ms   4.81 ms    5.5 ms
prisma       4.61 ms/iter        (4 ms … 5.87 ms)   4.77 ms   5.75 ms   5.87 ms

summary for select * from supplier where id = ?
  drizzle:p
   1.04x faster than b3:p
   3.1x faster than b3
   4.42x faster than kysely
   5.58x faster than knex
   6.22x faster than drizzle
   31.98x faster than typeorm
   41.76x faster than prisma
   50.95x faster than mikro

• SELECT * FROM product
------------------------------------------------- -----------------------------
b3         122.95 µs/iter   (113.26 µs … 2.68 ms) 119.41 µs 139.29 µs 165.72 µs
b3:p       112.45 µs/iter    (107.21 µs … 2.7 ms) 110.42 µs 124.98 µs 131.42 µs
drizzle    104.95 µs/iter    (89.34 µs … 1.97 ms)  98.29 µs 301.03 µs 893.18 µs
drizzle:p    83.4 µs/iter  (77.26 µs … 910.34 µs)  80.35 µs  99.66 µs 494.41 µs
knex       134.12 µs/iter   (119.37 µs … 2.99 ms) 129.96 µs 200.77 µs 237.69 µs
kysely     126.47 µs/iter   (115.04 µs … 3.36 ms) 122.89 µs 142.59 µs 160.67 µs
mikro        1.21 ms/iter   (914.2 µs … 14.08 ms)   1.05 ms    3.8 ms   4.43 ms
typeorm    500.31 µs/iter   (435.42 µs … 1.63 ms)  496.6 µs   1.08 ms   1.15 ms
prisma     570.67 µs/iter   (515.54 µs … 1.09 ms) 578.63 µs 893.79 µs   1.02 ms

summary for SELECT * FROM product
  drizzle:p
   1.26x faster than drizzle
   1.35x faster than b3:p
   1.47x faster than b3
   1.52x faster than kysely
   1.61x faster than knex
   6x faster than typeorm
   6.84x faster than prisma
   14.45x faster than mikro

• SELECT * FROM product LEFT JOIN supplier WHERE product.id = ?
------------------------------------------------- -----------------------------
b3           1.32 ms/iter     (1.05 ms … 1.92 ms)   1.46 ms   1.53 ms   1.54 ms
b3:p       193.64 µs/iter (118.26 µs … 211.35 ms) 125.76 µs 212.96 µs  219.2 µs
drizzle      4.01 ms/iter     (3.16 ms … 6.43 ms)   4.71 ms      6 ms   6.43 ms
drizzle:p   139.7 µs/iter   (129.13 µs … 1.65 ms) 139.75 µs 156.73 µs 163.37 µs
knex         3.01 ms/iter      (2.31 ms … 7.7 ms)   2.73 ms   7.14 ms    7.7 ms
kysely       2.81 ms/iter    (2.14 ms … 12.73 ms)   2.31 ms  11.91 ms  12.73 ms
mikro       12.43 ms/iter   (10.82 ms … 14.21 ms)  13.18 ms  14.21 ms  14.21 ms
typeorm     12.57 ms/iter   (10.35 ms … 15.24 ms)   13.1 ms  15.24 ms  15.24 ms
prisma      12.43 ms/iter   (10.44 ms … 16.25 ms)  12.92 ms  16.25 ms  16.25 ms

summary for SELECT * FROM product LEFT JOIN supplier WHERE product.id = ?
  drizzle:p
   1.39x faster than b3:p
   9.42x faster than b3
   20.09x faster than kysely
   21.52x faster than knex
   28.73x faster than drizzle
   88.95x faster than prisma
   88.97x faster than mikro
   90x faster than typeorm

• SELECT * FROM product WHERE product.name LIKE ?
------------------------------------------------- -----------------------------
b3           1.34 ms/iter    (1.19 ms … 26.14 ms)   1.23 ms   1.58 ms  19.78 ms
b3:p         1.07 ms/iter  (971.48 µs … 22.57 ms)   1.02 ms   1.62 ms   1.83 ms
drizzle      1.55 ms/iter     (1.15 ms … 6.23 ms)   1.33 ms    5.9 ms   6.18 ms
drizzle:p   908.6 µs/iter   (863.15 µs … 2.04 ms) 894.45 µs   1.72 ms   1.86 ms
knex         2.05 ms/iter     (1.66 ms … 8.69 ms)   1.83 ms   7.39 ms   7.82 ms
kysely       1.67 ms/iter    (1.39 ms … 10.22 ms)   1.48 ms    7.7 ms   9.97 ms
mikro       13.16 ms/iter   (11.31 ms … 15.57 ms)  13.84 ms  15.57 ms  15.57 ms
typeorm      8.19 ms/iter    (7.25 ms … 10.15 ms)   8.38 ms  10.15 ms  10.15 ms
prisma      11.12 ms/iter    (10.09 ms … 14.2 ms)  11.36 ms   14.2 ms   14.2 ms

summary for SELECT * FROM product WHERE product.name LIKE ?
  drizzle:p
   1.17x faster than b3:p
   1.47x faster than b3
   1.71x faster than drizzle
   1.84x faster than kysely
   2.26x faster than knex
   9.01x faster than typeorm
   12.24x faster than prisma
   14.48x faster than mikro

• select all order with sum and count
------------------------------------------------- -----------------------------
drizzle:p  111.93 ms/iter (110.23 ms … 115.02 ms) 112.17 ms 115.02 ms 115.02 ms
drizzle    112.95 ms/iter (111.21 ms … 115.79 ms) 114.17 ms 115.79 ms 115.79 ms
b3         107.52 ms/iter (106.09 ms … 114.26 ms) 107.62 ms 114.26 ms 114.26 ms
b3:p       107.75 ms/iter (106.91 ms … 109.34 ms) 108.14 ms 109.34 ms 109.34 ms
knex       108.63 ms/iter (107.11 ms … 110.21 ms) 109.04 ms 110.21 ms 110.21 ms
kysely     108.73 ms/iter  (107.57 ms … 111.3 ms) 109.42 ms  111.3 ms  111.3 ms
typeorm       6.55 s/iter       (6.44 s … 6.82 s)    6.63 s    6.82 s    6.82 s
prisma        4.44 s/iter       (4.35 s … 4.58 s)    4.48 s    4.58 s    4.58 s

summary for select all order with sum and count
  b3
   1x faster than b3:p
   1.01x faster than knex
   1.01x faster than kysely
   1.04x faster than drizzle:p
   1.05x faster than drizzle
   41.25x faster than prisma
   60.93x faster than typeorm

• SELECT * FROM order_detail WHERE order_id = ?
------------------------------------------------- -----------------------------
b3          24.38 ms/iter   (21.64 ms … 30.85 ms)     25 ms  30.85 ms  30.85 ms
b3:p        20.02 ms/iter   (18.97 ms … 21.07 ms)  20.29 ms  21.07 ms  21.07 ms
drizzle     26.44 ms/iter    (25.36 ms … 30.3 ms)  26.73 ms   30.3 ms   30.3 ms
drizzle:p   17.47 ms/iter   (16.68 ms … 19.37 ms)  17.88 ms  19.37 ms  19.37 ms
knex        27.32 ms/iter   (25.87 ms … 28.93 ms)  28.14 ms  28.93 ms  28.93 ms
kysely      28.23 ms/iter   (25.24 ms … 31.03 ms)  28.69 ms  31.03 ms  31.03 ms
mikro      116.09 ms/iter (113.54 ms … 117.85 ms) 117.21 ms 117.85 ms 117.85 ms
mikro:2     59.74 ms/iter   (55.68 ms … 71.14 ms)  60.56 ms  71.14 ms  71.14 ms
typeorm     96.83 ms/iter  (86.24 ms … 108.39 ms) 101.31 ms 108.39 ms 108.39 ms
prisma      80.01 ms/iter   (76.81 ms … 90.38 ms)  80.15 ms  90.38 ms  90.38 ms

summary for SELECT * FROM order_detail WHERE order_id = ?
  drizzle:p
   1.15x faster than b3:p
   1.4x faster than b3
   1.51x faster than drizzle
   1.56x faster than knex
   1.62x faster than kysely
   3.42x faster than mikro:2
   4.58x faster than prisma
   5.54x faster than typeorm
   6.64x faster than mikro
```
