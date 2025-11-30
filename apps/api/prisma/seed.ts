import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const adminPasswordHash = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@cadt.edu.kh' },
    update: {},
    create: {
      email: 'admin@cadt.edu.kh',
      name: 'CADT Admin',
      role: 'ADMIN',
      passwordHash: adminPasswordHash,
    },
  });
  console.log('✅ Created admin user:', admin.email);

  // Create student user
  const studentPasswordHash = await bcrypt.hash('student123', 10);
  const student = await prisma.user.upsert({
    where: { email: 'student@cadt.edu.kh' },
    update: {},
    create: {
      email: 'student@cadt.edu.kh',
      studentId: 'ST001',
      name: 'Kimhour',
      role: 'STUDENT',
      passwordHash: studentPasswordHash,
    },
  });
  console.log('✅ Created student user:', student.email);

  // Create buildings
  const buildingA = await prisma.building.upsert({
    where: { code: 'A' },
    update: {},
    create: {
      code: 'A',
      name: 'A Building',
      description: 'Main academic building',
      latitude: 11.5564,
      longitude: 104.9282,
      floors: 3,
    },
  });

  const buildingB = await prisma.building.upsert({
    where: { code: 'B' },
    update: {},
    create: {
      code: 'B',
      name: 'B Building',
      description: 'Technology and Innovation Center',
      latitude: 11.5566,
      longitude: 104.9284,
      floors: 4,
    },
  });

  const buildingC = await prisma.building.upsert({
    where: { code: 'C' },
    update: {},
    create: {
      code: 'C',
      name: 'C Building',
      description: 'Student Center',
      latitude: 11.5562,
      longitude: 104.928,
      floors: 2,
    },
  });

  console.log(
    '✅ Created buildings:',
    buildingA.name,
    buildingB.name,
    buildingC.name,
  );

  // Create rooms
  const rooms = [
    // Building A rooms
    {
      code: 'A101',
      name: 'Study Room A101',
      buildingId: buildingA.id,
      floor: 1,
      capacity: 6,
      type: 'STUDY_ROOM' as const,
      facilities: { whiteboard: true, projector: false, ac: true },
    },
    {
      code: 'A102',
      name: 'Classroom A102',
      buildingId: buildingA.id,
      floor: 1,
      capacity: 30,
      type: 'CLASSROOM' as const,
      facilities: { whiteboard: true, projector: true, ac: true },
    },
    {
      code: 'A201',
      name: 'Lecture Hall A201',
      buildingId: buildingA.id,
      floor: 2,
      capacity: 100,
      type: 'LECTURE_HALL' as const,
      facilities: {
        whiteboard: true,
        projector: true,
        ac: true,
        sound_system: true,
      },
    },
    // Building B rooms
    {
      code: 'B101',
      name: 'Computer Lab B101',
      buildingId: buildingB.id,
      floor: 1,
      capacity: 30,
      type: 'COMPUTER_LAB' as const,
      facilities: { computers: 30, projector: true, ac: true },
    },
    {
      code: 'B203',
      name: 'Computer Lab B203',
      buildingId: buildingB.id,
      floor: 2,
      capacity: 40,
      type: 'COMPUTER_LAB' as const,
      facilities: { computers: 40, projector: true, ac: true },
    },
    {
      code: 'B301',
      name: 'Innovation Lab B301',
      buildingId: buildingB.id,
      floor: 3,
      capacity: 20,
      type: 'MEETING_ROOM' as const,
      facilities: {
        whiteboard: true,
        projector: true,
        ac: true,
        collaboration_tools: true,
      },
    },
    // Building C rooms
    {
      code: 'C101',
      name: 'Study Room C101',
      buildingId: buildingC.id,
      floor: 1,
      capacity: 8,
      type: 'STUDY_ROOM' as const,
      facilities: { whiteboard: true, ac: true },
    },
    {
      code: 'C102',
      name: 'Study Room C102',
      buildingId: buildingC.id,
      floor: 1,
      capacity: 10,
      type: 'STUDY_ROOM' as const,
      facilities: { whiteboard: true, ac: true },
    },
  ];

  for (const room of rooms) {
    await prisma.room.upsert({
      where: { code: room.code },
      update: {},
      create: room,
    });
  }
  console.log(`✅ Created ${rooms.length} rooms`);

  // Create POIs
  const pois = [
    {
      name: 'Main Library',
      type: 'LIBRARY' as const,
      buildingId: buildingA.id,
      latitude: 11.5565,
      longitude: 104.9283,
      floor: 1,
      description: 'CADT Main Library - Books, computers, and study spaces',
      icon: 'library',
    },
    {
      name: 'Student Cafeteria',
      type: 'CAFETERIA' as const,
      buildingId: buildingC.id,
      latitude: 11.5562,
      longitude: 104.9281,
      floor: 1,
      description: 'Delicious food and beverages',
      icon: 'cafeteria',
    },
    {
      name: 'Recycling Point A',
      type: 'RECYCLING' as const,
      buildingId: buildingA.id,
      latitude: 11.5564,
      longitude: 104.9282,
      floor: 1,
      description: 'Recycling bins for paper, plastic, and cans',
      icon: 'recycling',
    },
    {
      name: 'Recycling Point B',
      type: 'RECYCLING' as const,
      buildingId: buildingB.id,
      latitude: 11.5566,
      longitude: 104.9284,
      floor: 1,
      description: 'Recycling bins for paper, plastic, and cans',
      icon: 'recycling',
    },
    {
      name: 'Main Entrance',
      type: 'ENTRANCE' as const,
      latitude: 11.5563,
      longitude: 104.9281,
      description: 'Main campus entrance',
      icon: 'entrance',
    },
    {
      name: 'Parking Lot',
      type: 'PARKING' as const,
      latitude: 11.556,
      longitude: 104.9279,
      description: 'Student and staff parking',
      icon: 'parking',
    },
    {
      name: 'ATM',
      type: 'ATM' as const,
      buildingId: buildingC.id,
      latitude: 11.5562,
      longitude: 104.928,
      floor: 1,
      description: 'ABA Bank ATM',
      icon: 'atm',
    },
  ];

  for (const poi of pois) {
    const existing = await prisma.pOI.findFirst({
      where: { name: poi.name, type: poi.type },
    });
    if (!existing) {
      await prisma.pOI.create({ data: poi });
    }
  }
  console.log(`✅ Created ${pois.length} POIs`);

  // Create events
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextWeek = new Date(now);
  nextWeek.setDate(nextWeek.getDate() + 7);

  const events = [
    {
      title: 'Welcome to CADT 2025',
      description: 'Orientation for new students',
      type: 'OFFICIAL' as const,
      startTime: tomorrow,
      endTime: new Date(tomorrow.getTime() + 3 * 60 * 60 * 1000), // 3 hours later
      location: 'A201',
      organizer: 'CADT Official',
      registrationRequired: true,
      maxParticipants: 100,
    },
    {
      title: 'Web Development Workshop',
      description: 'Learn Next.js and React',
      type: 'WORKSHOP' as const,
      startTime: nextWeek,
      endTime: new Date(nextWeek.getTime() + 2 * 60 * 60 * 1000), // 2 hours later
      location: 'B203',
      organizer: 'Tech Club',
      registrationRequired: true,
      maxParticipants: 30,
    },
    {
      title: 'Career Fair 2025',
      description: 'Meet top employers in Cambodia',
      type: 'CAREER' as const,
      startTime: new Date(nextWeek.getTime() + 2 * 24 * 60 * 60 * 1000), // 2 days after next week
      endTime: new Date(
        nextWeek.getTime() + 2 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000,
      ), // 4 hours later
      location: 'C Building',
      organizer: 'CADT Career Services',
      registrationRequired: false,
    },
  ];

  for (const event of events) {
    const existing = await prisma.event.findFirst({
      where: { title: event.title },
    });
    if (!existing) {
      await prisma.event.create({ data: event });
    }
  }
  console.log(`✅ Created ${events.length} events`);

  console.log('🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
