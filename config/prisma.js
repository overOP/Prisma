const {PrismaClient}  = require("@prisma/client")
const prisma = new PrismaClient();
//Error handling
prisma.$connect().then(
    (value) => {
    console.log("Connected to database")
}).catch((err) => {
    console.error(err);
})

module.exports = prisma;