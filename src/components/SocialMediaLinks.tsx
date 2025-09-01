import React from 'react';
import { 
  Linkedin, 
  Youtube, 
  Twitter, 
  Instagram, 
  Facebook, 
  MessageCircle, 
  Slack, 
  Music
} from 'lucide-react';

interface SocialMediaLinksProps {
  variant?: 'default' | 'minimal' | 'footer';
  showLabels?: boolean;
  className?: string;
}

const SocialMediaLinks: React.FC<SocialMediaLinksProps> = ({ 
  variant = 'default', 
  showLabels = false,
  className = ''
}) => {
  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/company/oponmeta',
      icon: Linkedin,
      color: 'text-blue-600 hover:text-blue-700',
      bgColor: 'bg-blue-50 hover:bg-blue-100'
    },
    {
      name: 'YouTube',
      url: '#',
      icon: Youtube,
      color: 'text-red-600 hover:text-red-700',
      bgColor: 'bg-red-50 hover:bg-red-100'
    },
    {
      name: 'X (Twitter)',
      url: 'https://x.com/oponmeta',
      icon: Twitter,
      color: 'text-gray-900 hover:text-gray-700',
      bgColor: 'bg-gray-50 hover:bg-gray-100'
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/oponmeta',
      icon: Instagram,
      color: 'text-pink-600 hover:text-pink-700',
      bgColor: 'bg-pink-50 hover:bg-pink-100'
    },
    {
      name: 'Facebook',
      url: 'https://facebook.com/oponmeta',
      icon: Facebook,
      color: 'text-blue-600 hover:text-blue-700',
      bgColor: 'bg-blue-50 hover:bg-blue-100'
    },
    {
      name: 'WhatsApp',
      url: 'https://wa.me/your-business-number',
      icon: MessageCircle,
      color: 'text-green-600 hover:text-green-700',
      bgColor: 'bg-green-50 hover:bg-green-100'
    },
    {
      name: 'Slack',
      url: 'https://oponmeta.slack.com',
      icon: Slack,
      color: 'text-purple-600 hover:text-purple-700',
      bgColor: 'bg-purple-50 hover:bg-purple-100'
    },
    {
      name: 'TikTok',
      url: 'https://tiktok.com/@oponmeta',
      icon: Music,
      color: 'text-black hover:text-gray-700',
      bgColor: 'bg-gray-50 hover:bg-gray-100'
    }
  ];

  const handleClick = (url: string, platform: string) => {
    // Track social media clicks
    console.log(`Social media click: ${platform}`);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (variant === 'minimal') {
    return (
      <div className={`flex space-x-4 ${className}`}>
        {socialLinks.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${social.color} transition-colors duration-200`}
            onClick={() => handleClick(social.url, social.name)}
          >
            <social.icon className="w-5 h-5" />
          </a>
        ))}
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`grid grid-cols-4 gap-4 ${className}`}>
        {socialLinks.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center space-x-2 p-2 rounded-lg ${social.bgColor} transition-colors duration-200`}
            onClick={() => handleClick(social.url, social.name)}
          >
            <social.icon className={`w-4 h-4 ${social.color}`} />
            {showLabels && (
              <span className="text-sm font-medium text-gray-700">{social.name}</span>
            )}
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`}>
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center space-x-3 p-4 rounded-lg ${social.bgColor} transition-all duration-200 hover:shadow-md`}
          onClick={() => handleClick(social.url, social.name)}
        >
          <social.icon className={`w-6 h-6 ${social.color}`} />
          <div>
            <span className="font-medium text-gray-900">{social.name}</span>
            {showLabels && (
              <p className="text-sm text-gray-600">Follow us on {social.name}</p>
            )}
          </div>
        </a>
      ))}
    </div>
  );
};

export default SocialMediaLinks; 