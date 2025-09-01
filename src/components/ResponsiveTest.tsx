import React from 'react';

const ResponsiveTest = () => {
  const [viewportSize, setViewportSize] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  React.useEffect(() => {
    const handleResize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getBreakpoint = () => {
    if (viewportSize.width < 375) return 'xs';
    if (viewportSize.width < 480) return 'sm';
    if (viewportSize.width < 640) return 'md';
    if (viewportSize.width < 768) return 'lg';
    if (viewportSize.width < 1024) return 'xl';
    if (viewportSize.width < 1280) return '2xl';
    return '3xl';
  };

  const breakpoint = getBreakpoint();

  return (
    <div className="fixed top-4 right-4 bg-black/80 text-white p-3 rounded-lg text-sm z-50 font-mono">
      <div className="space-y-1">
        <div>Viewport: {viewportSize.width} × {viewportSize.height}</div>
        <div>Breakpoint: {breakpoint}</div>
        <div className="text-xs opacity-75">
          {breakpoint === 'xs' && 'Extra Small (< 375px)'}
          {breakpoint === 'sm' && 'Small (375px - 479px)'}
          {breakpoint === 'md' && 'Medium (480px - 639px)'}
          {breakpoint === 'lg' && 'Large (640px - 767px)'}
          {breakpoint === 'xl' && 'Extra Large (768px - 1023px)'}
          {breakpoint === '2xl' && '2XL (1024px - 1279px)'}
          {breakpoint === '3xl' && '3XL (≥ 1280px)'}
        </div>
      </div>
    </div>
  );
};

export default ResponsiveTest; 