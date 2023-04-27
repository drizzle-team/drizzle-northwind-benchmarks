# Sample benchmarks output

`b3:p` - better-sqlite driver using prepared statements

`drizzle:p` - drizzle orm using prepared statements

```
Machine specs:

ram: 16gb
cpu: Apple M1
runtime: node v18.13.0 (x64-darwin)
```

---

```
benchmark      time (avg)             (min … max)       p75       p99      p995
------------------------------------------------- -----------------------------
• select * from customer
------------------------------------------------- -----------------------------
b3         281.72 µs/iter   (267.96 µs … 2.28 ms) 276.79 µs 362.79 µs 607.63 µs
b3:p       258.49 µs/iter (251.54 µs … 781.29 µs)    259 µs 276.58 µs 288.33 µs
drizzle    267.87 µs/iter   (234.25 µs … 2.68 ms) 246.96 µs   1.09 ms   1.19 ms
drizzle:p  208.88 µs/iter (198.38 µs … 778.71 µs) 208.63 µs  249.5 µs 567.38 µs
knex        342.5 µs/iter      (295.17 µs … 4 ms) 315.96 µs   1.44 ms   2.43 ms
kysely     317.43 µs/iter   (281.71 µs … 1.66 ms) 309.75 µs   1.11 ms   1.51 ms
mikro        2.11 ms/iter    (1.32 ms … 11.46 ms)   1.95 ms    9.3 ms   9.75 ms
typeorm      1.27 ms/iter     (1.03 ms … 5.51 ms)    1.1 ms   4.19 ms   4.81 ms
prisma       1.49 ms/iter     (1.42 ms … 3.57 ms)   1.46 ms   3.01 ms   3.16 ms

summary for select * from customer
  drizzle:p
   1.24x faster than b3:p
   1.28x faster than drizzle
   1.35x faster than b3
   1.52x faster than kysely
   1.64x faster than knex
   6.08x faster than typeorm
   7.11x faster than prisma
   10.1x faster than mikro

• select * from customer where id = ?
------------------------------------------------- -----------------------------
b3           2.77 ms/iter     (2.67 ms … 3.04 ms)   2.79 ms   2.99 ms   3.04 ms
b3:p         1.04 ms/iter     (1.01 ms … 1.69 ms)   1.05 ms   1.16 ms   1.27 ms
drizzle      4.88 ms/iter     (4.23 ms … 7.86 ms)   4.49 ms   7.81 ms   7.86 ms
drizzle:p  997.37 µs/iter   (970.67 µs … 2.02 ms) 990.25 µs   1.34 ms   1.37 ms
knex         6.19 ms/iter    (4.05 ms … 17.39 ms)   8.22 ms  17.39 ms  17.39 ms
kysely       4.31 ms/iter    (3.38 ms … 11.45 ms)   3.93 ms  11.11 ms  11.45 ms
mikro       38.22 ms/iter  (16.41 ms … 128.86 ms)  42.72 ms 128.86 ms 128.86 ms
typeorm     17.03 ms/iter   (11.86 ms … 48.85 ms)  18.52 ms  48.85 ms  48.85 ms
prisma      22.37 ms/iter   (18.27 ms … 65.35 ms)  21.97 ms  65.35 ms  65.35 ms

summary for select * from customer where id = ?
  drizzle:p
   1.05x faster than b3:p
   2.77x faster than b3
   4.32x faster than kysely
   4.89x faster than drizzle
   6.2x faster than knex
   17.08x faster than typeorm
   22.43x faster than prisma
   38.32x faster than mikro

• select * from customer where company_name like ?
------------------------------------------------- -----------------------------
b3:p         3.19 ms/iter     (2.99 ms … 5.88 ms)   3.21 ms   5.43 ms   5.88 ms
drizzle:p    2.84 ms/iter     (2.75 ms … 3.66 ms)   2.89 ms   3.34 ms   3.66 ms
knex         5.29 ms/iter      (4.54 ms … 9.8 ms)   5.63 ms   8.83 ms    9.8 ms
kysely       4.57 ms/iter     (4.09 ms … 7.71 ms)   4.32 ms   7.25 ms   7.71 ms
mikro       20.45 ms/iter    (13.3 ms … 45.28 ms)  23.04 ms  45.28 ms  45.28 ms
typeorm     15.98 ms/iter   (11.31 ms … 43.03 ms)  16.64 ms  43.03 ms  43.03 ms
prisma      20.42 ms/iter   (19.03 ms … 23.85 ms)  21.31 ms  23.85 ms  23.85 ms

summary for select * from customer where company_name like ?
  drizzle:p
   1.12x faster than b3:p
   1.61x faster than kysely
   1.86x faster than knex
   5.63x faster than typeorm
   7.19x faster than prisma
   7.2x faster than mikro

• "SELECT * FROM employee"
------------------------------------------------- -----------------------------
b3          78.73 µs/iter    (70.13 µs … 9.14 ms)  75.13 µs  92.71 µs 123.42 µs
b3:p        49.05 µs/iter    (45.83 µs … 6.12 ms)  48.71 µs  53.79 µs     56 µs
drizzle      91.6 µs/iter    (75.96 µs … 2.36 ms)  83.13 µs 126.33 µs   1.17 ms
drizzle:p   87.93 µs/iter     (75.71 µs … 5.3 ms)  81.17 µs 117.42 µs    192 µs
knex         92.1 µs/iter    (81.29 µs … 3.87 ms)  85.75 µs 104.54 µs 176.29 µs
kysely      83.26 µs/iter    (73.83 µs … 5.92 ms)  76.75 µs  88.42 µs 126.67 µs
mikro      546.92 µs/iter  (329.63 µs … 16.74 ms) 410.88 µs   3.67 ms   4.28 ms
typeorm    275.94 µs/iter   (228.04 µs … 2.19 ms) 262.25 µs 990.92 µs   1.33 ms
prisma     387.31 µs/iter   (353.83 µs … 1.39 ms) 384.67 µs 880.58 µs   1.01 ms

summary for "SELECT * FROM employee"
  b3:p
   1.61x faster than b3
   1.7x faster than kysely
   1.79x faster than drizzle:p
   1.87x faster than drizzle
   1.88x faster than knex
   5.63x faster than typeorm
   7.9x faster than prisma
   11.15x faster than mikro

• select * from employee where id = ? left join reportee
------------------------------------------------- -----------------------------
b3            794 µs/iter  (643.08 µs … 43.15 ms) 711.33 µs 998.54 µs   1.11 ms
b3:p        171.1 µs/iter   (153.5 µs … 15.91 ms) 166.83 µs 202.38 µs    264 µs
drizzle      1.71 ms/iter      (1.32 ms … 5.7 ms)   1.46 ms   4.74 ms   5.17 ms
drizzle:p  203.73 µs/iter   (184.71 µs … 1.72 ms) 204.17 µs 279.58 µs 606.17 µs
knex         2.76 ms/iter   (1.07 ms … 145.01 ms)   1.85 ms  15.89 ms   24.1 ms
kysely       2.74 ms/iter    (1.22 ms … 45.63 ms)   2.96 ms   13.6 ms  45.63 ms
mikro        7.22 ms/iter       (2.76 ms … 49 ms)   7.87 ms     49 ms     49 ms
typeorm     10.28 ms/iter    (3.85 ms … 72.57 ms)  10.48 ms  72.57 ms  72.57 ms
prisma       4.54 ms/iter    (3.44 ms … 25.41 ms)   4.09 ms  17.83 ms  25.41 ms

summary for select * from employee where id = ? left join reportee
  b3:p
   1.19x faster than drizzle:p
   4.64x faster than b3
   10.02x faster than drizzle
   15.99x faster than kysely
   16.11x faster than knex
   26.54x faster than prisma
   42.22x faster than mikro
   60.09x faster than typeorm

• SELECT * FROM supplier
------------------------------------------------- -----------------------------
b3         119.03 µs/iter   (111.33 µs … 4.37 ms) 115.54 µs 133.08 µs 155.71 µs
b3:p       158.13 µs/iter  (104.79 µs … 23.06 ms) 116.29 µs 602.29 µs    978 µs
drizzle    162.13 µs/iter   (101.88 µs … 13.4 ms) 118.29 µs   1.39 ms   1.96 ms
drizzle:p  106.31 µs/iter    (98.08 µs … 1.49 ms) 102.21 µs 128.92 µs 175.21 µs
knex       136.85 µs/iter   (125.21 µs … 5.03 ms) 132.17 µs 179.21 µs  273.5 µs
kysely     122.76 µs/iter    (113.5 µs … 3.36 ms) 118.13 µs 135.33 µs 161.92 µs
mikro      723.15 µs/iter  (514.08 µs … 16.43 ms) 564.08 µs    3.7 ms   5.46 ms
typeorm    439.33 µs/iter   (385.58 µs … 4.29 ms) 413.17 µs   1.16 ms   1.45 ms
prisma     637.28 µs/iter   (538.75 µs … 4.98 ms) 626.63 µs   1.89 ms   2.31 ms

summary for SELECT * FROM supplier
  drizzle:p
   1.12x faster than b3
   1.15x faster than kysely
   1.29x faster than knex
   1.49x faster than b3:p
   1.53x faster than drizzle
   4.13x faster than typeorm
   5.99x faster than prisma
   6.8x faster than mikro

• select * from supplier where id = ?
------------------------------------------------- -----------------------------
b3         954.29 µs/iter  (829.38 µs … 26.26 ms) 910.79 µs   1.45 ms   1.72 ms
b3:p       406.89 µs/iter   (310.67 µs … 49.6 ms) 337.96 µs   1.05 ms   1.27 ms
drizzle      1.51 ms/iter     (1.28 ms … 4.31 ms)   1.35 ms   3.94 ms   4.04 ms
drizzle:p  308.28 µs/iter   (300.17 µs … 1.07 ms)    309 µs 328.75 µs 415.71 µs
knex         1.62 ms/iter     (1.34 ms … 7.97 ms)   1.45 ms   5.29 ms   5.57 ms
kysely       1.27 ms/iter     (1.06 ms … 9.49 ms)   1.14 ms   9.32 ms   9.41 ms
mikro        7.43 ms/iter    (4.68 ms … 36.39 ms)    8.2 ms  36.39 ms  36.39 ms
typeorm      4.21 ms/iter     (3.21 ms … 9.51 ms)   4.29 ms   7.47 ms   9.51 ms
prisma       6.79 ms/iter     (5.69 ms … 32.9 ms)   6.51 ms   32.9 ms   32.9 ms

summary for select * from supplier where id = ?
  drizzle:p
   1.32x faster than b3:p
   3.1x faster than b3
   4.13x faster than kysely
   4.9x faster than drizzle
   5.26x faster than knex
   13.64x faster than typeorm
   22.03x faster than prisma
   24.1x faster than mikro

• SELECT * FROM product
------------------------------------------------- -----------------------------
b3         202.31 µs/iter   (195.71 µs … 3.34 ms) 199.46 µs 210.63 µs 213.67 µs
b3:p       201.24 µs/iter (196.96 µs … 678.96 µs) 201.08 µs  210.5 µs  212.5 µs
drizzle    172.76 µs/iter   (161.04 µs … 1.28 ms) 167.42 µs 205.58 µs  952.5 µs
drizzle:p   135.9 µs/iter (131.08 µs … 555.17 µs) 134.04 µs 148.92 µs 476.67 µs
knex       214.49 µs/iter   (205.13 µs … 2.07 ms) 212.21 µs 232.71 µs 254.79 µs
kysely     205.24 µs/iter   (195.96 µs … 2.61 ms) 203.29 µs 217.96 µs 237.38 µs
mikro        2.26 ms/iter    (1.49 ms … 18.36 ms)   1.82 ms   7.61 ms  16.28 ms
typeorm    819.54 µs/iter   (760.58 µs … 1.76 ms) 799.96 µs   1.37 ms   1.52 ms
prisma       1.24 ms/iter     (1.19 ms … 2.69 ms)   1.22 ms   2.17 ms    2.4 ms

summary for SELECT * FROM product
  drizzle:p
   1.27x faster than drizzle
   1.48x faster than b3:p
   1.49x faster than b3
   1.51x faster than kysely
   1.58x faster than knex
   6.03x faster than typeorm
   9.09x faster than prisma
   16.66x faster than mikro

• SELECT * FROM product LEFT JOIN supplier WHERE product.id = ?
------------------------------------------------- -----------------------------
b3           3.91 ms/iter      (3.68 ms … 4.4 ms)   3.98 ms   4.27 ms    4.4 ms
b3:p       582.85 µs/iter (562.17 µs … 737.63 µs) 589.96 µs 648.63 µs 668.33 µs
drizzle      7.73 ms/iter    (6.73 ms … 11.41 ms)    8.5 ms  11.41 ms  11.41 ms
drizzle:p  592.66 µs/iter   (571.38 µs … 1.33 ms) 594.96 µs 667.67 µs 700.29 µs
knex         6.39 ms/iter    (5.32 ms … 11.41 ms)   6.96 ms  11.41 ms  11.41 ms
kysely       6.54 ms/iter     (5.64 ms … 14.6 ms)   5.98 ms   14.6 ms   14.6 ms
mikro        13.4 ms/iter   (10.55 ms … 22.24 ms)  16.06 ms  22.24 ms  22.24 ms
typeorm      18.4 ms/iter   (13.38 ms … 66.24 ms)   18.9 ms  66.24 ms  66.24 ms
prisma      17.05 ms/iter   (15.36 ms … 53.48 ms)  16.45 ms  53.48 ms  53.48 ms

summary for SELECT * FROM product LEFT JOIN supplier WHERE product.id = ?
  b3:p
   1.02x faster than drizzle:p
   6.71x faster than b3
   10.97x faster than knex
   11.22x faster than kysely
   13.26x faster than drizzle
   22.99x faster than mikro
   29.24x faster than prisma
   31.56x faster than typeorm

• SELECT * FROM product WHERE product.name LIKE ?
------------------------------------------------- -----------------------------
b3           3.41 ms/iter    (3.15 ms … 22.55 ms)   3.33 ms   3.49 ms  22.55 ms
b3:p         2.58 ms/iter    (2.38 ms … 18.65 ms)   2.54 ms   2.97 ms   3.01 ms
drizzle      3.44 ms/iter     (3.11 ms … 6.29 ms)   3.23 ms   6.28 ms   6.29 ms
drizzle:p     2.4 ms/iter     (2.22 ms … 4.12 ms)   2.42 ms   3.66 ms    3.8 ms
knex         4.43 ms/iter        (3.94 ms … 9 ms)   4.41 ms   8.37 ms      9 ms
kysely       3.85 ms/iter    (3.53 ms … 10.96 ms)   3.65 ms  10.82 ms  10.96 ms
mikro       19.66 ms/iter    (12.86 ms … 87.7 ms)  19.51 ms   87.7 ms   87.7 ms
typeorm     14.94 ms/iter   (10.19 ms … 42.67 ms)  16.93 ms  42.67 ms  42.67 ms
prisma      17.71 ms/iter   (16.55 ms … 20.67 ms)   18.6 ms  20.67 ms  20.67 ms

summary for SELECT * FROM product WHERE product.name LIKE ?
  drizzle:p
   1.08x faster than b3:p
   1.42x faster than b3
   1.43x faster than drizzle
   1.61x faster than kysely
   1.85x faster than knex
   6.24x faster than typeorm
   7.39x faster than prisma
   8.2x faster than mikro

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