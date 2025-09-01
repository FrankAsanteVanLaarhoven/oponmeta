import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';

interface MobileState {
  isOnline: boolean;
  orientation: 'portrait' | 'landscape';
  touchSupported: boolean;
  screenSize: 'mobile' | 'tablet' | 'desktop';
  viewport: {
    width: number;
    height: number;
    devicePixelRatio: number;
  };
  isStandalone: boolean;
  isLowPowerMode: boolean;
  connectionType: 'slow-2g' | '2g' | '3g' | '4g' | '5g' | 'wifi' | 'unknown';
}

interface MobileActions {
  setOrientation: (orientation: 'portrait' | 'landscape') => void;
  setOnlineStatus: (status: boolean) => void;
  setScreenSize: (size: 'mobile' | 'tablet' | 'desktop') => void;
}

const MobileStateContext = createContext<MobileState | undefined>(undefined);
const MobileActionsContext = createContext<MobileActions | undefined>(undefined);

// Utility function to determine screen size
const getScreenSize = (width: number): 'mobile' | 'tablet' | 'desktop' => {
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

// Utility function to get connection type
const getConnectionType = (): 'slow-2g' | '2g' | '3g' | '4g' | '5g' | 'wifi' | 'unknown' => {
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    if (connection) {
      return connection.effectiveType || 'unknown';
    }
  }
  return 'unknown';
};

interface MobileProviderProps {
  children: ReactNode;
}

export const MobileProvider: React.FC<MobileProviderProps> = ({ children }) => {
  const [state, setState] = useState<MobileState>({
    isOnline: navigator.onLine,
    orientation: window.innerHeight > window.innerWidth ? 'portrait' : 'landscape',
    touchSupported: 'ontouchstart' in window,
    screenSize: getScreenSize(window.innerWidth),
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
      devicePixelRatio: window.devicePixelRatio
    },
    isStandalone: (window.navigator as any).standalone || 
      window.matchMedia('(display-mode: standalone)').matches,
    isLowPowerMode: false, // Will be updated if supported
    connectionType: getConnectionType()
  });

  const actions = useMemo<MobileActions>(() => ({
    setOrientation: (orientation) => 
      setState(prev => ({ ...prev, orientation })),
    setOnlineStatus: (isOnline) => 
      setState(prev => ({ ...prev, isOnline })),
    setScreenSize: (screenSize) => 
      setState(prev => ({ ...prev, screenSize }))
  }), []);

  // Listen to orientation and online status changes
  useEffect(() => {
    const handleOrientationChange = () => {
      const newOrientation = window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
      actions.setOrientation(newOrientation);
    };

    const handleResize = () => {
      const newScreenSize = getScreenSize(window.innerWidth);
      setState(prev => ({
        ...prev,
        screenSize: newScreenSize,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight,
          devicePixelRatio: window.devicePixelRatio
        }
      }));
    };

    const handleOnlineStatus = () => {
      actions.setOnlineStatus(navigator.onLine);
    };

    const handleConnectionChange = () => {
      setState(prev => ({
        ...prev,
        connectionType: getConnectionType()
      }));
    };

    // Check for low power mode (iOS only)
    const checkLowPowerMode = () => {
      if ('getBattery' in navigator) {
        (navigator as any).getBattery().then((battery: any) => {
          setState(prev => ({
            ...prev,
            isLowPowerMode: battery.level < 0.2
          }));
        });
      }
    };

    // Event listeners
    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleResize);
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);
    
    // Connection change events
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      if (connection) {
        connection.addEventListener('change', handleConnectionChange);
      }
    }

    // Check low power mode periodically
    const lowPowerInterval = setInterval(checkLowPowerMode, 30000);
    checkLowPowerMode(); // Initial check

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
      
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        if (connection) {
          connection.removeEventListener('change', handleConnectionChange);
        }
      }
      
      clearInterval(lowPowerInterval);
    };
  }, [actions]);

  return (
    <MobileStateContext.Provider value={state}>
      <MobileActionsContext.Provider value={actions}>
        {children}
      </MobileActionsContext.Provider>
    </MobileStateContext.Provider>
  );
};

// Custom hooks to use the mobile context
export const useMobileState = (): MobileState => {
  const context = useContext(MobileStateContext);
  if (context === undefined) {
    throw new Error('useMobileState must be used within a MobileProvider');
  }
  return context;
};

export const useMobileActions = (): MobileActions => {
  const context = useContext(MobileActionsContext);
  if (context === undefined) {
    throw new Error('useMobileActions must be used within a MobileProvider');
  }
  return context;
};

// Convenience hooks for specific mobile states
export const useIsMobile = (): boolean => {
  const { screenSize } = useMobileState();
  return screenSize === 'mobile';
};

export const useIsTablet = (): boolean => {
  const { screenSize } = useMobileState();
  return screenSize === 'tablet';
};

export const useIsDesktop = (): boolean => {
  const { screenSize } = useMobileState();
  return screenSize === 'desktop';
};

export const useIsPortrait = (): boolean => {
  const { orientation } = useMobileState();
  return orientation === 'portrait';
};

export const useIsOnline = (): boolean => {
  const { isOnline } = useMobileState();
  return isOnline;
};

export const useIsTouchDevice = (): boolean => {
  const { touchSupported } = useMobileState();
  return touchSupported;
};

export const useConnectionType = (): string => {
  const { connectionType } = useMobileState();
  return connectionType;
};

export const useIsLowPowerMode = (): boolean => {
  const { isLowPowerMode } = useMobileState();
  return isLowPowerMode;
};
