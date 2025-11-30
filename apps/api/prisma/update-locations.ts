import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🔄 Updating locations...');

  // Update buildings
  await prisma.building.update({
    where: { code: 'A' },
    data: {
      name: 'CADT - Innovation Center',
      description: 'Main Innovation and Technology Hub',
      latitude: 11.653714,
      longitude: 104.912045,
    },
  });

  await prisma.building.update({
    where: { code: 'B' },
    data: {
      name: 'NIPTICT Dormitory',
      description: 'Student Dormitory and Accommodation',
      latitude: 11.653967,
      longitude: 104.911995,
    },
  });

  await prisma.building.update({
    where: { code: 'C' },
    data: {
      name: 'Institute of Digital Governance - IDG',
      description: 'Digital Governance Research and Education',
      latitude: 11.653742,
      longitude: 104.911987,
    },
  });

  await prisma.building.update({
    where: { code: 'D' },
    data: {
      name: 'Cambodia Academy of Digital Technology (CADT)',
      description: 'Main CADT Academic Building',
      latitude: 11.653458,
      longitude: 104.911924,
      floors: 5,
    },
  });

  console.log('✅ Updated buildings');

  // Update POIs
  const pois = [
    { name: 'Main Library', latitude: 11.653750, longitude: 104.912060 },
    { name: 'Student Cafeteria', latitude: 11.653680, longitude: 104.912000 },
    { name: 'Recycling Point A', latitude: 11.653714, longitude: 104.912045 },
    { name: 'Recycling Point B', latitude: 11.653967, longitude: 104.911995 },
    { name: 'Main Entrance', latitude: 11.653500, longitude: 104.912000 },
    { name: 'Parking Lot', latitude: 11.653400, longitude: 104.911900 },
    { name: 'ATM', latitude: 11.653742, longitude: 104.911987 },
  ];

  for (const poi of pois) {
    await prisma.pOI.updateMany({
      where: { name: poi.name },
      data: { latitude: poi.latitude, longitude: poi.longitude },
    });
  }

  console.log('✅ Updated POIs');
  console.log('🎉 All locations updated successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
