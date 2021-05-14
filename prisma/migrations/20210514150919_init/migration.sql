-- CreateTable
CREATE TABLE `User` (
    `studentNumber` VARCHAR(191) NOT NULL,
    `cardUUID` VARCHAR(191),
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`studentNumber`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CheckinLog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `checkinAt` DATETIME(3) NOT NULL,
    `temperature` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AdminAccounts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userName` VARCHAR(191) NOT NULL,
    `passwordHash` VARCHAR(191) NOT NULL,
    `salt` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `AdminAccounts.userName_unique`(`userName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Token` (
    `jti` VARCHAR(191) NOT NULL,
    `iss` INTEGER NOT NULL,
    `iat` DATETIME(3) NOT NULL,
    `exp` DATETIME(3) NOT NULL,
    `scopes` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`jti`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SterilizeLog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `timestamp` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SterilizeLocation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_SterilizeLocationToSterilizeLog` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_SterilizeLocationToSterilizeLog_AB_unique`(`A`, `B`),
    INDEX `_SterilizeLocationToSterilizeLog_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CheckinLog` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`studentNumber`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Token` ADD FOREIGN KEY (`iss`) REFERENCES `AdminAccounts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SterilizeLog` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`studentNumber`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SterilizeLocationToSterilizeLog` ADD FOREIGN KEY (`A`) REFERENCES `SterilizeLocation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SterilizeLocationToSterilizeLog` ADD FOREIGN KEY (`B`) REFERENCES `SterilizeLog`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
