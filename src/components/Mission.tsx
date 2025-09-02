import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Target, Globe, Users, Heart, Star, Award } from 'lucide-react';

const Mission = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900">
      <div className="max-w-6xl mx-auto px-4 py-16">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Target className="w-12 h-12 text-yellow-400" />
            <h1 className="text-5xl font-bold text-white">Our Mission</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            To democratize access to world-class education and empower learners globally with cutting-edge skills, 
            innovative technology, and transformative learning experiences.
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-12">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Mission Statement</h2>
            <p className="text-lg text-blue-100 leading-relaxed text-center max-w-4xl mx-auto">
              At OponMeta, we believe that quality education should be accessible to everyone, everywhere. 
              Our mission is to break down barriers to learning by providing innovative, technology-driven 
              educational solutions that adapt to individual needs and learning styles.
            </p>
          </CardContent>
        </Card>

        {/* Core Values */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Globe className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Global Accessibility</h3>
              <p className="text-blue-100">
                Making world-class education available to learners across all continents, 
                regardless of geographical or economic barriers.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Users className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Inclusive Learning</h3>
              <p className="text-blue-100">
                Creating learning environments that welcome and support diverse learners 
                with different backgrounds, abilities, and learning preferences.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Heart className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Student-Centered</h3>
              <p className="text-blue-100">
                Putting learners at the heart of everything we do, with personalised 
                experiences that adapt to individual needs and goals.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Star className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Excellence</h3>
              <p className="text-blue-100">
                Maintaining the highest standards of educational quality, content, 
                and delivery across all our programmes and platforms.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Award className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Innovation</h3>
              <p className="text-blue-100">
                Continuously pushing the boundaries of educational technology to 
                create more effective and engaging learning experiences.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Target className="w-12 h-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Impact</h3>
              <p className="text-blue-100">
                Measuring our success by the positive impact we create in learners' 
                lives, careers, and communities worldwide.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Join Us in Our Mission</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Whether you're a learner seeking to expand your skills, an instructor wanting to share knowledge, 
            or a partner looking to make a difference, we invite you to be part of our mission.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-yellow-400 text-gray-900 hover:bg-yellow-500">
              Start Learning
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Become an Instructor
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mission;
