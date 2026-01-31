var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/app.ts
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import morgan from "morgan";
import express6 from "express";

// ../../module-23-requirement-analysis-erd-project-setup/generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// ../../module-23-requirement-analysis-erd-project-setup/generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.2.0",
  "engineVersion": "0c8ef2ce45c83248ab3df073180d5eda9e8be7a3",
  "activeProvider": "postgresql",
  "inlineSchema": 'model User {\n  id            String    @id\n  name          String\n  email         String\n  emailVerified Boolean   @default(false)\n  image         String?\n  createdAt     DateTime  @default(now())\n  updatedAt     DateTime  @updatedAt\n  sessions      Session[]\n  accounts      Account[]\n\n  role   String? @default("USER")\n  phone  String?\n  status String? @default("ACTIVE")\n\n  @@unique([email])\n  @@map("user")\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([token])\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n\nenum COMMENTSTATUS {\n  APPROVED\n  REJECT\n}\n\nmodel Comment {\n  id      String @id @default(uuid())\n  content String @db.Text\n\n  authorId String\n  postId   String\n  post     Post   @relation(fields: [postId], references: [id], onDelete: Cascade)\n\n  parentId String?\n  parent   Comment?  @relation("CommentReplies", fields: [parentId], references: [id], onDelete: Cascade)\n  replies  Comment[] @relation("CommentReplies")\n\n  status COMMENTSTATUS @default(APPROVED)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @default(now()) @updatedAt\n\n  @@index([postId])\n  @@index([authorId])\n  @@map("comments")\n}\n\nmodel Post {\n  id         String     @id @default(cuid())\n  title      String     @db.VarChar(225)\n  content    String     @db.Text\n  thumbnail  String?\n  isFeatured Boolean    @default(false)\n  status     POSTSTATUS @default(PUBLISHED)\n  tags       String[]\n  views      Int        @default(0)\n\n  authorId String\n\n  comments Comment[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @default(now()) @updatedAt\n\n  @@index([authorId, status])\n  @@map("posts")\n}\n\nenum POSTSTATUS {\n  DRAFT\n  PUBLISHED\n  ARCHIVED\n}\n\n// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"role","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"status","kind":"scalar","type":"String"}],"dbName":"user"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"},"Comment":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"content","kind":"scalar","type":"String"},{"name":"authorId","kind":"scalar","type":"String"},{"name":"postId","kind":"scalar","type":"String"},{"name":"post","kind":"object","type":"Post","relationName":"CommentToPost"},{"name":"parentId","kind":"scalar","type":"String"},{"name":"parent","kind":"object","type":"Comment","relationName":"CommentReplies"},{"name":"replies","kind":"object","type":"Comment","relationName":"CommentReplies"},{"name":"status","kind":"enum","type":"COMMENTSTATUS"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"comments"},"Post":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"content","kind":"scalar","type":"String"},{"name":"thumbnail","kind":"scalar","type":"String"},{"name":"isFeatured","kind":"scalar","type":"Boolean"},{"name":"status","kind":"enum","type":"POSTSTATUS"},{"name":"tags","kind":"scalar","type":"String"},{"name":"views","kind":"scalar","type":"Int"},{"name":"authorId","kind":"scalar","type":"String"},{"name":"comments","kind":"object","type":"Comment","relationName":"CommentToPost"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"posts"}},"enums":{},"types":{}}');
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  }
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// ../../module-23-requirement-analysis-erd-project-setup/generated/prisma/internal/prismaNamespace.ts
var prismaNamespace_exports = {};
__export(prismaNamespace_exports, {
  AccountScalarFieldEnum: () => AccountScalarFieldEnum,
  AnyNull: () => AnyNull2,
  CommentScalarFieldEnum: () => CommentScalarFieldEnum,
  DbNull: () => DbNull2,
  Decimal: () => Decimal2,
  JsonNull: () => JsonNull2,
  ModelName: () => ModelName,
  NullTypes: () => NullTypes2,
  NullsOrder: () => NullsOrder,
  PostScalarFieldEnum: () => PostScalarFieldEnum,
  PrismaClientInitializationError: () => PrismaClientInitializationError2,
  PrismaClientKnownRequestError: () => PrismaClientKnownRequestError2,
  PrismaClientRustPanicError: () => PrismaClientRustPanicError2,
  PrismaClientUnknownRequestError: () => PrismaClientUnknownRequestError2,
  PrismaClientValidationError: () => PrismaClientValidationError2,
  QueryMode: () => QueryMode,
  SessionScalarFieldEnum: () => SessionScalarFieldEnum,
  SortOrder: () => SortOrder,
  Sql: () => Sql2,
  TransactionIsolationLevel: () => TransactionIsolationLevel,
  UserScalarFieldEnum: () => UserScalarFieldEnum,
  VerificationScalarFieldEnum: () => VerificationScalarFieldEnum,
  defineExtension: () => defineExtension,
  empty: () => empty2,
  getExtensionContext: () => getExtensionContext,
  join: () => join2,
  prismaVersion: () => prismaVersion,
  raw: () => raw2,
  sql: () => sql
});
import * as runtime2 from "@prisma/client/runtime/client";
var PrismaClientKnownRequestError2 = runtime2.PrismaClientKnownRequestError;
var PrismaClientUnknownRequestError2 = runtime2.PrismaClientUnknownRequestError;
var PrismaClientRustPanicError2 = runtime2.PrismaClientRustPanicError;
var PrismaClientInitializationError2 = runtime2.PrismaClientInitializationError;
var PrismaClientValidationError2 = runtime2.PrismaClientValidationError;
var sql = runtime2.sqltag;
var empty2 = runtime2.empty;
var join2 = runtime2.join;
var raw2 = runtime2.raw;
var Sql2 = runtime2.Sql;
var Decimal2 = runtime2.Decimal;
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var prismaVersion = {
  client: "7.2.0",
  engine: "0c8ef2ce45c83248ab3df073180d5eda9e8be7a3"
};
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var DbNull2 = runtime2.DbNull;
var JsonNull2 = runtime2.JsonNull;
var AnyNull2 = runtime2.AnyNull;
var ModelName = {
  User: "User",
  Session: "Session",
  Account: "Account",
  Verification: "Verification",
  Comment: "Comment",
  Post: "Post"
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var UserScalarFieldEnum = {
  id: "id",
  name: "name",
  email: "email",
  emailVerified: "emailVerified",
  image: "image",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  role: "role",
  phone: "phone",
  status: "status"
};
var SessionScalarFieldEnum = {
  id: "id",
  expiresAt: "expiresAt",
  token: "token",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  ipAddress: "ipAddress",
  userAgent: "userAgent",
  userId: "userId"
};
var AccountScalarFieldEnum = {
  id: "id",
  accountId: "accountId",
  providerId: "providerId",
  userId: "userId",
  accessToken: "accessToken",
  refreshToken: "refreshToken",
  idToken: "idToken",
  accessTokenExpiresAt: "accessTokenExpiresAt",
  refreshTokenExpiresAt: "refreshTokenExpiresAt",
  scope: "scope",
  password: "password",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var VerificationScalarFieldEnum = {
  id: "id",
  identifier: "identifier",
  value: "value",
  expiresAt: "expiresAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var CommentScalarFieldEnum = {
  id: "id",
  content: "content",
  authorId: "authorId",
  postId: "postId",
  parentId: "parentId",
  status: "status",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var PostScalarFieldEnum = {
  id: "id",
  title: "title",
  content: "content",
  thumbnail: "thumbnail",
  isFeatured: "isFeatured",
  status: "status",
  tags: "tags",
  views: "views",
  authorId: "authorId",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var SortOrder = {
  asc: "asc",
  desc: "desc"
};
var QueryMode = {
  default: "default",
  insensitive: "insensitive"
};
var NullsOrder = {
  first: "first",
  last: "last"
};
var defineExtension = runtime2.Extensions.defineExtension;

// ../../module-23-requirement-analysis-erd-project-setup/generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/middleware/globalErrorHandler.ts
function errorHandler(err, req, res, next) {
  let statusCode = 500;
  let errorMessage = "Internal Server Error";
  let errorDetails = err;
  console.error("DEBUG ERROR:", errorDetails);
  if (err instanceof prismaNamespace_exports.PrismaClientValidationError) {
    statusCode = 400;
    errorMessage = "Invalid data or missing required fields";
  } else if (err instanceof prismaNamespace_exports.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2000":
        statusCode = 400;
        errorMessage = "Input value is too long for a field";
        break;
      case "P2002":
        statusCode = 409;
        errorMessage = "Duplicate value. This record already exists";
        break;
      case "P2003":
        statusCode = 400;
        errorMessage = "Related record not found (foreign key error)";
        break;
      case "P2025":
        statusCode = 404;
        errorMessage = "Record not found";
        break;
      default:
        statusCode = 400;
        errorMessage = "Database request error";
    }
  } else if (err instanceof prismaNamespace_exports.PrismaClientInitializationError) {
    statusCode = 500;
    errorMessage = "Database connection failed";
  } else if (err instanceof prismaNamespace_exports.PrismaClientRustPanicError) {
    statusCode = 500;
    errorMessage = "Database crashed unexpectedly";
  } else if (err instanceof prismaNamespace_exports.PrismaClientUnknownRequestError) {
    statusCode = 500;
    errorMessage = "Database request error";
  } else if (err instanceof prismaNamespace_exports.PrismaClientRustPanicError) {
    statusCode = 500;
    errorMessage = "Database crashed unexpectedly";
  } else if (err instanceof prismaNamespace_exports.PrismaClientInitializationError) {
    if (err.errorCode === "P1000") {
      statusCode = 401;
      errorMessage = "Database connection failed. Please check your credentials";
    } else if (err.errorCode === "P1001") {
      statusCode = 400;
      errorMessage = "Can't connect to the database. Please try again";
    }
  } else if (err instanceof Error) {
    statusCode = 400;
    errorMessage = err.message;
  }
  res.status(statusCode).json({
    success: false,
    message: errorMessage,
    details: errorDetails
  });
}
var globalErrorHandler_default = errorHandler;

// src/middleware/notFound.ts
function notFound(req, res) {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl,
    date: Date()
  });
}

// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

// generated/prisma/client.ts
import * as path2 from "path";
import { fileURLToPath as fileURLToPath2 } from "url";

// generated/prisma/internal/class.ts
import * as runtime3 from "@prisma/client/runtime/client";
var config2 = {
  "previewFeatures": [],
  "clientVersion": "7.3.0",
  "engineVersion": "9d6ad21cbbceab97458517b147a6a09ff43aa735",
  "activeProvider": "postgresql",
  "inlineSchema": 'model User {\n  id            String    @id\n  name          String\n  email         String\n  emailVerified Boolean   @default(false)\n  image         String?\n  createdAt     DateTime  @default(now())\n  updatedAt     DateTime  @updatedAt\n  sessions      Session[]\n  accounts      Account[]\n\n  role   String? @default("USER")\n  phone  String?\n  status String? @default("ACTIVE")\n\n  bio                 String?\n  businessName        String?\n  businessAddress     String?\n  sellerRequestStatus String? @default("NONE") // NONE, PENDING, APPROVED, REJECTED\n\n  @@unique([email])\n  @@map("user")\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([token])\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n\nenum ORDERSTATUS {\n  PLACED\n  PROCESSING\n  SHIPPED\n  DELIVERED\n  CANCELLED\n}\n\nenum USERSTATUS {\n  ACTIVE\n  BANNED\n}\n\nmodel Category {\n  id        String     @id @default(cuid())\n  name      String     @unique\n  slug      String     @unique\n  medicines Medicine[]\n  createdAt DateTime   @default(now())\n  updatedAt DateTime   @updatedAt\n\n  @@map("categories")\n}\n\nmodel Medicine {\n  id           String  @id @default(cuid())\n  name         String\n  description  String  @db.Text\n  manufacturer String\n  price        Float\n  stock        Int     @default(0)\n  imageUrl     String?\n\n  categoryId String\n  category   Category @relation(fields: [categoryId], references: [id])\n\n  sellerId String\n\n  orderItems OrderItem[]\n  reviews    Review[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([sellerId])\n  @@index([categoryId])\n  @@map("medicines")\n}\n\nmodel Order {\n  id          String @id @default(cuid())\n  orderNumber String @unique\n\n  customerId String\n\n  shippingAddress String      @db.Text\n  totalAmount     Float\n  status          ORDERSTATUS @default(PLACED)\n\n  items OrderItem[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([customerId])\n  @@map("orders")\n}\n\nmodel OrderItem {\n  id String @id @default(cuid())\n\n  orderId String\n  order   Order  @relation(fields: [orderId], references: [id], onDelete: Cascade)\n\n  medicineId String\n  medicine   Medicine @relation(fields: [medicineId], references: [id])\n\n  quantity Int\n  price    Float\n\n  createdAt DateTime @default(now())\n\n  @@index([orderId])\n  @@index([medicineId])\n  @@map("order_items")\n}\n\nmodel Review {\n  id      String  @id @default(cuid())\n  rating  Int // 1-5\n  comment String? @db.Text\n\n  customerId String\n\n  medicineId String\n  medicine   Medicine @relation(fields: [medicineId], references: [id], onDelete: Cascade)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([customerId])\n  @@index([medicineId])\n  @@map("reviews")\n}\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
};
config2.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"role","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"status","kind":"scalar","type":"String"},{"name":"bio","kind":"scalar","type":"String"},{"name":"businessName","kind":"scalar","type":"String"},{"name":"businessAddress","kind":"scalar","type":"String"},{"name":"sellerRequestStatus","kind":"scalar","type":"String"}],"dbName":"user"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"slug","kind":"scalar","type":"String"},{"name":"medicines","kind":"object","type":"Medicine","relationName":"CategoryToMedicine"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"categories"},"Medicine":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"manufacturer","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Float"},{"name":"stock","kind":"scalar","type":"Int"},{"name":"imageUrl","kind":"scalar","type":"String"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToMedicine"},{"name":"sellerId","kind":"scalar","type":"String"},{"name":"orderItems","kind":"object","type":"OrderItem","relationName":"MedicineToOrderItem"},{"name":"reviews","kind":"object","type":"Review","relationName":"MedicineToReview"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"medicines"},"Order":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"orderNumber","kind":"scalar","type":"String"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"shippingAddress","kind":"scalar","type":"String"},{"name":"totalAmount","kind":"scalar","type":"Float"},{"name":"status","kind":"enum","type":"ORDERSTATUS"},{"name":"items","kind":"object","type":"OrderItem","relationName":"OrderToOrderItem"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"orders"},"OrderItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"order","kind":"object","type":"Order","relationName":"OrderToOrderItem"},{"name":"medicineId","kind":"scalar","type":"String"},{"name":"medicine","kind":"object","type":"Medicine","relationName":"MedicineToOrderItem"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"price","kind":"scalar","type":"Float"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":"order_items"},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"medicineId","kind":"scalar","type":"String"},{"name":"medicine","kind":"object","type":"Medicine","relationName":"MedicineToReview"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"reviews"}},"enums":{},"types":{}}');
async function decodeBase64AsWasm2(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config2.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm2(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass2() {
  return runtime3.getPrismaClient(config2);
}

// generated/prisma/internal/prismaNamespace.ts
import * as runtime4 from "@prisma/client/runtime/client";
var getExtensionContext2 = runtime4.Extensions.getExtensionContext;
var NullTypes4 = {
  DbNull: runtime4.NullTypes.DbNull,
  JsonNull: runtime4.NullTypes.JsonNull,
  AnyNull: runtime4.NullTypes.AnyNull
};
var TransactionIsolationLevel2 = runtime4.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var defineExtension2 = runtime4.Extensions.defineExtension;

// generated/prisma/enums.ts
var ORDERSTATUS = {
  PLACED: "PLACED",
  PROCESSING: "PROCESSING",
  SHIPPED: "SHIPPED",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED"
};

// generated/prisma/client.ts
globalThis["__dirname"] = path2.dirname(fileURLToPath2(import.meta.url));
var PrismaClient2 = getPrismaClientClass2();

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient2({ adapter });

// src/lib/auth.ts
import nodemailer from "nodemailer";
var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  // Use true for port 465, false for port 587
  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASSWORD
  }
});
var auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
    // or "mysql", "postgresql",
  }),
  baseURL: `${process.env.BETTER_AUTH_URL}/api/v1/auth`,
  trustedOrigins: [process.env.APP_URL],
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "CUSTOMER",
        required: false
      },
      phone: {
        type: "string",
        defaultValue: null,
        required: false
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
        required: false
      }
    }
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      try {
        const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`;
        const html = `

  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2>Verify your email address</h2>

    <p>Hi ${user.name ?? "there"},</p>

    <p>
      Thanks for signing up for <strong>Prisma MediStore</strong>.
      Please confirm your email address by clicking the button below.
    </p>

    <p style="margin: 24px 0;">
      <a
        href="${verificationUrl}"
        style="
          background-color: #4f46e5;
          color: #ffffff;
          padding: 12px 20px;
          text-decoration: none;
          border-radius: 6px;
          display: inline-block;
        "
      >
        Verify Email
      </a>
    </p>

    <p>
      If the button doesn\u2019t work, copy and paste this link into your browser:
    </p>

    <p style="word-break: break-all;">
      ${verificationUrl}
    </p>

    <p>
      This link will expire soon for security reasons.
      If you didn\u2019t create an account, you can safely ignore this email.
    </p>

    <br />

    <p>
      \u2014 Prisma MediStore Team
    </p>
  </div>
`;
        const text = `
Verify your email address

Hi ${user.name ?? "there"},

Thanks for signing up for Prisma MediStore.
Please verify your email by visiting the link below:

${verificationUrl}

This link will expire soon.
If you didn\u2019t create an account, ignore this email.

\u2014 Prisma MediStore Team
`;
        const info = await transporter.sendMail({
          from: '"Prisma Medistore" <admin@medistore.com>',
          to: user.email,
          subject: "Verify your email address",
          text,
          html
        });
        console.log("Message sent:", info.messageId);
      } catch (error) {
        console.error(error);
        throw new Error("Failed to send verification email");
      }
    }
  },
  socialProviders: {
    google: {
      prompt: "select_account consent",
      accessType: "offline",
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }
  }
});

// src/modules/category/category.route.ts
import express from "express";

// src/helpers/paginationSortingHelper.ts
var paginationSortingHelper = (options) => {
  const page = Number(options.page) || 1;
  const limit = Number(options.limit) || 10;
  const skip = (page - 1) * limit;
  const sortBy = options.sortBy || "createdAt";
  const sortOrder = options.sortOrder || "desc";
  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder
  };
};
var paginationSortingHelper_default = paginationSortingHelper;

// src/modules/category/category.service.ts
var createCategory = async (data) => {
  const result = await prisma.category.create({
    data: {
      name: data.name,
      slug: data.slug.toLowerCase()
    }
  });
  return result;
};
var getAllCategories = async (options) => {
  const { page, limit, skip, sortBy, sortOrder } = paginationSortingHelper_default(options);
  const [data, total] = await Promise.all([
    prisma.category.findMany({
      take: limit,
      skip,
      orderBy: { [sortBy]: sortOrder }
    }),
    prisma.category.count()
  ]);
  return {
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
};
var getCategoryById = async (id) => {
  return await prisma.category.findUnique({
    where: { id }
  });
};
var getCategoryBySlug = async (slug) => {
  return await prisma.category.findUnique({
    where: { slug }
  });
};
var updateCategory = async (id, data) => {
  await prisma.category.findUniqueOrThrow({
    where: { id }
  });
  const updateData = {};
  if (data.name) updateData.name = data.name;
  if (data.slug) updateData.slug = data.slug.toLowerCase();
  return await prisma.category.update({
    where: { id },
    data: updateData
  });
};
var deleteCategory = async (id) => {
  const medicineCount = await prisma.medicine.count({
    where: { categoryId: id }
  });
  if (medicineCount > 0) {
    throw new Error(
      `Cannot delete category. It has ${medicineCount} medicines associated with it.`
    );
  }
  return await prisma.category.delete({
    where: { id }
  });
};
var CategoryService = {
  createCategory,
  getAllCategories,
  getCategoryById,
  getCategoryBySlug,
  updateCategory,
  deleteCategory
};

// src/modules/category/category.controller.ts
var createCategory2 = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await CategoryService.createCategory(data);
    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var getAllCategories2 = async (req, res, next) => {
  try {
    const result = await CategoryService.getAllCategories(req.query);
    res.status(200).json({
      success: true,
      message: "Categories retrieved successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var getCategoryById2 = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await CategoryService.getCategoryById(id);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }
    res.status(200).json({
      success: true,
      message: "Category retrieved successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var updateCategory2 = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await CategoryService.updateCategory(id, data);
    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var deleteCategory2 = async (req, res, next) => {
  try {
    const { id } = req.params;
    await CategoryService.deleteCategory(id);
    res.status(200).json({
      success: true,
      message: "Category deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};
var CategoryController = {
  createCategory: createCategory2,
  getAllCategories: getAllCategories2,
  getCategoryById: getCategoryById2,
  updateCategory: updateCategory2,
  deleteCategory: deleteCategory2
};

// src/middleware/auth.ts
var CheckRole = (...roles) => {
  return async (req, res, next) => {
    try {
      const session = await auth.api.getSession({
        headers: req.headers
      });
      if (!session) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized Access!"
        });
      }
      if (!session.user.emailVerified) {
        return res.status(403).json({
          success: false,
          message: "Email is not verified! Please verify your email."
        });
      }
      req.user = {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role,
        status: session.user.status,
        emailVerified: session.user.emailVerified,
        phone: session.user.phone
      };
      if (roles.length && !roles.includes(req?.user?.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden Access! You are not authorized"
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
var auth_default = CheckRole;

// src/modules/category/category.route.ts
var router = express.Router();
router.get("/", CategoryController.getAllCategories);
router.get("/:id", CategoryController.getCategoryById);
router.post("/", auth_default("ADMIN" /* ADMIN */), CategoryController.createCategory);
router.patch(
  "/:id",
  auth_default("ADMIN" /* ADMIN */),
  CategoryController.updateCategory
);
router.delete(
  "/:id",
  auth_default("ADMIN" /* ADMIN */),
  CategoryController.deleteCategory
);
var categoryRouter = router;

// src/modules/medicine/medicine.route.ts
import express2 from "express";

// src/modules/medicine/medicine.service.ts
var createMedicine = async (data, sellerId) => {
  await prisma.category.findUniqueOrThrow({
    where: { id: data.categoryId }
  });
  const result = await prisma.medicine.create({
    data: {
      ...data,
      sellerId
    },
    include: {
      category: true
    }
  });
  return result;
};
var getAllMedicines = async (query) => {
  const {
    search,
    categoryId,
    minPrice,
    maxPrice,
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    sortOrder = "desc"
  } = query;
  const { skip } = paginationSortingHelper_default({ page, limit });
  const where = {};
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
      { manufacturer: { contains: search, mode: "insensitive" } }
    ];
  }
  if (categoryId) {
    where.categoryId = categoryId;
  }
  if (minPrice !== void 0 || maxPrice !== void 0) {
    where.price = {};
    if (minPrice !== void 0) {
      where.price.gte = Number(minPrice);
    }
    if (maxPrice !== void 0) {
      where.price.lte = Number(maxPrice);
    }
  }
  const [data, total] = await Promise.all([
    prisma.medicine.findMany({
      where,
      take: Number(limit),
      skip,
      orderBy: { [sortBy]: sortOrder },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        }
      }
    }),
    prisma.medicine.count({ where })
  ]);
  return {
    data,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit))
    }
  };
};
var getMedicineById = async (id) => {
  return await prisma.medicine.findUnique({
    where: { id },
    include: {
      category: true,
      reviews: {
        orderBy: { createdAt: "desc" },
        take: 10
      }
    }
  });
};
var getMedicinesBySeller = async (sellerId) => {
  return await prisma.medicine.findMany({
    where: { sellerId },
    include: {
      category: true
    },
    orderBy: { createdAt: "desc" }
  });
};
var updateMedicine = async (id, data, userId, userRole) => {
  const medicine = await prisma.medicine.findUniqueOrThrow({
    where: { id },
    select: { id: true, sellerId: true }
  });
  if (userRole !== "ADMIN" /* ADMIN */ && medicine.sellerId !== userId) {
    throw new Error("Unauthorized: You can only update your own medicines");
  }
  if (data.categoryId) {
    await prisma.category.findUniqueOrThrow({
      where: { id: data.categoryId }
    });
  }
  return await prisma.medicine.update({
    where: { id },
    data,
    include: {
      category: true
    }
  });
};
var deleteMedicine = async (id, userId, userRole) => {
  const medicine = await prisma.medicine.findUniqueOrThrow({
    where: { id },
    select: { id: true, sellerId: true }
  });
  if (userRole !== "ADMIN" /* ADMIN */ && medicine.sellerId !== userId) {
    throw new Error("Unauthorized: You can only delete your own medicines");
  }
  await prisma.medicine.delete({
    where: { id }
  });
};
var updateStock = async (medicineId, quantity, sellerId, isAdmin) => {
  const medicine = await prisma.medicine.findUniqueOrThrow({
    where: { id: medicineId },
    select: { id: true, sellerId: true, stock: true }
  });
  if (!isAdmin && medicine.sellerId !== sellerId) {
    throw new Error(
      "Unauthorized: You can only update your own medicine stock"
    );
  }
  return await prisma.medicine.update({
    where: { id: medicineId },
    data: {
      stock: {
        // no negetive stock eg: -1, -2, -5 but can have 0
        increment: quantity
        // Can be positive (add) or negative (reduce)
      }
    }
  });
};
var MedicineService = {
  createMedicine,
  getAllMedicines,
  getMedicineById,
  getMedicinesBySeller,
  updateMedicine,
  deleteMedicine,
  updateStock
};

// src/modules/medicine/medicine.controller.ts
var createMedicine2 = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access"
      });
    }
    const data = req.body;
    const result = await MedicineService.createMedicine(data, req.user.id);
    res.status(201).json({
      success: true,
      message: "Medicine created successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var getAllMedicines2 = async (req, res, next) => {
  try {
    const query = {
      search: req.query.search,
      categoryId: req.query.categoryId,
      minPrice: req.query.minPrice ? Number(req.query.minPrice) : void 0,
      maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : void 0,
      page: req.query.page ? Number(req.query.page) : 1,
      limit: req.query.limit ? Number(req.query.limit) : 10,
      sortBy: req.query.sortBy || "createdAt",
      sortOrder: req.query.sortOrder || "desc"
    };
    const result = await MedicineService.getAllMedicines(query);
    res.status(200).json({
      success: true,
      message: "Medicines retrieved successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var getMedicineById2 = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await MedicineService.getMedicineById(id);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Medicine not found"
      });
    }
    res.status(200).json({
      success: true,
      message: "Medicine retrieved successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var getMyMedicines = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access"
      });
    }
    const result = await MedicineService.getMedicinesBySeller(req.user.id);
    res.status(200).json({
      success: true,
      message: "Your medicines retrieved successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var updateMedicine2 = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access"
      });
    }
    const { id } = req.params;
    const data = req.body;
    const result = await MedicineService.updateMedicine(
      id,
      data,
      req.user.id,
      req.user.role
    );
    res.status(200).json({
      success: true,
      message: "Medicine updated successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var deleteMedicine2 = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access"
      });
    }
    const { id } = req.params;
    await MedicineService.deleteMedicine(
      id,
      req.user.id,
      req.user.role
    );
    res.status(200).json({
      success: true,
      message: "Medicine deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};
var updateStock2 = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access"
      });
    }
    const { id } = req.params;
    const { quantity } = req.body;
    const isAdmin = req.user.role === "ADMIN" /* ADMIN */;
    const result = await MedicineService.updateStock(
      id,
      quantity,
      req.user.id,
      isAdmin
    );
    res.status(200).json({
      success: true,
      message: "Stock updated successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var MedicineController = {
  createMedicine: createMedicine2,
  getAllMedicines: getAllMedicines2,
  getMedicineById: getMedicineById2,
  getMyMedicines,
  updateMedicine: updateMedicine2,
  deleteMedicine: deleteMedicine2,
  updateStock: updateStock2
};

// src/modules/medicine/medicine.route.ts
var router2 = express2.Router();
router2.get("/", MedicineController.getAllMedicines);
router2.get(
  "/seller/my-medicines",
  auth_default("SELLER" /* SELLER */),
  MedicineController.getMyMedicines
);
router2.post(
  "/",
  auth_default("SELLER" /* SELLER */, "ADMIN" /* ADMIN */),
  MedicineController.createMedicine
);
router2.patch(
  "/:id/stock",
  auth_default("SELLER" /* SELLER */, "ADMIN" /* ADMIN */),
  MedicineController.updateStock
);
router2.patch(
  "/:id",
  auth_default("SELLER" /* SELLER */, "ADMIN" /* ADMIN */),
  MedicineController.updateMedicine
);
router2.delete(
  "/:id",
  auth_default("SELLER" /* SELLER */, "ADMIN" /* ADMIN */),
  MedicineController.deleteMedicine
);
router2.get("/:id", MedicineController.getMedicineById);
var medicineRouter = router2;

// src/modules/order/order.route.ts
import express3 from "express";

// src/modules/order/order.service.ts
var createOrder = async (data, customerId) => {
  for (const item of data.items) {
    const medicine = await prisma.medicine.findUnique({
      where: { id: item.medicineId },
      select: { stock: true, price: true }
    });
    if (!medicine) {
      throw new Error(`Medicine ${item.medicineId} not found`);
    }
    if (medicine.stock < item.quantity) {
      throw new Error(`Insufficient stock for medicine ${item.medicineId}`);
    }
  }
  const totalAmount = data.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  const order = await prisma.$transaction(async (tx) => {
    const newOrder = await tx.order.create({
      data: {
        orderNumber,
        customerId,
        shippingAddress: data.shippingAddress,
        totalAmount,
        status: ORDERSTATUS.PLACED,
        items: {
          create: data.items.map((item) => ({
            medicineId: item.medicineId,
            quantity: item.quantity,
            price: item.price
          }))
        }
      },
      include: {
        items: {
          include: {
            medicine: {
              include: {
                category: true
              }
            }
          }
        }
      }
    });
    for (const item of data.items) {
      await tx.medicine.update({
        where: { id: item.medicineId },
        data: {
          stock: {
            decrement: item.quantity
          }
        }
      });
    }
    return newOrder;
  });
  return order;
};
var getOrderById = async (orderId) => {
  return await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: {
        include: {
          medicine: {
            include: {
              category: true
            }
          }
        }
      }
    }
  });
};
var getMyOrders = async (customerId) => {
  return await prisma.order.findMany({
    where: { customerId },
    orderBy: { createdAt: "desc" },
    include: {
      items: {
        include: {
          medicine: true
        }
      }
    }
  });
};
var getAllOrders = async (userId, userRole) => {
  if (userRole === "SELLER" && userId) {
    return await prisma.order.findMany({
      where: {
        items: {
          some: {
            medicine: {
              sellerId: userId
            }
          }
        }
      },
      orderBy: { createdAt: "desc" },
      include: {
        items: {
          include: {
            medicine: true
          }
        }
      }
    });
  }
  return await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      items: {
        include: {
          medicine: true
        }
      }
    }
  });
};
var updateOrderStatus = async (orderId, status) => {
  const order = await prisma.order.findUniqueOrThrow({
    where: { id: orderId }
  });
  if (order.status === ORDERSTATUS.CANCELLED) {
    throw new Error("Cannot update status of cancelled order");
  }
  if (order.status === ORDERSTATUS.DELIVERED) {
    throw new Error("Cannot update status of delivered order");
  }
  return await prisma.order.update({
    where: { id: orderId },
    data: { status },
    include: {
      items: {
        include: {
          medicine: true
        }
      }
    }
  });
};
var cancelOrder = async (orderId, customerId) => {
  const order = await prisma.order.findUniqueOrThrow({
    where: { id: orderId },
    select: {
      id: true,
      customerId: true,
      status: true,
      items: {
        select: {
          medicineId: true,
          quantity: true
        }
      }
    }
  });
  if (order.customerId !== customerId) {
    throw new Error("Unauthorized access");
  }
  if (order.status !== ORDERSTATUS.PLACED) {
    throw new Error("Can only cancel orders with PLACED status");
  }
  return await prisma.$transaction(async (tx) => {
    for (const item of order.items) {
      await tx.medicine.update({
        where: { id: item.medicineId },
        data: {
          stock: {
            increment: item.quantity
          }
        }
      });
    }
    return await tx.order.update({
      where: { id: orderId },
      data: { status: ORDERSTATUS.CANCELLED },
      include: {
        items: {
          include: {
            medicine: true
          }
        }
      }
    });
  });
};
var OrderService = {
  createOrder,
  getOrderById,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  cancelOrder
};

// src/modules/order/order.controller.ts
var createOrder2 = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access"
      });
    }
    const data = req.body;
    const result = await OrderService.createOrder(data, req.user.id);
    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var getOrderById2 = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await OrderService.getOrderById(id);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }
    res.status(200).json({
      success: true,
      message: "Order retrieved successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var getMyOrders2 = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access"
      });
    }
    const result = await OrderService.getMyOrders(req.user.id);
    res.status(200).json({
      success: true,
      message: "Orders retrieved successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var getAllOrders2 = async (req, res, next) => {
  try {
    const result = await OrderService.getAllOrders(
      req.user?.id,
      req.user?.role
    );
    res.status(200).json({
      success: true,
      message: "Orders retrieved successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var updateOrderStatus2 = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const result = await OrderService.updateOrderStatus(id, status);
    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var cancelOrder2 = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access"
      });
    }
    const { id } = req.params;
    const result = await OrderService.cancelOrder(id, req.user.id);
    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var OrderController = {
  createOrder: createOrder2,
  getOrderById: getOrderById2,
  getMyOrders: getMyOrders2,
  getAllOrders: getAllOrders2,
  updateOrderStatus: updateOrderStatus2,
  cancelOrder: cancelOrder2
};

// src/modules/order/order.route.ts
var router3 = express3.Router();
router3.get(
  "/customer/my-orders",
  auth_default("CUSTOMER" /* CUSTOMER */),
  OrderController.getMyOrders
);
router3.post("/", auth_default("CUSTOMER" /* CUSTOMER */), OrderController.createOrder);
router3.patch(
  "/:id/cancel",
  auth_default("CUSTOMER" /* CUSTOMER */),
  OrderController.cancelOrder
);
router3.get(
  "/all",
  auth_default("ADMIN" /* ADMIN */, "SELLER" /* SELLER */),
  OrderController.getAllOrders
);
router3.patch(
  "/:id/status",
  auth_default("ADMIN" /* ADMIN */, "SELLER" /* SELLER */),
  OrderController.updateOrderStatus
);
router3.get("/:id", OrderController.getOrderById);
var orderRouter = router3;

// src/modules/review/review.route.ts
import express4 from "express";

// src/modules/review/review.service.ts
var createReview = async (data, customerId) => {
  await prisma.medicine.findUniqueOrThrow({
    where: { id: data.medicineId }
  });
  const existingReview = await prisma.review.findFirst({
    where: {
      customerId,
      medicineId: data.medicineId
    }
  });
  if (existingReview) {
    throw new Error("You have already reviewed this medicine");
  }
  const hasPurchased = await prisma.order.findFirst({
    where: {
      customerId,
      items: {
        some: {
          medicineId: data.medicineId
        }
      },
      status: "DELIVERED"
    }
  });
  if (!hasPurchased) {
    throw new Error("You can only review medicines you have purchased");
  }
  return await prisma.review.create({
    data: {
      rating: data.rating,
      comment: data?.comment,
      customerId,
      medicineId: data.medicineId
    }
  });
};
var getAllReviews = async () => {
  return await prisma.review.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      medicine: {
        select: {
          id: true,
          name: true,
          imageUrl: true
        }
      }
    }
  });
};
var getTopReviews = async (limit = 10) => {
  return await prisma.review.findMany({
    where: {
      rating: {
        gte: 4
      }
    },
    orderBy: {
      rating: "desc"
    },
    take: limit,
    include: {
      medicine: {
        select: {
          id: true,
          name: true,
          imageUrl: true
        }
      }
    }
  });
};
var getReviewsByMedicine = async (medicineId) => {
  return await prisma.review.findMany({
    where: { medicineId },
    orderBy: { createdAt: "desc" }
  });
};
var getMyReviews = async (customerId) => {
  return await prisma.review.findMany({
    where: { customerId },
    orderBy: { createdAt: "desc" },
    include: {
      medicine: {
        select: {
          id: true,
          name: true,
          imageUrl: true
        }
      }
    }
  });
};
var updateReview = async (reviewId, data, customerId) => {
  const review = await prisma.review.findUniqueOrThrow({
    where: { id: reviewId },
    select: { id: true, customerId: true }
  });
  if (review.customerId !== customerId) {
    throw new Error("Unauthorized access");
  }
  return await prisma.review.update({
    where: { id: reviewId },
    data
  });
};
var deleteReview = async (reviewId, customerId) => {
  const review = await prisma.review.findUniqueOrThrow({
    where: { id: reviewId },
    select: { id: true, customerId: true }
  });
  if (review.customerId !== customerId) {
    throw new Error("Unauthorized access");
  }
  await prisma.review.delete({
    where: { id: reviewId }
  });
};
var deleteReviewByAdmin = async (reviewId) => {
  await prisma.review.delete({
    where: { id: reviewId }
  });
};
var ReviewService = {
  createReview,
  getAllReviews,
  getTopReviews,
  getReviewsByMedicine,
  getMyReviews,
  updateReview,
  deleteReview,
  deleteReviewByAdmin
};

// src/modules/review/review.controller.ts
var createReview2 = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access"
      });
    }
    const data = req.body;
    const result = await ReviewService.createReview(data, req.user.id);
    res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var getAllReviews2 = async (req, res, next) => {
  try {
    const result = await ReviewService.getAllReviews();
    res.status(200).json({
      success: true,
      message: "Reviews retrieved successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var getTopReviews2 = async (req, res, next) => {
  try {
    const limit = req.query.limit ? Number(req.query.limit) : 10;
    const result = await ReviewService.getTopReviews(limit);
    res.status(200).json({
      success: true,
      message: "Top reviews retrieved successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var getReviewsByMedicine2 = async (req, res, next) => {
  try {
    const { medicineId } = req.params;
    const result = await ReviewService.getReviewsByMedicine(
      medicineId
    );
    res.status(200).json({
      success: true,
      message: "Reviews retrieved successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var getMyReviews2 = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access"
      });
    }
    const result = await ReviewService.getMyReviews(req.user.id);
    res.status(200).json({
      success: true,
      message: "Your reviews retrieved successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var updateReview2 = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access"
      });
    }
    const { id } = req.params;
    const data = req.body;
    const result = await ReviewService.updateReview(
      id,
      data,
      req.user.id
    );
    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var deleteReview2 = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access"
      });
    }
    const { id } = req.params;
    await ReviewService.deleteReview(id, req.user.id);
    res.status(200).json({
      success: true,
      message: "Review deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};
var deleteReviewByAdmin2 = async (req, res, next) => {
  try {
    const { id } = req.params;
    await ReviewService.deleteReviewByAdmin(id);
    res.status(200).json({
      success: true,
      message: "Review deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};
var ReviewController = {
  createReview: createReview2,
  getAllReviews: getAllReviews2,
  getTopReviews: getTopReviews2,
  getReviewsByMedicine: getReviewsByMedicine2,
  getMyReviews: getMyReviews2,
  updateReview: updateReview2,
  deleteReview: deleteReview2,
  deleteReviewByAdmin: deleteReviewByAdmin2
};

// src/modules/review/review.route.ts
var router4 = express4.Router();
router4.get("/top", ReviewController.getTopReviews);
router4.get("/medicine/:medicineId", ReviewController.getReviewsByMedicine);
router4.get(
  "/my-reviews",
  auth_default("CUSTOMER" /* CUSTOMER */),
  ReviewController.getMyReviews
);
router4.post("/", auth_default("CUSTOMER" /* CUSTOMER */), ReviewController.createReview);
router4.patch(
  "/:id",
  auth_default("CUSTOMER" /* CUSTOMER */),
  ReviewController.updateReview
);
router4.delete(
  "/:id",
  auth_default("CUSTOMER" /* CUSTOMER */),
  ReviewController.deleteReview
);
router4.get("/all", auth_default("ADMIN" /* ADMIN */), ReviewController.getAllReviews);
router4.delete(
  "/:id/admin",
  auth_default("ADMIN" /* ADMIN */),
  ReviewController.deleteReviewByAdmin
);
var reviewRouter = router4;

// src/modules/user/user.route.ts
import express5 from "express";

// src/modules/user/user.service.ts
var getProfile = async (userId) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      image: true,
      role: true,
      status: true,
      bio: true,
      businessName: true,
      businessAddress: true,
      sellerRequestStatus: true,
      emailVerified: true,
      createdAt: true
    }
  });
};
var updateProfile = async (userId, data) => {
  return await prisma.user.update({
    where: { id: userId },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      image: true,
      bio: true
    }
  });
};
var requestSellerRole = async (userId, data) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    select: { sellerRequestStatus: true, role: true }
  });
  if (user.role === "SELLER" /* SELLER */ || user.role === "ADMIN" /* ADMIN */) {
    throw new Error("You are already a seller or admin");
  }
  if (user.sellerRequestStatus === "PENDING") {
    throw new Error("You already have a pending seller request");
  }
  if (user.sellerRequestStatus === "APPROVED") {
    throw new Error("Your seller request has already been approved");
  }
  return await prisma.user.update({
    where: { id: userId },
    data: {
      businessName: data.businessName,
      businessAddress: data.businessAddress,
      phone: data.phone,
      bio: data.bio,
      sellerRequestStatus: "PENDING"
    }
  });
};
var getPendingSellerRequests = async () => {
  return await prisma.user.findMany({
    where: {
      sellerRequestStatus: "PENDING"
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      image: true,
      businessName: true,
      businessAddress: true,
      bio: true,
      sellerRequestStatus: true,
      createdAt: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};
var approveSellerRequest = async (userId) => {
  return await prisma.user.update({
    where: { id: userId },
    data: {
      role: "SELLER" /* SELLER */,
      sellerRequestStatus: "APPROVED"
    }
  });
};
var rejectSellerRequest = async (userId) => {
  return await prisma.user.update({
    where: { id: userId },
    data: {
      sellerRequestStatus: "REJECTED"
    }
  });
};
var getAllUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      image: true,
      role: true,
      status: true,
      emailVerified: true,
      createdAt: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};
var getUserById = async (userId) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      image: true,
      role: true,
      status: true,
      emailVerified: true,
      createdAt: true
    }
  });
};
var updateUserStatus = async (userId, status) => {
  return await prisma.user.update({
    where: { id: userId },
    data: { status }
  });
};
var UserService = {
  getProfile,
  updateProfile,
  requestSellerRole,
  getPendingSellerRequests,
  approveSellerRequest,
  rejectSellerRequest,
  getAllUsers,
  getUserById,
  updateUserStatus
};

// src/modules/user/user.controller.ts
var getProfile2 = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access"
      });
    }
    const result = await UserService.getProfile(req.user.id);
    res.status(200).json({
      success: true,
      message: "Profile retrieved successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var updateProfile2 = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access"
      });
    }
    const data = req.body;
    const result = await UserService.updateProfile(req.user.id, data);
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var requestSellerRole2 = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access"
      });
    }
    const data = req.body;
    const result = await UserService.requestSellerRole(req.user.id, data);
    res.status(200).json({
      success: true,
      message: "Seller request submitted successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var getPendingSellerRequests2 = async (req, res, next) => {
  try {
    const result = await UserService.getPendingSellerRequests();
    res.status(200).json({
      success: true,
      message: "Pending seller requests retrieved successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var approveSellerRequest2 = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const result = await UserService.approveSellerRequest(userId);
    res.status(200).json({
      success: true,
      message: "Seller request approved successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var rejectSellerRequest2 = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const result = await UserService.rejectSellerRequest(userId);
    res.status(200).json({
      success: true,
      message: "Seller request rejected successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var getAllUsers2 = async (req, res, next) => {
  try {
    const result = await UserService.getAllUsers();
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var getUserById2 = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const result = await UserService.getUserById(userId);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var updateUserStatus2 = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { status } = req.body;
    const result = await UserService.updateUserStatus(userId, status);
    res.status(200).json({
      success: true,
      message: "User status updated successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var UserController = {
  getProfile: getProfile2,
  updateProfile: updateProfile2,
  requestSellerRole: requestSellerRole2,
  getPendingSellerRequests: getPendingSellerRequests2,
  approveSellerRequest: approveSellerRequest2,
  rejectSellerRequest: rejectSellerRequest2,
  getAllUsers: getAllUsers2,
  getUserById: getUserById2,
  updateUserStatus: updateUserStatus2
};

// src/modules/user/user.route.ts
var router5 = express5.Router();
router5.get(
  "/profile",
  auth_default("CUSTOMER" /* CUSTOMER */, "SELLER" /* SELLER */, "ADMIN" /* ADMIN */),
  UserController.getProfile
);
router5.patch(
  "/profile",
  auth_default("CUSTOMER" /* CUSTOMER */, "SELLER" /* SELLER */, "ADMIN" /* ADMIN */),
  UserController.updateProfile
);
router5.post(
  "/request-seller",
  auth_default("CUSTOMER" /* CUSTOMER */),
  UserController.requestSellerRole
);
router5.get(
  "/seller-requests",
  auth_default("ADMIN" /* ADMIN */),
  UserController.getPendingSellerRequests
);
router5.patch(
  "/seller-requests/:userId/approve",
  auth_default("ADMIN" /* ADMIN */),
  UserController.approveSellerRequest
);
router5.patch(
  "/seller-requests/:userId/reject",
  auth_default("ADMIN" /* ADMIN */),
  UserController.rejectSellerRequest
);
router5.get("/all", auth_default("ADMIN" /* ADMIN */), UserController.getAllUsers);
router5.get("/:userId", auth_default("ADMIN" /* ADMIN */), UserController.getUserById);
router5.patch(
  "/:userId/status",
  auth_default("ADMIN" /* ADMIN */),
  UserController.updateUserStatus
);
var userRouter = router5;

// src/app.ts
var app = express6();
app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:3000",
    credentials: true
  })
);
app.use(express6.json());
app.use(express6.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.all("/api/v1/auth/*splat", toNodeHandler(auth));
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/medicines", medicineRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/users", userRouter);
app.use(globalErrorHandler_default);
app.use(notFound);
var app_default = app;

// src/server.ts
var PORT = process.env.PORT || 4e3;
async function main() {
  try {
    await prisma.$connect();
    console.log("Connected to the database Successfully");
    app_default.listen(PORT, () => {
      console.log(
        `Server is listening on port ${PORT} \u2705 Live on http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error("An Error happened : ", error);
  }
}
main();
