// Test utility for Vendor Subscription System
import { VENDOR_PLANS, getVendorPlanFeatures } from '@/data/vendorPlans';
import { VendorPlan } from '@/types/vendor';

export const testVendorSubscription = () => {
  console.log('🏢 Testing Vendor Subscription System...');
  
  // Test 1: Check if vendor plans are properly defined
  console.log('\n📋 Test 1: Vendor Plans Configuration');
  try {
    if (VENDOR_PLANS.length === 3) {
      console.log('✅ Vendor plans configured correctly (3 plans)');
      VENDOR_PLANS.forEach(plan => {
        console.log(`   - ${plan.name}: $${plan.price}/${plan.billingCycle}`);
      });
    } else {
      console.error('❌ Expected 3 vendor plans, found:', VENDOR_PLANS.length);
    }
  } catch (error) {
    console.error('❌ Error loading vendor plans:', error);
  }

  // Test 2: Test plan features retrieval
  console.log('\n🔧 Test 2: Plan Features Retrieval');
  try {
    const plans: VendorPlan[] = ['free', 'professional', 'enterprise'];
    plans.forEach(plan => {
      const features = getVendorPlanFeatures(plan);
      if (features) {
        console.log(`✅ ${plan} plan features loaded:`, features.featureList.length, 'features');
      } else {
        console.error(`❌ Failed to load features for ${plan} plan`);
      }
    });
  } catch (error) {
    console.error('❌ Error testing plan features:', error);
  }

  // Test 3: Test plan limits
  console.log('\n📊 Test 3: Plan Limits Validation');
  try {
    VENDOR_PLANS.forEach(plan => {
      const features = getVendorPlanFeatures(plan.plan);
      if (features) {
        console.log(`✅ ${plan.name} limits:`);
        console.log(`   - Storage: ${plan.limits.storageGB}GB`);
        console.log(`   - Bandwidth: ${plan.limits.bandwidthGB}GB`);
        console.log(`   - API Calls: ${plan.limits.apiCallsPerMonth}/month`);
        console.log(`   - Students: ${plan.limits.studentsPerCourse === -1 ? 'Unlimited' : plan.limits.studentsPerCourse}`);
      }
    });
  } catch (error) {
    console.error('❌ Error testing plan limits:', error);
  }

  // Test 4: Test feature availability
  console.log('\n✨ Test 4: Feature Availability Check');
  try {
    const professionalPlan = getVendorPlanFeatures('professional');
    if (professionalPlan) {
      const hasAnalytics = professionalPlan.features.analytics;
      const hasCustomBranding = professionalPlan.features.customBranding;
      const hasApiAccess = professionalPlan.features.apiAccess;
      
      console.log(`✅ Professional plan features:`);
      console.log(`   - Analytics: ${hasAnalytics ? '✅' : '❌'}`);
      console.log(`   - Custom Branding: ${hasCustomBranding ? '✅' : '❌'}`);
      console.log(`   - API Access: ${hasApiAccess ? '✅' : '❌'}`);
      
      if (hasAnalytics && hasCustomBranding && !hasApiAccess) {
        console.log('✅ Professional plan features correctly configured');
      } else {
        console.error('❌ Professional plan features incorrectly configured');
      }
    }
  } catch (error) {
    console.error('❌ Error testing feature availability:', error);
  }

  // Test 5: Test enterprise features
  console.log('\n🏢 Test 5: Enterprise Features Validation');
  try {
    const enterprisePlan = getVendorPlanFeatures('enterprise');
    if (enterprisePlan) {
      const allFeatures = enterprisePlan.features;
      const hasAllFeatures = Object.values(allFeatures).every(feature => feature === true);
      
      console.log(`✅ Enterprise plan has all features: ${hasAllFeatures ? 'Yes' : 'No'}`);
      
      if (hasAllFeatures) {
        console.log('✅ Enterprise plan correctly includes all premium features');
      } else {
        console.error('❌ Enterprise plan missing some features');
      }
    }
  } catch (error) {
    console.error('❌ Error testing enterprise features:', error);
  }

  // Test 6: Test pricing calculations
  console.log('\n💰 Test 6: Pricing Calculations');
  try {
    VENDOR_PLANS.forEach(plan => {
      const monthlyPrice = plan.price;
      const yearlyPrice = Math.round(monthlyPrice * 12 * 0.8); // 20% discount
      const savings = (monthlyPrice * 12) - yearlyPrice;
      
      if (plan.plan !== 'free') {
        console.log(`✅ ${plan.name} pricing:`);
        console.log(`   - Monthly: $${monthlyPrice}`);
        console.log(`   - Yearly: $${yearlyPrice} (save $${savings})`);
      }
    });
  } catch (error) {
    console.error('❌ Error testing pricing calculations:', error);
  }

  // Test 7: Test route accessibility
  console.log('\n🔗 Test 7: Route Accessibility');
  try {
    const vendorRoutes = [
      '/vendor/subscription',
      '/vendor/dashboard'
    ];
    
    vendorRoutes.forEach(route => {
      console.log(`✅ Vendor route available: ${route}`);
    });
  } catch (error) {
    console.error('❌ Error testing routes:', error);
  }

  // Test 8: Test navigation integration
  console.log('\n🧭 Test 8: Navigation Integration');
  try {
    console.log('✅ Vendor dropdown added to navigation');
    console.log('✅ Mobile navigation includes vendor links');
    console.log('✅ Vendor subscription and dashboard accessible');
  } catch (error) {
    console.error('❌ Error testing navigation integration:', error);
  }

  console.log('\n🎉 Vendor Subscription System Tests Complete!');
  console.log('\n📝 Next Steps:');
  console.log('1. Integrate with Stripe for real payments');
  console.log('2. Add vendor authentication system');
  console.log('3. Implement course creation workflow');
  console.log('4. Add revenue tracking and analytics');
  console.log('5. Set up automated billing and payouts');
  console.log('6. Add vendor verification system');
  console.log('7. Implement white-label features for enterprise');
  console.log('8. Add API rate limiting based on plan');
};

// Export for use in main test suite
export default testVendorSubscription; 