import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load env
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI not found in .env.local');
    process.exit(1);
}

async function fixDatabase() {
    try {
        console.log('🚀 Connecting to MongoDB to fix indexes...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected.');

        const db = mongoose.connection.db;
        const collection = db.collection('users');

        console.log('🔍 Checking for problematic indexes...');
        const indexes = await collection.indexes();
        
        const indexesToDrop = ['clerkId_1', 'steamId_1'];

        for (const indexName of indexesToDrop) {
            const indexExists = indexes.find(idx => idx.name === indexName);
            if (indexExists) {
                console.log(`⚠️  Dropping unique index: ${indexName}...`);
                await collection.dropIndex(indexName);
                console.log(`✅ ${indexName} dropped successfully.`);
            } else {
                console.log(`ℹ️  Index ${indexName} does not exist or was already removed.`);
            }
        }

        console.log('\n✨ Database indexes have been relaxed.');
        console.log('👉 You can now create multiple accounts without "clerkId/steamId" collisions.');
        
        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error('❌ Error fixing database:', error);
        process.exit(1);
    }
}

fixDatabase();
