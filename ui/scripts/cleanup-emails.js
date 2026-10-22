#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client');
const readline = require('readline');

const prisma = new PrismaClient();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function cleanupEmails() {
  console.log('\n=== NanoMail Email Cleanup Script ===');
  console.log('⚠️  WARNING: This will delete ALL emails from the database!');
  console.log('This action cannot be undone.\n');

  try {
    const confirmation = await askQuestion('Are you sure you want to continue? Type "DELETE ALL EMAILS" to confirm: ');
    
    if (confirmation !== 'DELETE ALL EMAILS') {
      console.log('❌ Cleanup cancelled. No emails were deleted.');
      process.exit(0);
    }

    console.log('\n🔄 Connecting to database...');
    
    const emailCount = await prisma.email.count();
    console.log(`📊 Found ${emailCount} emails in the database`);
    
    if (emailCount === 0) {
      console.log('✅ Database is already clean! No emails to delete.');
      process.exit(0);
    }

    console.log('\n🗑️  Starting email cleanup...');
    
    const deleteResult = await prisma.email.deleteMany({});
    
    console.log(`✅ Successfully deleted ${deleteResult.count} emails`);
    
    try {
      await prisma.$executeRaw`ALTER SEQUENCE "Email_id_seq" RESTART WITH 1`;
      console.log('✅ Successfully reset ID sequence');
    } catch (error) {
      console.log('⚠️  Warning: Could not reset ID sequence:', error.message);
    }

    console.log('\n🎉 Email cleanup completed successfully!');
    console.log('📈 Database statistics:');
    console.log(`   - Emails deleted: ${deleteResult.count}`);
    console.log(`   - Database size reduced: ~${(deleteResult.count * 0.5).toFixed(1)}MB (estimated)`);
    
  } catch (error) {
    console.error('❌ Error during cleanup:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    rl.close();
  }
}

process.on('SIGINT', async () => {
  console.log('\n\n⚠️  Script interrupted by user');
  await prisma.$disconnect();
  rl.close();
  process.exit(0);
});

process.on('uncaughtException', async (error) => {
  console.error('❌ Uncaught error:', error.message);
  await prisma.$disconnect();
  rl.close();
  process.exit(1);
});

cleanupEmails().catch(async (error) => {
  console.error('❌ Fatal error:', error.message);
  await prisma.$disconnect();
  rl.close();
  process.exit(1);
});
