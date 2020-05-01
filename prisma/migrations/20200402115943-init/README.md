# Migration `20200402115943-init`

This migration has been generated by KennHuang at 4/2/2020, 11:59:43 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE `checkin-covid19`.`CheckinLog` ;

ALTER TABLE `checkin-covid19`.`SterilizeLog` ;

ALTER TABLE `checkin-covid19`.`Token` ;

ALTER TABLE `checkin-covid19`.`CheckinLog` ADD FOREIGN KEY (`userId`) REFERENCES `checkin-covid19`.`User`(`studentNumber`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `checkin-covid19`.`SterilizeLog` ADD FOREIGN KEY (`userId`) REFERENCES `checkin-covid19`.`User`(`studentNumber`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `checkin-covid19`.`SterilizeLog` ADD FOREIGN KEY (`locationId`) REFERENCES `checkin-covid19`.`SterilizeLocation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `checkin-covid19`.`Token` ADD FOREIGN KEY (`iss`) REFERENCES `checkin-covid19`.`AdminAccounts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200402115943-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,56 @@
+datasource mysql {
+  url      = env("DATABASE_URL")
+  provider = "mysql"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model User {
+  studentNumber String         @id
+  cardUUID      String?
+  name          String
+  checkinLogs   CheckinLog[]
+  sterilizeLogs SterilizeLog[]
+}
+
+model CheckinLog {
+  id          Int      @default(autoincrement()) @id
+  user        User     @relation(fields: [userId], references: [studentNumber])
+  userId      String
+  checkinAt   DateTime
+  temperature Float
+}
+
+model AdminAccounts {
+  id           Int     @default(autoincrement()) @id
+  userName     String  @unique
+  passwordHash String
+  salt         String
+  tokens       Token[]
+}
+
+model Token {
+  jti      String        @id
+  issAdmin AdminAccounts @relation(fields: [iss], references: [id])
+  iss      Int
+  iat      DateTime
+  exp      DateTime
+  scopes   String
+}
+
+model SterilizeLog {
+  id         Int               @default(autoincrement()) @id
+  user       User              @relation(fields: [userId], references: [studentNumber])
+  userId     String
+  timestamp  DateTime
+  location   SterilizeLocation @relation(fields: [locationId], references: [id])
+  locationId Int
+}
+
+model SterilizeLocation {
+  id            Int            @default(autoincrement()) @id
+  name          String
+  sterilizeLogs SterilizeLog[]
+}
```

