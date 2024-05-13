-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "passwords" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "passwords_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "text" TEXT,
    "create_time" TIMESTAMP(6) DEFAULT timezone('utc'::text, now()),

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spheres_users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "spheres_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spheres_spheres" (
    "id" SERIAL NOT NULL,
    "spheres_usersId" INTEGER NOT NULL,

    CONSTRAINT "spheres_spheres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spheres_posts" (
    "id" SERIAL NOT NULL,
    "create_time" TIMESTAMP(6) DEFAULT timezone('utc'::text, now()),
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "sphere_id" INTEGER NOT NULL,
    "spheres_usersId" INTEGER NOT NULL,

    CONSTRAINT "spheres_posts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "passwords" ADD CONSTRAINT "passwords_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spheres_spheres" ADD CONSTRAINT "spheres_spheres_spheres_usersId_fkey" FOREIGN KEY ("spheres_usersId") REFERENCES "spheres_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spheres_posts" ADD CONSTRAINT "spheres_posts_sphere_id_fkey" FOREIGN KEY ("sphere_id") REFERENCES "spheres_spheres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spheres_posts" ADD CONSTRAINT "spheres_posts_spheres_usersId_fkey" FOREIGN KEY ("spheres_usersId") REFERENCES "spheres_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
