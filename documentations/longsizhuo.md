# 后端部分

1. 我加入了Prisma ORM，使用了SQLite数据库来存储数据。运行的时候 **不要登陆**。
    ```SHELL
    npx prisma@latest init --db
    ```
2. 舔加`.env`
   ```
   DATABASE_URL="mysql://你的名字:123@longsizhuo.com:3306/walka_basic"
   ```
3. 要将数据模型映射到数据库模式，您需要使用prisma migrateCLI 命令：
   ```SHELL
   npx prisma migrate dev 
   ```
   此命令做了两件事：
    它为此迁移生成了一个新的 SQL 迁移文件
    它针对数据库运行了 SQL 迁移文件
    您可以在新创建的目录中检查生成的 SQL 迁移文件`prisma/migrations`。