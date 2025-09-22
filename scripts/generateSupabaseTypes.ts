// scripts/generateSupabaseTypes.ts
import { exec } from 'child_process';
import { writeFile } from 'fs';
import { promisify } from 'util';
import path from 'path';

const execAsync = promisify(exec);
const writeFileAsync = promisify(writeFile);

async function generateSupabaseTypes() {
  try {
    console.info('🌀 Generating Supabase types...');

    const { stdout, stderr } = await execAsync(
      'supabase gen types typescript --local'
    );

    if (stderr) {
      console.error('⚠️ STDERR:', stderr);
    }

    const outputPath = path.resolve(__dirname, '../supabase/supabase.types.ts');
    await writeFileAsync(outputPath, stdout);
    const functionsOutputPath = path.resolve(
      __dirname,
      '../supabase/functions/_shared/supabase.types.ts'
    );
    await writeFileAsync(functionsOutputPath, stdout);

    console.info(
      `✅ Supabase types saved to: ${outputPath} and ${functionsOutputPath}`
    );
  } catch (error) {
    console.error('❌ Failed to generate Supabase types:', error);
    process.exit(1);
  }
}

generateSupabaseTypes();
