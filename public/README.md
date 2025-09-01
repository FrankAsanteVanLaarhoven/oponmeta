# Public Assets Directory

This directory contains all the static assets for the OponMeta application.

## Directory Structure

```
public/
├── branding/           # Brand assets and logos
│   ├── logo.png       # Main application logo
│   ├── logo.svg       # Vector version of logo
│   ├── new-logo.png   # Updated logo version
│   └── oponmeta-logo.png # OponMeta specific logo
├── videos/            # Video assets
│   ├── Quick Avatar Video.mp4  # Avatar demonstration video
│   └── OPONMETA .mp4          # Main promotional video
├── audio/             # Audio assets
│   └── notification-sound.mp3  # Notification sound
├── icons/             # Icon assets
├── images/            # Image assets
├── documents/         # Document assets
├── favicon.ico        # Browser favicon
├── manifest.json      # PWA manifest
├── robots.txt         # Search engine robots file
├── sitemap.xml        # Site map for SEO
└── placeholder.svg    # Placeholder image
```

## Asset Guidelines

### Images
- Use WebP format when possible for better compression
- Optimize images before adding to this directory
- Maintain consistent naming conventions
- Include alt text descriptions in code

### Videos
- Use MP4 format for maximum compatibility
- Compress videos to reasonable file sizes
- Consider providing multiple quality versions

### Audio
- Use MP3 format for maximum compatibility
- Keep file sizes small for web delivery
- Test audio quality across different devices

### Icons
- Use SVG format when possible for scalability
- Maintain consistent design language
- Include both filled and outlined versions

## Brand Assets

### Logo Usage
- Primary logo: `branding/logo.png`
- Vector version: `branding/logo.svg`
- Use appropriate size for context
- Maintain aspect ratio when scaling

### Color Palette
- Primary: #0a174e (Dark Blue)
- Secondary: #1a2a6b (Medium Blue)
- Accent: #FFD700 (Gold)
- Success: #10B981 (Green)
- Warning: #F59E0B (Orange)
- Error: #EF4444 (Red)
- Info: #3B82F6 (Blue)

## SEO Assets

### robots.txt
- Configured for search engine crawling
- Allows all user agents
- Points to sitemap location

### sitemap.xml
- Automatically generated
- Includes all public pages
- Updated regularly

### manifest.json
- PWA configuration
- App metadata
- Icon definitions

## Performance Considerations

1. **File Size**: Keep assets under 1MB when possible
2. **Compression**: Use appropriate compression for each file type
3. **Caching**: Set appropriate cache headers
4. **CDN**: Consider using a CDN for production
5. **Lazy Loading**: Implement lazy loading for images and videos

## Development Workflow

1. **Add Assets**: Place new assets in appropriate subdirectory
2. **Optimize**: Compress and optimize before committing
3. **Update README**: Document new assets here
4. **Test**: Verify assets load correctly in development
5. **Deploy**: Assets are automatically deployed with the application

## Maintenance

- Regularly review and clean up unused assets
- Update assets when brand guidelines change
- Monitor file sizes and performance impact
- Keep documentation up to date
