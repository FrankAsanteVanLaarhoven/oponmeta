import React, { useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const SuccessStoriesCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    dragFree: true,
    containScroll: 'trimSnaps',
    slidesToScroll: 1,
    align: 'start'
  });

  const { t } = useTranslation();

  // Auto-scroll functionality
  useEffect(() => {
    if (!emblaApi) return;

    const autoScroll = setInterval(() => {
      emblaApi.scrollNext();
    }, 4000); // Scroll every 4 seconds

    return () => clearInterval(autoScroll);
  }, [emblaApi]);

  const successStories = [
    {
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
      alt: "Corporate building",
      title: "Acer advances workforce skills with innovative learning",
      description: "A global technology leader enhanced professional growth through our platform."
    },
    {
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2",
      alt: "Healthcare professionals",
      title: "CDPH expands training for volunteers and residents globally",
      description: "A leading healthcare organization improved learning for thousands worldwide."
    },
    {
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c",
      alt: "Modern office building",
      title: "Thermo Fisher Scientific boosts global employee development",
      description: "A science innovator accelerated workforce growth with digital learning."
    },
    {
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43",
      alt: "Training session",
      title: "Microsoft increases productivity with structured learning",
      description: "A technology leader elevated global team performance using our solutions."
    },
    {
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978",
      alt: "Team collaboration",
      title: "Salesforce accelerates growth across continents",
      description: "A CRM leader boosted engagement with personalised learning journeys."
    },
    {
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      alt: "Business meeting",
      title: "IBM transforms learning with AI-powered insights",
      description: "A global technology company revolutionized training with intelligent analytics."
    }
  ];

  return (
    <section className="py-20 px-4 bg-white text-[#0a1834] dark:bg-[#0a1834] dark:text-white">
      <div className="max-w-7xl mx-auto">
         <div className="text-center mb-16">
           <h2 className="text-5xl font-bold mb-4 drop-shadow-2xl text-[#0a1834] dark:text-white">Global Success Stories: Real Impact, Real Learners</h2>
         </div>
        
        <div className="overflow-hidden mb-12" ref={emblaRef}>
          <div className="flex gap-8">
            {/* Duplicate the stories array for seamless loop */}
            {[...successStories, ...successStories].map((story, index) => (
              <div key={index} className="flex-none w-80">
                <Card className="bg-white dark:bg-[#16203a] border-[#22305a] hover:bg-[#f0f4fa] dark:hover:bg-[#22305a] transition-all duration-300 hover:scale-105 relative overflow-hidden">
                  <CardContent className="p-6 relative z-10">
                    <img 
                      src={story.image}
                      alt={story.alt}
                      className="w-full h-48 object-cover rounded-lg mb-4 border-2 border-[#11204a]"
                      loading="lazy"
                    />
                     <h3 className="text-xl font-bold mb-3 drop-shadow-lg text-[#0a1834] dark:text-white">
                       {story.title}
                     </h3>
                     <p className="font-bold drop-shadow-md text-cyan-700 dark:text-cyan-300">
                       {story.description}
                     </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-cyan-600 text-white hover:bg-cyan-700">
              Share Your Experience
            </Button>
            <Button size="lg" variant="outline" className="border-cyan-600 dark:border-cyan-300 text-cyan-600 dark:text-cyan-300 hover:bg-[#f0f4fa] dark:hover:bg-[#11204a]">
              Discover More Case Studies
              <ChevronRight className="ml-2 h-5 w-5 text-cyan-600 dark:text-cyan-300" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStoriesCarousel;