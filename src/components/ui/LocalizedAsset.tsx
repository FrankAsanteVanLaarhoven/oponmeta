import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { languageContentManager, LocalizedAsset as LocalizedAssetType } from '../../utils/languageContentManager';
import { ResponsiveImage } from './ResponsiveImage';

interface LocalizedAssetProps {
  assetId: string;
  language?: string;
  region?: string;
  className?: string;
  fallbackUrl?: string;
  fallbackAlt?: string;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: (error: Error) => void;
  showCaption?: boolean;
  captionClassName?: string;
  imageProps?: React.ComponentProps<typeof ResponsiveImage>;
}

interface LocalizedVideoProps {
  assetId: string;
  language?: string;
  region?: string;
  className?: string;
  fallbackUrl?: string;
  controls?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  poster?: string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
  showCaption?: boolean;
  captionClassName?: string;
}

interface LocalizedAudioProps {
  assetId: string;
  language?: string;
  region?: string;
  className?: string;
  fallbackUrl?: string;
  controls?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  onLoad?: () => void;
  onError?: (error: Error) => void;
  showCaption?: boolean;
  captionClassName?: string;
}

interface LocalizedDocumentProps {
  assetId: string;
  language?: string;
  region?: string;
  className?: string;
  fallbackUrl?: string;
  showPreview?: boolean;
  downloadText?: string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
  showCaption?: boolean;
  captionClassName?: string;
}

export const LocalizedAsset: React.FC<LocalizedAssetProps> = ({
  assetId,
  language,
  region,
  className = '',
  fallbackUrl,
  fallbackAlt,
  loading = 'lazy',
  onLoad,
  onError,
  showCaption = false,
  captionClassName = '',
  imageProps = {}
}) => {
  const { i18n } = useTranslation();
  const [asset, setAsset] = useState<LocalizedAssetType | null>(null);
  const [assetUrl, setAssetUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const currentLanguage = language || i18n.language;
  const currentRegion = region;

  // Memoize asset lookup
  const memoizedAsset = useMemo(() => {
    return languageContentManager.getAsset(assetId, currentLanguage as any, currentRegion);
  }, [assetId, currentLanguage, currentRegion]);

  useEffect(() => {
    const loadAsset = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (memoizedAsset) {
          setAsset(memoizedAsset);
          const url = await languageContentManager.getAssetUrl(assetId, currentLanguage as any, currentRegion);
          setAssetUrl(url);
        } else if (fallbackUrl) {
          setAssetUrl(fallbackUrl);
        } else {
          throw new Error(`Asset not found: ${assetId} for language: ${currentLanguage}`);
        }

        onLoad?.();
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to load asset');
        setError(error);
        onError?.(error);
        
        // Try fallback URL if available
        if (fallbackUrl && assetUrl !== fallbackUrl) {
          setAssetUrl(fallbackUrl);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadAsset();
  }, [assetId, currentLanguage, currentRegion, memoizedAsset, fallbackUrl, onLoad, onError, assetUrl]);

  if (error && !fallbackUrl) {
    return (
      <div className={`localized-asset-error ${className}`}>
        <div className="flex items-center justify-center p-4 bg-red-50 border border-red-200 rounded-lg">
          <span className="text-red-600 text-sm">
            Failed to load asset: {assetId}
          </span>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={`localized-asset-loading ${className}`}>
        <div className="animate-pulse bg-gray-200 rounded-lg" style={{ minHeight: '200px' }} />
      </div>
    );
  }

  const altText = asset?.altText || fallbackAlt || `Asset: ${assetId}`;
  const caption = asset?.caption;

  return (
    <div className={`localized-asset ${className}`}>
      <ResponsiveImage
        src={assetUrl}
        alt={altText}
        loading={loading}
        onLoad={onLoad}
        onError={onError}
        {...imageProps}
      />
      {showCaption && caption && (
        <figcaption className={`localized-asset-caption text-sm text-gray-600 mt-2 ${captionClassName}`}>
          {caption}
        </figcaption>
      )}
    </div>
  );
};

export const LocalizedVideo: React.FC<LocalizedVideoProps> = ({
  assetId,
  language,
  region,
  className = '',
  fallbackUrl,
  controls = true,
  autoPlay = false,
  muted = false,
  loop = false,
  poster,
  onLoad,
  onError,
  showCaption = false,
  captionClassName = ''
}) => {
  const { i18n } = useTranslation();
  const [asset, setAsset] = useState<LocalizedAssetType | null>(null);
  const [assetUrl, setAssetUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const currentLanguage = language || i18n.language;
  const currentRegion = region;

  const memoizedAsset = useMemo(() => {
    return languageContentManager.getAsset(assetId, currentLanguage as any, currentRegion);
  }, [assetId, currentLanguage, currentRegion]);

  useEffect(() => {
    const loadAsset = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (memoizedAsset) {
          setAsset(memoizedAsset);
          const url = await languageContentManager.getAssetUrl(assetId, currentLanguage as any, currentRegion);
          setAssetUrl(url);
        } else if (fallbackUrl) {
          setAssetUrl(fallbackUrl);
        } else {
          throw new Error(`Video asset not found: ${assetId} for language: ${currentLanguage}`);
        }

        onLoad?.();
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to load video asset');
        setError(error);
        onError?.(error);
        
        if (fallbackUrl && assetUrl !== fallbackUrl) {
          setAssetUrl(fallbackUrl);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadAsset();
  }, [assetId, currentLanguage, currentRegion, memoizedAsset, fallbackUrl, onLoad, onError, assetUrl]);

  if (error && !fallbackUrl) {
    return (
      <div className={`localized-video-error ${className}`}>
        <div className="flex items-center justify-center p-4 bg-red-50 border border-red-200 rounded-lg">
          <span className="text-red-600 text-sm">
            Failed to load video: {assetId}
          </span>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={`localized-video-loading ${className}`}>
        <div className="animate-pulse bg-gray-200 rounded-lg" style={{ minHeight: '300px' }} />
      </div>
    );
  }

  const caption = asset?.caption;

  return (
    <div className={`localized-video ${className}`}>
      <video
        src={assetUrl}
        controls={controls}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        poster={poster}
        onLoad={onLoad}
        onError={() => onError?.(new Error('Video failed to load'))}
        className="w-full h-auto rounded-lg"
      >
        <source src={assetUrl} type="video/mp4" />
        <source src={assetUrl} type="video/webm" />
        Your browser does not support the video tag.
      </video>
      {showCaption && caption && (
        <figcaption className={`localized-video-caption text-sm text-gray-600 mt-2 ${captionClassName}`}>
          {caption}
        </figcaption>
      )}
    </div>
  );
};

export const LocalizedAudio: React.FC<LocalizedAudioProps> = ({
  assetId,
  language,
  region,
  className = '',
  fallbackUrl,
  controls = true,
  autoPlay = false,
  muted = false,
  loop = false,
  onLoad,
  onError,
  showCaption = false,
  captionClassName = ''
}) => {
  const { i18n } = useTranslation();
  const [asset, setAsset] = useState<LocalizedAssetType | null>(null);
  const [assetUrl, setAssetUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const currentLanguage = language || i18n.language;
  const currentRegion = region;

  const memoizedAsset = useMemo(() => {
    return languageContentManager.getAsset(assetId, currentLanguage as any, currentRegion);
  }, [assetId, currentLanguage, currentRegion]);

  useEffect(() => {
    const loadAsset = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (memoizedAsset) {
          setAsset(memoizedAsset);
          const url = await languageContentManager.getAssetUrl(assetId, currentLanguage as any, currentRegion);
          setAssetUrl(url);
        } else if (fallbackUrl) {
          setAssetUrl(fallbackUrl);
        } else {
          throw new Error(`Audio asset not found: ${assetId} for language: ${currentLanguage}`);
        }

        onLoad?.();
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to load audio asset');
        setError(error);
        onError?.(error);
        
        if (fallbackUrl && assetUrl !== fallbackUrl) {
          setAssetUrl(fallbackUrl);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadAsset();
  }, [assetId, currentLanguage, currentRegion, memoizedAsset, fallbackUrl, onLoad, onError, assetUrl]);

  if (error && !fallbackUrl) {
    return (
      <div className={`localized-audio-error ${className}`}>
        <div className="flex items-center justify-center p-4 bg-red-50 border border-red-200 rounded-lg">
          <span className="text-red-600 text-sm">
            Failed to load audio: {assetId}
          </span>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={`localized-audio-loading ${className}`}>
        <div className="animate-pulse bg-gray-200 rounded-lg h-16" />
      </div>
    );
  }

  const caption = asset?.caption;

  return (
    <div className={`localized-audio ${className}`}>
      <audio
        src={assetUrl}
        controls={controls}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        onLoad={onLoad}
        onError={() => onError?.(new Error('Audio failed to load'))}
        className="w-full"
      >
        <source src={assetUrl} type="audio/mpeg" />
        <source src={assetUrl} type="audio/ogg" />
        Your browser does not support the audio tag.
      </audio>
      {showCaption && caption && (
        <figcaption className={`localized-audio-caption text-sm text-gray-600 mt-2 ${captionClassName}`}>
          {caption}
        </figcaption>
      )}
    </div>
  );
};

export const LocalizedDocument: React.FC<LocalizedDocumentProps> = ({
  assetId,
  language,
  region,
  className = '',
  fallbackUrl,
  showPreview = false,
  downloadText = 'Download',
  onLoad,
  onError,
  showCaption = false,
  captionClassName = ''
}) => {
  const { i18n } = useTranslation();
  const [asset, setAsset] = useState<LocalizedAssetType | null>(null);
  const [assetUrl, setAssetUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const currentLanguage = language || i18n.language;
  const currentRegion = region;

  const memoizedAsset = useMemo(() => {
    return languageContentManager.getAsset(assetId, currentLanguage as any, currentRegion);
  }, [assetId, currentLanguage, currentRegion]);

  useEffect(() => {
    const loadAsset = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (memoizedAsset) {
          setAsset(memoizedAsset);
          const url = await languageContentManager.getAssetUrl(assetId, currentLanguage as any, currentRegion);
          setAssetUrl(url);
        } else if (fallbackUrl) {
          setAssetUrl(fallbackUrl);
        } else {
          throw new Error(`Document asset not found: ${assetId} for language: ${currentLanguage}`);
        }

        onLoad?.();
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to load document asset');
        setError(error);
        onError?.(error);
        
        if (fallbackUrl && assetUrl !== fallbackUrl) {
          setAssetUrl(fallbackUrl);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadAsset();
  }, [assetId, currentLanguage, currentRegion, memoizedAsset, fallbackUrl, onLoad, onError, assetUrl]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = assetUrl;
    link.download = asset?.id || assetId;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (error && !fallbackUrl) {
    return (
      <div className={`localized-document-error ${className}`}>
        <div className="flex items-center justify-center p-4 bg-red-50 border border-red-200 rounded-lg">
          <span className="text-red-600 text-sm">
            Failed to load document: {assetId}
          </span>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={`localized-document-loading ${className}`}>
        <div className="animate-pulse bg-gray-200 rounded-lg h-20" />
      </div>
    );
  }

  const caption = asset?.caption;

  return (
    <div className={`localized-document ${className}`}>
      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <p className="font-medium text-gray-900">{asset?.id || assetId}</p>
            <p className="text-sm text-gray-500">{asset?.type || 'document'}</p>
          </div>
        </div>
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {downloadText}
        </button>
      </div>
      {showCaption && caption && (
        <figcaption className={`localized-document-caption text-sm text-gray-600 mt-2 ${captionClassName}`}>
          {caption}
        </figcaption>
      )}
    </div>
  );
};

// Export all components
export default LocalizedAsset;
