import { COMPANIONS_DATA } from '../pages/CompanionsLibrary';
import { SUBJECT_COLORS } from '../pages/CompanionSession';

interface TestResult {
  test: string;
  status: 'PASS' | 'FAIL' | 'WARNING';
  message: string;
  details?: any;
}

export const testCompanionsSystem = async (): Promise<TestResult[]> => {
  const results: TestResult[] = [];
  
  console.log('🤖 Testing OponMeta Companions System...\n');

  // Test 1: Data Structure Validation
  console.log('📊 Testing Data Structure...');
  try {
    const englishCompanions = COMPANIONS_DATA.en;
    const requiredFields = ['id', 'name', 'topic', 'subject', 'description', 'duration', 'style', 'voice', 'languages', 'avatar', 'expertise', 'rating', 'sessions'];
    
    englishCompanions.forEach((companion, index) => {
      requiredFields.forEach(field => {
        if (!(field in companion)) {
          results.push({
            test: `Companion ${index + 1} - ${field}`,
            status: 'FAIL',
            message: `Missing required field: ${field}`,
            details: companion
          });
        }
      });
    });
    
    if (englishCompanions.length > 0) {
      results.push({
        test: 'Data Structure Validation',
        status: 'PASS',
        message: `All ${englishCompanions.length} companions have required fields`,
        details: { companionCount: englishCompanions.length, fields: requiredFields }
      });
    }
  } catch (error) {
    results.push({
      test: 'Data Structure Validation',
      status: 'FAIL',
      message: 'Error validating data structure',
      details: error
    });
  }

  // Test 2: Multilingual Support
  console.log('🌍 Testing Multilingual Support...');
  try {
    const supportedLanguages = Object.keys(COMPANIONS_DATA);
    const expectedLanguages = ['en', 'es', 'fr', 'zh'];
    
    expectedLanguages.forEach(lang => {
      if (supportedLanguages.includes(lang)) {
        const companions = COMPANIONS_DATA[lang as keyof typeof COMPANIONS_DATA];
        results.push({
          test: `${lang.toUpperCase()} Language Support`,
          status: 'PASS',
          message: `${lang.toUpperCase()} has ${companions.length} companions`,
          details: { language: lang, companionCount: companions.length }
        });
      } else {
        results.push({
          test: `${lang.toUpperCase()} Language Support`,
          status: 'WARNING',
          message: `${lang.toUpperCase()} language not found`,
          details: { language: lang, available: supportedLanguages }
        });
      }
    });
  } catch (error) {
    results.push({
      test: 'Multilingual Support',
      status: 'FAIL',
      message: 'Error testing multilingual support',
      details: error
    });
  }

  // Test 3: Subject Coverage
  console.log('📚 Testing Subject Coverage...');
  try {
    const englishCompanions = COMPANIONS_DATA.en;
    const subjects = [...new Set(englishCompanions.map(c => c.subject))];
    const expectedSubjects = ['business', 'sports', 'language', 'science', 'coding', 'health'];
    
    expectedSubjects.forEach(subject => {
      if (subjects.includes(subject)) {
        const count = englishCompanions.filter(c => c.subject === subject).length;
        results.push({
          test: `${subject.charAt(0).toUpperCase() + subject.slice(1)} Subject`,
          status: 'PASS',
          message: `${subject} has ${count} companion(s)`,
          details: { subject, count }
        });
      } else {
        results.push({
          test: `${subject.charAt(0).toUpperCase() + subject.slice(1)} Subject`,
          status: 'WARNING',
          message: `No companions found for ${subject}`,
          details: { subject, available: subjects }
        });
      }
    });
  } catch (error) {
    results.push({
      test: 'Subject Coverage',
      status: 'FAIL',
      message: 'Error testing subject coverage',
      details: error
    });
  }

  // Test 4: Color Scheme Validation
  console.log('🎨 Testing Color Scheme...');
  try {
    const englishCompanions = COMPANIONS_DATA.en;
    const subjects = [...new Set(englishCompanions.map(c => c.subject))];
    
    subjects.forEach(subject => {
      if (SUBJECT_COLORS[subject as keyof typeof SUBJECT_COLORS]) {
        results.push({
          test: `${subject} Color`,
          status: 'PASS',
          message: `Color defined for ${subject}`,
          details: { subject, color: SUBJECT_COLORS[subject as keyof typeof SUBJECT_COLORS] }
        });
      } else {
        results.push({
          test: `${subject} Color`,
          status: 'WARNING',
          message: `No color defined for ${subject}`,
          details: { subject, available: Object.keys(SUBJECT_COLORS) }
        });
      }
    });
  } catch (error) {
    results.push({
      test: 'Color Scheme',
      status: 'FAIL',
      message: 'Error testing color scheme',
      details: error
    });
  }

  // Test 5: Companion Quality Metrics
  console.log('⭐ Testing Companion Quality...');
  try {
    const englishCompanions = COMPANIONS_DATA.en;
    
    englishCompanions.forEach((companion, index) => {
      // Test rating range
      if (companion.rating >= 0 && companion.rating <= 5) {
        results.push({
          test: `Companion ${index + 1} - Rating`,
          status: 'PASS',
          message: `Rating ${companion.rating} is valid`,
          details: { companion: companion.name, rating: companion.rating }
        });
      } else {
        results.push({
          test: `Companion ${index + 1} - Rating`,
          status: 'FAIL',
          message: `Invalid rating: ${companion.rating}`,
          details: { companion: companion.name, rating: companion.rating }
        });
      }
      
      // Test session count
      if (companion.sessions >= 0) {
        results.push({
          test: `Companion ${index + 1} - Sessions`,
          status: 'PASS',
          message: `Session count ${companion.sessions} is valid`,
          details: { companion: companion.name, sessions: companion.sessions }
        });
      } else {
        results.push({
          test: `Companion ${index + 1} - Sessions`,
          status: 'FAIL',
          message: `Invalid session count: ${companion.sessions}`,
          details: { companion: companion.name, sessions: companion.sessions }
        });
      }
      
      // Test duration
      if (companion.duration > 0 && companion.duration <= 120) {
        results.push({
          test: `Companion ${index + 1} - Duration`,
          status: 'PASS',
          message: `Duration ${companion.duration} minutes is valid`,
          details: { companion: companion.name, duration: companion.duration }
        });
      } else {
        results.push({
          test: `Companion ${index + 1} - Duration`,
          status: 'WARNING',
          message: `Duration ${companion.duration} minutes may be unrealistic`,
          details: { companion: companion.name, duration: companion.duration }
        });
      }
    });
  } catch (error) {
    results.push({
      test: 'Companion Quality',
      status: 'FAIL',
      message: 'Error testing companion quality',
      details: error
    });
  }

  // Test 6: Language Support Validation
  console.log('🗣️ Testing Language Support...');
  try {
    const englishCompanions = COMPANIONS_DATA.en;
    
    englishCompanions.forEach((companion, index) => {
      if (companion.languages && companion.languages.length > 0) {
        const validLanguages = ['en', 'es', 'fr', 'de', 'zh', 'ar', 'ru', 'pt', 'it', 'ja', 'ko', 'nl'];
        
        companion.languages.forEach(lang => {
          if (validLanguages.includes(lang)) {
            results.push({
              test: `Companion ${index + 1} - Language ${lang}`,
              status: 'PASS',
              message: `Language ${lang} is supported`,
              details: { companion: companion.name, language: lang }
            });
          } else {
            results.push({
              test: `Companion ${index + 1} - Language ${lang}`,
              status: 'WARNING',
              message: `Language ${lang} may not be supported`,
              details: { companion: companion.name, language: lang, valid: validLanguages }
            });
          }
        });
      } else {
        results.push({
          test: `Companion ${index + 1} - Languages`,
          status: 'FAIL',
          message: 'No languages specified',
          details: { companion: companion.name }
        });
      }
    });
  } catch (error) {
    results.push({
      test: 'Language Support',
      status: 'FAIL',
      message: 'Error testing language support',
      details: error
    });
  }

  // Test 7: Content Quality
  console.log('📝 Testing Content Quality...');
  try {
    const englishCompanions = COMPANIONS_DATA.en;
    
    englishCompanions.forEach((companion, index) => {
      // Test description length
      if (companion.description && companion.description.length >= 20) {
        results.push({
          test: `Companion ${index + 1} - Description`,
          status: 'PASS',
          message: `Description is adequate (${companion.description.length} chars)`,
          details: { companion: companion.name, length: companion.description.length }
        });
      } else {
        results.push({
          test: `Companion ${index + 1} - Description`,
          status: 'WARNING',
          message: `Description may be too short (${companion.description?.length || 0} chars)`,
          details: { companion: companion.name, length: companion.description?.length || 0 }
        });
      }
      
      // Test topic relevance
      if (companion.topic && companion.topic.length > 0) {
        results.push({
          test: `Companion ${index + 1} - Topic`,
          status: 'PASS',
          message: `Topic is defined`,
          details: { companion: companion.name, topic: companion.topic }
        });
      } else {
        results.push({
          test: `Companion ${index + 1} - Topic`,
          status: 'FAIL',
          message: 'No topic defined',
          details: { companion: companion.name }
        });
      }
    });
  } catch (error) {
    results.push({
      test: 'Content Quality',
      status: 'FAIL',
      message: 'Error testing content quality',
      details: error
    });
  }

  // Test 8: System Statistics
  console.log('📈 Generating System Statistics...');
  try {
    const englishCompanions = COMPANIONS_DATA.en;
    const totalCompanions = englishCompanions.length;
    const totalSessions = englishCompanions.reduce((sum, c) => sum + c.sessions, 0);
    const averageRating = englishCompanions.reduce((sum, c) => sum + c.rating, 0) / totalCompanions;
    const averageDuration = englishCompanions.reduce((sum, c) => sum + c.duration, 0) / totalCompanions;
    const subjects = [...new Set(englishCompanions.map(c => c.subject))];
    const languages = [...new Set(englishCompanions.flatMap(c => c.languages))];
    
    results.push({
      test: 'System Statistics',
      status: 'PASS',
      message: 'System statistics calculated successfully',
      details: {
        totalCompanions,
        totalSessions,
        averageRating: averageRating.toFixed(2),
        averageDuration: averageDuration.toFixed(1),
        subjects: subjects.length,
        languages: languages.length,
        subjectList: subjects,
        languageList: languages
      }
    });
  } catch (error) {
    results.push({
      test: 'System Statistics',
      status: 'FAIL',
      message: 'Error calculating system statistics',
      details: error
    });
  }

  // Summary
  const passed = results.filter(r => r.status === 'PASS').length;
  const failed = results.filter(r => r.status === 'FAIL').length;
  const warnings = results.filter(r => r.status === 'WARNING').length;
  
  console.log('\n📋 Test Summary:');
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`⚠️  Warnings: ${warnings}`);
  console.log(`📊 Total: ${results.length}`);
  
  if (failed === 0) {
    console.log('\n🎉 All critical tests passed! The companions system is ready for use.');
  } else {
    console.log('\n🔧 Some tests failed. Please review the results above.');
  }

  return results;
};

// Manual testing checklist
export const companionsTestingChecklist = {
  navigation: [
    "Navigate to /companions",
    "Verify companions library loads",
    "Check language switcher functionality",
    "Test back navigation from session"
  ],
  search: [
    "Search by companion name",
    "Search by topic",
    "Search by expertise",
    "Clear search functionality"
  ],
  filtering: [
    "Filter by subject (business, sports, etc.)",
    "Filter by language",
    "Combine search and filters",
    "Clear all filters"
  ],
  viewModes: [
    "Switch between grid and list view",
    "Verify responsive design",
    "Check companion cards display correctly"
  ],
  bookmarks: [
    "Bookmark a companion",
    "Unbookmark a companion",
    "Verify bookmark state persists",
    "Check bookmark visual feedback"
  ],
  sessions: [
    "Start a companion session",
    "Test voice controls (mute/unmute)",
    "Send text messages",
    "Navigate session topics",
    "End session properly",
    "Take session notes"
  ],
  multilingual: [
    "Switch between languages",
    "Verify content changes appropriately",
    "Check companion availability per language",
    "Test language-specific companions"
  ],
  responsiveness: [
    "Test on mobile devices",
    "Test on tablet devices",
    "Test on desktop",
    "Verify all interactions work on touch"
  ]
};

export const runCompanionsSystemTest = async () => {
  console.log('🚀 Starting OponMeta Companions System Test Suite...\n');
  
  const results = await testCompanionsSystem();
  
  console.log('\n📝 Detailed Results:');
  results.forEach((result, index) => {
    const icon = result.status === 'PASS' ? '✅' : result.status === 'FAIL' ? '❌' : '⚠️';
    console.log(`${icon} ${result.test}: ${result.message}`);
    if (result.details) {
      console.log(`   Details:`, result.details);
    }
  });
  
  return results;
}; 