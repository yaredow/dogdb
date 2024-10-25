import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  try {
    // Read the breed.json file
    const filePath = path.join(__dirname, "Breed.json");
    const breedData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    // Loop through the breeds and create them in the database
    for (const breed of breedData) {
      await prisma.breed.create({
        data: {
          breedName: breed.breedName,
          breedShortDescription: breed.breedShortDescription,
          breedLongDescription: breed.breedLongDescription,
          breedCharacteristics: breed.breedCharacteristics,
          breedImages: breed.breedImages,
          traits: breed.traits,
          diseases: breed.diseases,
          averageHeight: breed.averageHeight,
          averageWeight: breed.averageWeight,
          lifeExpectancy: breed.lifeExpectancy,
          temperament: breed.temperament,
          hairShedding: breed.hairShedding,
          activity: breed.activity,
          sociability: breed.sociability,
          intelligence: breed.intelligence,
          childFriendly: breed.childFriendly,
          careLevel: breed.careLevel,
          healthProblems: breed.healthProblems,
          geneticProfile: breed.geneticProfile,
          feedingHabits: breed.feedingHabits,
          slug: breed.slug,
        },
      });
      console.log(`Created breed: ${breed.breedName}`);
    }

    console.log("All breeds have been added to the database!");
  } catch (error) {
    console.error("Error seeding breeds:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
main();
