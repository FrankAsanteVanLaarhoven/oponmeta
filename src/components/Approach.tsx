import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Lightbulb, Users, Globe, Target, Zap, Heart } from 'lucide-react';

const Approach = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-blue-900 to-purple-900">
      <div className="max-w-6xl mx-auto px-4 py-16">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Lightbulb className="w-12 h-12 text-yellow-400" />
            <h1 className="text-5xl font-bold text-white">Our Approach</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            We combine innovative technology, expert instruction, and personalised learning 
            to create transformative educational experiences that empower learners worldwide.
          </p>
        </div>

        {/* Approach Overview */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-12">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">How We Work</h2>
            <p className="text-lg text-blue-100 leading-relaxed text-center max-w-4xl mx-auto">
              Our approach is built on three core pillars: technology-driven innovation, 
              human-centred design, and global collaboration. We believe that the best 
              learning experiences come from combining cutting-edge tools with proven 
              educational methodologies and real-world applications.
            </p>
          </CardContent>
        </Card>

        {/* Core Approach Elements */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Zap className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Technology-First</h3>
              <p className="text-blue-100">
                Leveraging AI, VR, and cutting-edge platforms to create immersive, 
                adaptive learning experiences that scale globally.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Users className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Human-Centred</h3>
              <p className="text-blue-100">
                Putting learners at the centre of every decision, with personalised 
                experiences that adapt to individual needs and learning styles.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Globe className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Global Collaboration</h3>
              <p className="text-blue-100">
                Building partnerships with experts, institutions, and organisations 
                worldwide to deliver the best possible learning content.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Target className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Outcome-Focused</h3>
              <p className="text-blue-100">
                Designing learning experiences that lead to measurable results, 
                career advancement, and real-world skill application.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Heart className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Inclusive Design</h3>
              <p className="text-blue-100">
                Creating learning environments that welcome and support diverse 
                learners with different backgrounds and abilities.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Lightbulb className="w-12 h-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Continuous Innovation</h3>
              <p className="text-blue-100">
                Constantly evolving our methods and technologies to stay ahead 
                of educational trends and learner needs.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Experience Our Approach</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Ready to experience our innovative approach to learning? 
            Start your journey with us today and discover the difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-yellow-400 text-gray-900 hover:bg-yellow-500">
              Start Learning
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Approach;
