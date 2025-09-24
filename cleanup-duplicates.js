#!/usr/bin/env node

/**
 * OPONM Codebase Cleanup Script
 * Removes duplicate files and consolidates functionality
 * 
 * This script safely removes duplicate components and services
 * after creating unified versions to prevent data loss.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Files to remove after creating unified versions
const filesToRemove = [
  // Course Management Duplicates
  'src/dashboard/CoursesManagement.tsx',
  'src/dashboard/CourseManagement.tsx',
  'src/dashboard/CourseCreatorDashboard.tsx',
  
  // Creators Portal Duplicates
  'src/components/CreatorsPortal.tsx',
  'src/dashboard/CreatorsPortal.tsx',
  
  // Course Purchase Duplicates
  'src/components/CoursePurchase.tsx',
  'src/components/CoursePurchaseFlow.tsx',
  
  // Pricing Duplicates
  'src/components/Pricing.tsx',
  'src/components/PricingPage.tsx',
  
  // Service Duplicates
  'src/services/courseService.ts',
  'src/services/courseManagementService.ts',
  'src/services/courseCreationService.ts',
];

// Backup directory
const backupDir = 'backup-duplicates';

function createBackupDirectory() {
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
    console.log(`✅ Created backup directory: ${backupDir}`);
  }
}

function backupFile(filePath) {
  if (fs.existsSync(filePath)) {
    const fileName = path.basename(filePath);
    const backupPath = path.join(backupDir, fileName);
    
    // Add timestamp to avoid conflicts
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPathWithTimestamp = path.join(backupDir, `${timestamp}-${fileName}`);
    
    fs.copyFileSync(filePath, backupPathWithTimestamp);
    console.log(`📦 Backed up: ${filePath} -> ${backupPathWithTimestamp}`);
    return true;
  }
  return false;
}

function removeFile(filePath) {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`🗑️  Removed: ${filePath}`);
    return true;
  }
  return false;
}

function updateImports() {
  console.log('\n🔄 Updating import statements...');
  
  // Files that might import the removed components
  const filesToUpdate = [
    'src/App.tsx',
    'src/main.tsx',
    'src/dashboard/index.ts',
    'src/components/index.ts'
  ];
  
  const importMappings = {
    // Course Management
    'CoursesManagement': 'UnifiedCourseManagement',
    'CourseManagement': 'UnifiedCourseManagement',
    'CourseCreatorDashboard': 'UnifiedCourseManagement',
    
    // Creators Portal
    'CreatorsPortal': 'UnifiedCreatorsPortal',
    
    // Course Purchase
    'CoursePurchase': 'UnifiedCoursePurchase',
    'CoursePurchaseFlow': 'UnifiedCoursePurchase',
    
    // Pricing
    'Pricing': 'UnifiedPricing',
    'PricingPage': 'UnifiedPricing',
    
    // Services
    'courseService': 'unifiedCourseService',
    'courseManagementService': 'unifiedCourseService',
    'courseCreationService': 'unifiedCourseService'
  };
  
  filesToUpdate.forEach(filePath => {
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      let updated = false;
      
      Object.entries(importMappings).forEach(([oldImport, newImport]) => {
        const regex = new RegExp(`\\b${oldImport}\\b`, 'g');
        if (content.includes(oldImport)) {
          content = content.replace(regex, newImport);
          updated = true;
        }
      });
      
      if (updated) {
        fs.writeFileSync(filePath, content);
        console.log(`📝 Updated imports in: ${filePath}`);
      }
    }
  });
}

function generateReport() {
  const report = {
    timestamp: new Date().toISOString(),
    filesRemoved: filesToRemove.filter(file => fs.existsSync(file)),
    filesBackedUp: [],
    totalSpaceSaved: 0,
    recommendations: [
      'Test the application thoroughly after cleanup',
      'Update any remaining import statements manually',
      'Review the unified components for any missing functionality',
      'Update documentation to reflect the new structure'
    ]
  };
  
  // Calculate space saved
  filesToRemove.forEach(filePath => {
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      report.totalSpaceSaved += stats.size;
    }
  });
  
  // Save report
  fs.writeFileSync('cleanup-report.json', JSON.stringify(report, null, 2));
  console.log('\n📊 Cleanup Report Generated: cleanup-report.json');
  
  return report;
}

function main() {
  console.log('🚀 Starting OPONM Codebase Cleanup...\n');
  
  // Create backup directory
  createBackupDirectory();
  
  // Backup and remove files
  let removedCount = 0;
  let backedUpCount = 0;
  
  filesToRemove.forEach(filePath => {
    console.log(`\n📁 Processing: ${filePath}`);
    
    if (backupFile(filePath)) {
      backedUpCount++;
      if (removeFile(filePath)) {
        removedCount++;
      }
    } else {
      console.log(`⚠️  File not found: ${filePath}`);
    }
  });
  
  // Update imports
  updateImports();
  
  // Generate report
  const report = generateReport();
  
  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('🎉 CLEANUP COMPLETED SUCCESSFULLY!');
  console.log('='.repeat(50));
  console.log(`📦 Files backed up: ${backedUpCount}`);
  console.log(`🗑️  Files removed: ${removedCount}`);
  console.log(`💾 Space saved: ${(report.totalSpaceSaved / 1024).toFixed(2)} KB`);
  console.log(`📁 Backup location: ${backupDir}/`);
  console.log('\n📋 Next Steps:');
  report.recommendations.forEach((rec, index) => {
    console.log(`   ${index + 1}. ${rec}`);
  });
  console.log('\n✨ Your codebase is now optimized and duplicate-free!');
}

// Run the cleanup
main();

export {
  filesToRemove,
  backupFile,
  removeFile,
  updateImports,
  generateReport
};
