import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Eye, Globe, Users, Zap, Target, Star } from 'lucide-react';

const Vision = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="max-w-6xl mx-auto px-4 py-16">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Eye className="w-12 h-12 text-yellow-400" />
            <h1 className="text-5xl font-bold text-white">Our Vision</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            To become the world's leading platform for transformative education, 
            connecting millions of learners with cutting-edge knowledge and skills for the future.
          </p>
        </div>

        {/* Vision Statement */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-12">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Vision Statement</h2>
            <p className="text-lg text-blue-100 leading-relaxed text-center max-w-4xl mx-auto">
              We envision a world where quality education is universally accessible, personalised, and transformative. 
              Through innovative technology and global collaboration, we're building the future of learning—one that 
              empowers every individual to reach their full potential and contribute to a better world.
            </p>
          </CardContent>
        </Card>

        {/* Future Goals */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Globe className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Global Reach</h3>
              <p className="text-blue-100">
                Connect with learners in every corner of the world, breaking down barriers 
                of geography, language, and economic status.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Users className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Community Building</h3>
              <p className="text-blue-100">
                Foster vibrant learning communities where knowledge sharing, mentorship, 
                and collaboration thrive across cultures and disciplines.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Innovation Hub</h3>
              <p className="text-blue-100">
                Lead the evolution of educational technology with AI, VR, and 
                cutting-edge learning methodologies.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Target className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Skill Development</h3>
              <p className="text-blue-100">
                Equip learners with future-ready skills that drive personal growth, 
                career advancement, and societal progress.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Star className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Excellence</h3>
              <p className="text-blue-100">
                Maintain the highest standards of educational quality and continuously 
                improve our platform and content offerings.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Eye className="w-12 h-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Future Ready</h3>
              <p className="text-blue-100">
                Prepare learners for the challenges and opportunities of tomorrow's 
                rapidly evolving world and job market.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Be Part of Our Vision</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Join us in shaping the future of education. Whether you're learning, teaching, 
            or partnering with us, you're helping to build a better world through knowledge.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-yellow-400 text-gray-900 hover:bg-yellow-500">
              Explore Our Platform
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Partner With Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vision;
