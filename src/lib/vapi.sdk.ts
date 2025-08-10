// Placeholder vapi SDK for React compatibility
export const vapi = {
  on: (event: string, callback: Function) => {
    // Placeholder event listener
    console.log(`Vapi event listener added for: ${event}`);
  },
  off: (event: string, callback: Function) => {
    // Placeholder event remover
    console.log(`Vapi event listener removed for: ${event}`);
  },
  start: (config: any, overrides: any) => {
    // Placeholder start function
    console.log('Vapi start called with:', config, overrides);
  },
  stop: () => {
    // Placeholder stop function
    console.log('Vapi stop called');
  },
  isMuted: () => false,
  setMuted: (muted: boolean) => {
    console.log('Vapi setMuted called with:', muted);
  }
};
