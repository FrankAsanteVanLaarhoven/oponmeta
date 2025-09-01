import React, { useEffect, useState } from 'react';
import { useAuth, useCourses, useCategories, useCoupons, useFileUpload } from '../hooks/useSupabase';
import type { Course, Category, Coupon } from '../lib/database.types';

// Example component showing how to integrate Supabase with existing components
const SupabaseIntegrationExample: React.FC = () => {
  const { user, loading: authLoading, signIn, signOut } = useAuth();
  const { courses, loading: coursesLoading, fetchCourses, createCourse } = useCourses();
  const { categories, loading: categoriesLoading, fetchCategories } = useCategories();
  const { coupons, loading: couponsLoading, fetchCoupons, createCoupon } = useCoupons();
  const { uploadFile, uploading, getPublicUrl } = useFileUpload();

  const [showCreateCourse, setShowCreateCourse] = useState(false);
  const [showCreateCoupon, setShowCreateCoupon] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    price: 0,
    category_id: '',
    level: 'beginner' as const
  });
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    type: 'percentage' as const,
    value: 0,
    usage_limit: 100
  });

  useEffect(() => {
    if (user) {
      fetchCourses();
      fetchCategories();
      fetchCoupons();
    }
  }, [user]);

  const handleSignIn = async () => {
    try {
      await signIn('test@example.com', 'password123');
    } catch (error) {
      console.error('Sign in failed:', error);
    }
  };

  const handleCreateCourse = async () => {
    try {
      await createCourse({
        ...newCourse,
        slug: newCourse.title.toLowerCase().replace(/\s+/g, '-'),
        currency: 'USD',
        duration: 0,
        lessons_count: 0,
        students_count: 0,
        rating: 0,
        reviews_count: 0,
        status: 'draft',
        visibility: 'public',
        is_featured: false,
        has_certificate: false,
        language: 'en',
        current_enrollments: 0,
        is_active: true
      });
      setShowCreateCourse(false);
      setNewCourse({ title: '', description: '', price: 0, category_id: '', level: 'beginner' });
    } catch (error) {
      console.error('Create course failed:', error);
    }
  };

  const handleCreateCoupon = async () => {
    try {
      await createCoupon({
        ...newCoupon,
        currency: 'USD',
        valid_from: new Date().toISOString(),
        valid_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
        is_active: true,
        used_count: 0,
        priority: 'normal',
        auto_apply: false,
        first_time_only: false
      });
      setShowCreateCoupon(false);
      setNewCoupon({ code: '', type: 'percentage', value: 0, usage_limit: 100 });
    } catch (error) {
      console.error('Create coupon failed:', error);
    }
  };

  const handleFileUpload = async (file: File) => {
    try {
      const path = `course-images/${Date.now()}-${file.name}`;
      await uploadFile(file, 'course-images', path);
      const publicUrl = getPublicUrl('course-images', path);
      console.log('File uploaded:', publicUrl);
    } catch (error) {
      console.error('File upload failed:', error);
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Supabase Integration Example
        </h1>

        {/* Authentication Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Authentication</h2>
          {user ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800">
                <strong>Signed in as:</strong> {user.email}
              </p>
              <p className="text-green-700 text-sm mt-1">
                Role: {user.role} | Verified: {user.is_verified ? 'Yes' : 'No'}
              </p>
              <button
                onClick={signOut}
                className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 mb-3">Not signed in</p>
              <button
                onClick={handleSignIn}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Sign In (Test Account)
              </button>
            </div>
          )}
        </div>

        {user && (
          <>
            {/* Categories Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Categories</h2>
              {categoriesLoading ? (
                <div className="text-gray-600">Loading categories...</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categories.map((category) => (
                    <div key={category.id} className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-800">{category.name}</h3>
                      <p className="text-gray-600 text-sm">{category.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Courses Section */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">Courses</h2>
                <button
                  onClick={() => setShowCreateCourse(true)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Create Course
                </button>
              </div>
              
              {coursesLoading ? (
                <div className="text-gray-600">Loading courses...</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {courses.map((course) => (
                    <div key={course.id} className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-800">{course.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{course.description}</p>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-green-600 font-semibold">${course.price}</span>
                        <span className="text-gray-500">{course.level}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Coupons Section */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">Coupons</h2>
                <button
                  onClick={() => setShowCreateCoupon(true)}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Create Coupon
                </button>
              </div>
              
              {couponsLoading ? (
                <div className="text-gray-600">Loading coupons...</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {coupons.map((coupon) => (
                    <div key={coupon.id} className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-800">{coupon.code}</h3>
                      <p className="text-gray-600 text-sm mb-2">{coupon.description}</p>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-purple-600 font-semibold">
                          {coupon.type === 'percentage' ? `${coupon.value}%` : `$${coupon.value}`}
                        </span>
                        <span className="text-gray-500">
                          {coupon.used_count}/{coupon.usage_limit}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* File Upload Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">File Upload</h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file);
                  }}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {uploading && (
                  <div className="mt-2 text-blue-600">Uploading...</div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Create Course Modal */}
        {showCreateCourse && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-semibold mb-4">Create New Course</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Course Title"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                <textarea
                  placeholder="Description"
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  rows={3}
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={newCourse.price}
                  onChange={(e) => setNewCourse({ ...newCourse, price: Number(e.target.value) })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                <select
                  value={newCourse.category_id}
                  onChange={(e) => setNewCourse({ ...newCourse, category_id: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <select
                  value={newCourse.level}
                  onChange={(e) => setNewCourse({ ...newCourse, level: e.target.value as any })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2 mt-6">
                <button
                  onClick={() => setShowCreateCourse(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateCourse}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Create Coupon Modal */}
        {showCreateCoupon && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-semibold mb-4">Create New Coupon</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Coupon Code"
                  value={newCoupon.code}
                  onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                <select
                  value={newCoupon.type}
                  onChange={(e) => setNewCoupon({ ...newCoupon, type: e.target.value as any })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed Amount</option>
                </select>
                <input
                  type="number"
                  placeholder="Value"
                  value={newCoupon.value}
                  onChange={(e) => setNewCoupon({ ...newCoupon, value: Number(e.target.value) })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="number"
                  placeholder="Usage Limit"
                  value={newCoupon.usage_limit}
                  onChange={(e) => setNewCoupon({ ...newCoupon, usage_limit: Number(e.target.value) })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex justify-end space-x-2 mt-6">
                <button
                  onClick={() => setShowCreateCoupon(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateCoupon}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupabaseIntegrationExample;
