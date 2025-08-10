import fs from 'fs';
import path from 'path';

// Common unused imports to remove
const unusedImports = [
  'useEffect',
  'useMemo', 
  'useCallback',
  'MicOff',
  'CameraOff',
  'DollarSign',
  'BarChart3',
  'Clock',
  'Award',
  'Sparkles',
  'LineChart',
  'Line',
  'TrendingDown',
  'Calendar',
  'PRICING_STRATEGIES'
];

// Files to process
const filesToProcess = [
  'src/dashboard/Meetings.tsx',
  'src/dashboard/Overview.tsx', 
  'src/dashboard/PaymentAnalytics.tsx',
  'src/dashboard/Library.tsx',
  'src/dashboard/Templates.tsx',
  'src/dashboard/UserManagement.tsx',
  'src/dashboard/WhiteLabelBranding.tsx',
  'src/dashboard/SCORMExport.tsx',
  'src/dashboard/Settings.tsx',
  'src/dashboard/Social.tsx'
];

function fixFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Remove unused imports
    unusedImports.forEach(importName => {
      const importRegex = new RegExp(`\\b${importName}\\b\\s*,?\\s*`, 'g');
      if (importRegex.test(content)) {
        content = content.replace(importRegex, '');
        modified = true;
      }
    });

    // Clean up empty import lines
    content = content.replace(/import\s*{\s*}\s*from\s*['"][^'"]+['"];?\s*\n?/g, '');
    content = content.replace(/import\s*{\s*,\s*}\s*from\s*['"][^'"]+['"];?\s*\n?/g, '');

    if (modified) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Fixed: ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
}

console.log('🔧 Starting automatic lint fixes...');
filesToProcess.forEach(fixFile);
console.log('✨ Automatic fixes completed!');
