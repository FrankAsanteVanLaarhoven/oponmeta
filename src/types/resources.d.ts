// TypeScript definitions for translation resources
// This file defines the structure of all translation namespaces

interface Resources {
  common: {
    navigation: {
      home: string;
      about: string;
      contact: string;
      services: string;
      courses: string;
      programmes: string;
      resources: string;
      community: string;
      pricing: string;
      login: string;
      signup: string;
      dashboard: string;
      profile: string;
      settings: string;
      logout: string;
    };
    actions: {
      save: string;
      cancel: string;
      delete: string;
      edit: string;
      create: string;
      update: string;
      submit: string;
      confirm: string;
      close: string;
      back: string;
      next: string;
      previous: string;
      search: string;
      filter: string;
      sort: string;
      download: string;
      upload: string;
      share: string;
      like: string;
      comment: string;
      follow: string;
      unfollow: string;
      enroll: string;
      purchase: string;
      subscribe: string;
      unsubscribe: string;
    };
    messages: {
      loading: string;
      error: string;
      success: string;
      warning: string;
      info: string;
      noData: string;
      noResults: string;
      tryAgain: string;
      refresh: string;
      retry: string;
      connectionError: string;
      serverError: string;
      networkError: string;
      unauthorized: string;
      forbidden: string;
      notFound: string;
      validationError: string;
      required: string;
      invalid: string;
      minLength: string;
      maxLength: string;
      emailInvalid: string;
      passwordWeak: string;
      passwordMismatch: string;
    };
    language: {
      autoDetected: string;
      changeLanguage: string;
      selectLanguage: string;
      currentLanguage: string;
      languageSettings: string;
      translationQuality: string;
      machineTranslation: string;
      humanTranslation: string;
    };
    time: {
      now: string;
      today: string;
      yesterday: string;
      tomorrow: string;
      thisWeek: string;
      lastWeek: string;
      nextWeek: string;
      thisMonth: string;
      lastMonth: string;
      nextMonth: string;
      thisYear: string;
      lastYear: string;
      nextYear: string;
      ago: string;
      in: string;
      minutes: string;
      hours: string;
      days: string;
      weeks: string;
      months: string;
      years: string;
    };
    currency: {
      usd: string;
      eur: string;
      gbp: string;
      ngn: string;
      cad: string;
      aud: string;
      jpy: string;
      cny: string;
      inr: string;
      brl: string;
      mxn: string;
      zar: string;
    };
    status: {
      active: string;
      inactive: string;
      pending: string;
      completed: string;
      cancelled: string;
      draft: string;
      published: string;
      archived: string;
      deleted: string;
      online: string;
      offline: string;
      busy: string;
      available: string;
      unavailable: string;
    };
  };
  
  // Navigation and UI specific translations
  navigation: {
    mainMenu: {
      explore: string;
      learn: string;
      teach: string;
      connect: string;
      support: string;
    };
    footer: {
      company: string;
      products: string;
      resources: string;
      support: string;
      legal: string;
      social: string;
    };
    breadcrumbs: {
      home: string;
      courses: string;
      programmes: string;
      resources: string;
      community: string;
    };
  };

  // Course and learning specific translations
  courses: {
    categories: {
      technology: string;
      business: string;
      design: string;
      marketing: string;
      health: string;
      education: string;
      finance: string;
      language: string;
      music: string;
      sports: string;
      cooking: string;
      travel: string;
    };
    levels: {
      beginner: string;
      intermediate: string;
      advanced: string;
      expert: string;
      allLevels: string;
    };
    features: {
      certificate: string;
      lifetime: string;
      mobile: string;
      offline: string;
      live: string;
      interactive: string;
      project: string;
      quiz: string;
      assignment: string;
      discussion: string;
      mentorship: string;
      community: string;
    };
    status: {
      enrolled: string;
      inProgress: string;
      completed: string;
      notStarted: string;
      paused: string;
      dropped: string;
    };
  };

  // User and profile specific translations
  user: {
    profile: {
      personalInfo: string;
      contactInfo: string;
      preferences: string;
      security: string;
      notifications: string;
      privacy: string;
      billing: string;
      subscriptions: string;
      certificates: string;
      achievements: string;
      progress: string;
      history: string;
    };
    roles: {
      student: string;
      instructor: string;
      admin: string;
      moderator: string;
      guest: string;
    };
    settings: {
      language: string;
      timezone: string;
      currency: string;
      theme: string;
      notifications: string;
      privacy: string;
      security: string;
    };
  };

  // Payment and billing specific translations
  payment: {
    methods: {
      creditCard: string;
      debitCard: string;
      paypal: string;
      stripe: string;
      applePay: string;
      googlePay: string;
      bankTransfer: string;
      cryptocurrency: string;
    };
    status: {
      pending: string;
      processing: string;
      completed: string;
      failed: string;
      refunded: string;
      cancelled: string;
    };
    billing: {
      invoice: string;
      receipt: string;
      subscription: string;
      plan: string;
      amount: string;
      currency: string;
      date: string;
      dueDate: string;
      status: string;
    };
  };

  // Community and social specific translations
  community: {
    forums: {
      general: string;
      help: string;
      feedback: string;
      announcements: string;
      discussions: string;
      questions: string;
      answers: string;
      topics: string;
      replies: string;
      likes: string;
      shares: string;
    };
    groups: {
      study: string;
      project: string;
      interest: string;
      location: string;
      skill: string;
      language: string;
    };
    events: {
      webinar: string;
      workshop: string;
      meetup: string;
      conference: string;
      hackathon: string;
      competition: string;
    };
  };

  // Assessment and certification specific translations
  assessment: {
    types: {
      quiz: string;
      exam: string;
      assignment: string;
      project: string;
      presentation: string;
      interview: string;
      practical: string;
      theoretical: string;
    };
    status: {
      notStarted: string;
      inProgress: string;
      submitted: string;
      graded: string;
      passed: string;
      failed: string;
      retake: string;
    };
    grades: {
      excellent: string;
      good: string;
      satisfactory: string;
      needsImprovement: string;
      fail: string;
    };
  };

  // Error and validation specific translations
  errors: {
    validation: {
      required: string;
      email: string;
      password: string;
      confirmPassword: string;
      minLength: string;
      maxLength: string;
      pattern: string;
      unique: string;
      exists: string;
      notFound: string;
      invalid: string;
    };
    network: {
      connection: string;
      timeout: string;
      server: string;
      client: string;
      unknown: string;
    };
    auth: {
      unauthorized: string;
      forbidden: string;
      expired: string;
      invalid: string;
      locked: string;
      disabled: string;
    };
  };

  // Success and confirmation specific translations
  success: {
    auth: {
      login: string;
      logout: string;
      register: string;
      passwordReset: string;
      emailVerified: string;
      profileUpdated: string;
    };
    course: {
      enrolled: string;
      completed: string;
      certificate: string;
      progress: string;
      review: string;
    };
    payment: {
      processed: string;
      refunded: string;
      subscription: string;
      plan: string;
    };
  };

  // Form and input specific translations
  forms: {
    labels: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      confirmPassword: string;
      phone: string;
      address: string;
      city: string;
      country: string;
      postalCode: string;
      dateOfBirth: string;
      gender: string;
      bio: string;
      avatar: string;
      cover: string;
    };
    placeholders: {
      search: string;
      filter: string;
      select: string;
      type: string;
      enter: string;
      choose: string;
      upload: string;
      dragDrop: string;
    };
    help: {
      password: string;
      email: string;
      phone: string;
      required: string;
      optional: string;
      format: string;
      example: string;
    };
  };

  // Dashboard and analytics specific translations
  dashboard: {
    overview: string;
    analytics: string;
    reports: string;
    insights: string;
    metrics: string;
    charts: string;
    graphs: string;
    statistics: string;
    trends: string;
    performance: string;
    progress: string;
    goals: string;
    achievements: string;
  };

  // Notification and messaging specific translations
  notifications: {
    types: {
      info: string;
      success: string;
      warning: string;
      error: string;
      system: string;
      course: string;
      payment: string;
      social: string;
    };
    actions: {
      markRead: string;
      markUnread: string;
      delete: string;
      archive: string;
      mute: string;
      unmute: string;
      settings: string;
    };
  };
}

export default Resources;
