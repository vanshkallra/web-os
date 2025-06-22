
// import { configureStore, createSlice } from '@reduxjs/toolkit';

// // Helper function to convert viewport units to pixels
// const convertToPixels = (value, dimension) => {
//   if (typeof value === 'string') {
//     if (value.includes('vw')) {
//       const vwValue = parseFloat(value);
//       return Math.round((vwValue / 100) * window.innerWidth);
//     } else if (value.includes('vh')) {
//       const vhValue = parseFloat(value);
//       return Math.round((vhValue / 100) * window.innerHeight);
//     } else if (value.includes('px')) {
//       return parseInt(value, 10);
//     }
//   }
//   return parseInt(value, 10) || 0;
// };

// // macOS-style window offset constants
// const WINDOW_OFFSET_X = 30;
// const WINDOW_OFFSET_Y = 30;

// // Helper to get the next window position (macOS-style cascade)
// const getNextWindowPosition = (openWindows, baseX = 100, baseY = 100) => {
//   if (openWindows.length === 0) {
//     return { x: baseX, y: baseY };
//   }

//   // Find the topmost window (highest z-index)
//   const topWindow = openWindows.reduce((prev, current) => 
//     (prev.zIndex > current.zIndex) ? prev : current
//   );

//   // Calculate new position with offset
//   let newX = topWindow.positionX + WINDOW_OFFSET_X;
//   let newY = topWindow.positionY + WINDOW_OFFSET_Y;

//   // Keep window within viewport bounds
//   const maxX = window.innerWidth - 600; // assuming default width of 600
//   const maxY = window.innerHeight - 400; // assuming default height of 400

//   // If the new position would go off-screen, reset to base position
//   if (newX > maxX || newY > maxY) {
//     newX = baseX;
//     newY = baseY;
//   }

//   return { x: newX, y: newY };
// };

// // Initial state with pixel-based positioning for better performance
// const initialState = {
//   appGridStatus: false,
//   windows: [
//     {
//       windowId: "About",
//       windowState: "close",
//       displayName: "About",
//       windowComponent: 'Window',
//       windowContent: 'About',
//       windowContentPadding: {
//         top: null,
//         right: null,
//         bottom: null,
//         left: null
//       },
//       position: "absolute",
//       // Initial positions - these will be updated when windows open
//       positionX: 100,
//       positionY: 100,
//       iconImage: "about.png",
//       altText: "About Icon",
//       fullscreen: false,
//       // Add size properties for better window management
//       width: 600,
//       height: 400,
//       minWidth: 300,
//       minHeight: 200,
//       // Z-index for window stacking
//       zIndex: 1
//     },
//     {
//       windowId: "Contact",
//       windowState: "close",
//       displayName: "Contact",
//       windowComponent: 'Window',
//       windowContent: 'Contact',
//       windowContentPadding: {
//         top: null,
//         right: null,
//         bottom: null,
//         left: null
//       },
//       position: "absolute",
//       positionX: 130,
//       positionY: 130,
//       iconImage: "contact.png",
//       altText: "Contact Icon",
//       fullscreen: false,
//       width: 600,
//       height: 400,
//       minWidth: 300,
//       minHeight: 200,
//       zIndex: 1
//     },
//     {
//       windowId: "Skills",
//       windowState: "close",
//       displayName: "Skills",
//       windowComponent: 'Window',
//       windowContent: 'Skills',
//       windowContentPadding: {
//         top: null,
//         right: null,
//         bottom: null,
//         left: null
//       },
//       position: "absolute",
//       positionX: 160,
//       positionY: 160,
//       iconImage: "skills.png",
//       altText: "Skills Icon",
//       fullscreen: false,
//       width: 600,
//       height: 400,
//       minWidth: 300,
//       minHeight: 200,
//       zIndex: 1
//     }
//   ],
//   // Track the highest z-index for window focusing
//   maxZIndex: 1,
//   // Store last opened window positions for better cascade behavior
//   lastWindowPosition: { x: 100, y: 100 }
// };

// // Windows slice
// const windowsSlice = createSlice({
//   name: 'windows',
//   initialState,
//   reducers: {
//     setAppGridStatus: (state, action) => {
//       state.appGridStatus = action.payload;
//     },
//     openWindow: (state, action) => {
//       const window = state.windows.find(w => w.windowId === action.payload);
//       if (window && window.windowState !== 'open') {
//         // Get currently open windows
//         const openWindows = state.windows.filter(w => w.windowState === 'open');
        
//         // Calculate new position based on existing open windows
//         const newPosition = getNextWindowPosition(openWindows, 100, 100);
        
//         // Update window properties
//         window.windowState = 'open';
//         window.positionX = newPosition.x;
//         window.positionY = newPosition.y;
        
//         // Bring window to front when opened
//         state.maxZIndex += 1;
//         window.zIndex = state.maxZIndex;
        
//         // Update last window position for future reference
//         state.lastWindowPosition = newPosition;
//       }
//     },
//     closeWindow: (state, action) => {
//       const window = state.windows.find(w => w.windowId === action.payload);
//       if (window) {
//         // Simply close the window without affecting other windows' positions
//         window.windowState = 'close';
//         // Note: We don't reset position here to maintain macOS-like behavior
//         // The window will reopen at its last position if opened again
//       }
//     },
//     minimizeWindow: (state, action) => {
//       const window = state.windows.find(w => w.windowId === action.payload);
//       if (window) {
//         window.windowState = 'minimize';
//       }
//     },
//     maximizeWindow: (state, action) => {
//       const window = state.windows.find(w => w.windowId === action.payload);
//       if (window) {
//         window.fullscreen = !window.fullscreen;
//         // Bring to front when maximized
//         if (window.fullscreen) {
//           state.maxZIndex += 1;
//           window.zIndex = state.maxZIndex;
//         }
//       }
//     },
//     // Optimized position update - accepts only pixel values
//     updateWindowPosition: (state, action) => {
//       const { windowId, x, y } = action.payload;
//       const window = state.windows.find(w => w.windowId === windowId);
//       if (window) {
//         // Ensure we're working with numbers, not strings
//         window.positionX = typeof x === 'number' ? x : convertToPixels(x);
//         window.positionY = typeof y === 'number' ? y : convertToPixels(y);
//       }
//     },
//     // New action for updating window size
//     updateWindowSize: (state, action) => {
//       const { windowId, width, height } = action.payload;
//       const window = state.windows.find(w => w.windowId === windowId);
//       if (window) {
//         if (width !== undefined) window.width = Math.max(width, window.minWidth);
//         if (height !== undefined) window.height = Math.max(height, window.minHeight);
//       }
//     },
//     // New action for focusing window (bringing to front)
//     focusWindow: (state, action) => {
//       const window = state.windows.find(w => w.windowId === action.payload);
//       if (window && window.windowState === 'open') {
//         state.maxZIndex += 1;
//         window.zIndex = state.maxZIndex;
//       }
//     },
//     // Batch update for better performance during drag
//     batchUpdateWindow: (state, action) => {
//       const { windowId, updates } = action.payload;
//       const window = state.windows.find(w => w.windowId === windowId);
//       if (window) {
//         Object.assign(window, updates);
//       }
//     },
//     // Handle window resize events to recalculate positions if needed
//     handleWindowResize: (state) => {
//       const viewportWidth = window.innerWidth;
//       const viewportHeight = window.innerHeight;
      
//       state.windows.forEach(win => {
//         // Only adjust positions for open windows
//         if (win.windowState === 'open') {
//           // Ensure windows stay within bounds after viewport resize
//           if (win.positionX + win.width > viewportWidth) {
//             win.positionX = Math.max(0, viewportWidth - win.width);
//           }
//           if (win.positionY + win.height > viewportHeight) {
//             win.positionY = Math.max(0, viewportHeight - win.height);
//           }
          
//           // Ensure windows don't go completely off-screen
//           if (win.positionX < -win.width + 50) {
//             win.positionX = -win.width + 50;
//           }
//           if (win.positionY < 0) {
//             win.positionY = 0;
//           }
//         }
//       });
//     },
//     // New action to reset window positions if needed
//     resetWindowPositions: (state) => {
//       let baseX = 100;
//       let baseY = 100;
      
//       state.windows.forEach((window, index) => {
//         window.positionX = baseX + (index * WINDOW_OFFSET_X);
//         window.positionY = baseY + (index * WINDOW_OFFSET_Y);
//       });
      
//       state.lastWindowPosition = { x: baseX, y: baseY };
//     }
//   }
// });

// export const {
//   setAppGridStatus,
//   openWindow,
//   closeWindow,
//   minimizeWindow,
//   maximizeWindow,
//   updateWindowPosition,
//   updateWindowSize,
//   focusWindow,
//   batchUpdateWindow,
//   handleWindowResize,
//   resetWindowPositions
// } = windowsSlice.actions;

// // Selectors for better performance
// export const selectOpenWindows = (state) => 
//   state.windows.windows.filter(w => w.windowState === 'open');

// export const selectWindowById = (state, windowId) =>
//   state.windows.windows.find(w => w.windowId === windowId);

// export const selectWindowsByZIndex = (state) =>
//   state.windows.windows
//     .filter(w => w.windowState === 'open')
//     .sort((a, b) => a.zIndex - b.zIndex);

// // New selector to get the topmost window
// export const selectTopmostWindow = (state) =>
//   state.windows.windows
//     .filter(w => w.windowState === 'open')
//     .reduce((prev, current) => 
//       (!prev || current.zIndex > prev.zIndex) ? current : prev, 
//     null);

// export const store = configureStore({
//   reducer: {
//     windows: windowsSlice.reducer
//   },
//   // Add middleware for better performance
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         // Ignore these action types for performance
//         ignoredActions: ['windows/batchUpdateWindow'],
//       },
//     }),
// });

// // Add window resize listener to handle viewport changes
// if (typeof window !== 'undefined') {
//   let resizeTimeout;
//   window.addEventListener('resize', () => {
//     clearTimeout(resizeTimeout);
//     resizeTimeout = setTimeout(() => {
//       store.dispatch(handleWindowResize());
//     }, 100);
//   });
// }





import { configureStore, createSlice } from '@reduxjs/toolkit';

// Helper function to convert viewport units to pixels
const convertToPixels = (value, dimension) => {
  if (typeof value === 'string') {
    if (value.includes('vw')) {
      const vwValue = parseFloat(value);
      return Math.round((vwValue / 100) * window.innerWidth);
    } else if (value.includes('vh')) {
      const vhValue = parseFloat(value);
      return Math.round((vhValue / 100) * window.innerHeight);
    } else if (value.includes('px')) {
      return parseInt(value, 10);
    }
  }
  return parseInt(value, 10) || 0;
};

// macOS-style window offset constants
const WINDOW_OFFSET_X = 30;
const WINDOW_OFFSET_Y = 30;

// Helper to get the next window position (macOS-style cascade)
const getNextWindowPosition = (openWindows, baseX = 100, baseY = 100) => {
  if (openWindows.length === 0) {
    return { x: baseX, y: baseY };
  }

  // Find the topmost window (highest z-index)
  const topWindow = openWindows.reduce((prev, current) => 
    (prev.zIndex > current.zIndex) ? prev : current
  );

  // Calculate new position with offset
  let newX = topWindow.positionX + WINDOW_OFFSET_X;
  let newY = topWindow.positionY + WINDOW_OFFSET_Y;

  // Keep window within viewport bounds
  const maxX = window.innerWidth - 600; // assuming default width of 600
  const maxY = window.innerHeight - 400; // assuming default height of 400

  // If the new position would go off-screen, reset to base position
  if (newX > maxX || newY > maxY) {
    newX = baseX;
    newY = baseY;
  }

  return { x: newX, y: newY };
};

// Initial state with pixel-based positioning for better performance
const initialState = {
  appGridStatus: false,
  windows: [
    {
      windowId: "About",
      windowState: "close",
      displayName: "About",
      windowComponent: 'Window',
      windowContent: 'About',
      windowContentPadding: {
        top: null,
        right: null,
        bottom: null,
        left: null
      },
      position: "absolute",
      positionX: 100,
      positionY: 100,
      iconImage: "about.png",
      altText: "About Icon",
      fullscreen: false,
      width: 600,
      height: 400,
      minWidth: 300,
      minHeight: 200,
      zIndex: 1
    },
    {
      windowId: "Contact",
      windowState: "close",
      displayName: "Contact",
      windowComponent: 'Window',
      windowContent: 'Contact',
      windowContentPadding: {
        top: null,
        right: null,
        bottom: null,
        left: null
      },
      position: "absolute",
      positionX: 130,
      positionY: 130,
      iconImage: "contact.png",
      altText: "Contact Icon",
      fullscreen: false,
      width: 600,
      height: 400,
      minWidth: 300,
      minHeight: 200,
      zIndex: 1
    },
    {
      windowId: "Skills",
      windowState: "close",
      displayName: "Skills",
      windowComponent: 'Window',
      windowContent: 'Skills',
      windowContentPadding: {
        top: null,
        right: null,
        bottom: null,
        left: null
      },
      position: "absolute",
      positionX: 160,
      positionY: 160,
      iconImage: "skills.png",
      altText: "Skills Icon",
      fullscreen: false,
      width: 600,
      height: 400,
      minWidth: 300,
      minHeight: 200,
      zIndex: 1
    },
    {
      windowId: "Projects",
      windowState: "close",
      displayName: "Projects",
      windowComponent: 'Window',
      windowContent: 'Projects',
      windowContentPadding: {
        top: null,
        right: null,
        bottom: null,
        left: null
      },
      position: "absolute",
      positionX: 190,
      positionY: 190,
      iconImage: "projects.png",
      altText: "Projects Icon",
      fullscreen: false,
      width: 800,
      height: 600,
      minWidth: 400,
      minHeight: 300,
      zIndex: 1
    },
    {
      windowId: "Resume",
      windowState: "close",
      displayName: "Resume",
      windowComponent: 'Window',
      windowContent: 'Resume',
      windowContentPadding: {
        top: null,
        right: null,
        bottom: null,
        left: null
      },
      position: "absolute",
      positionX: 220,
      positionY: 220,
      iconImage: "resume.png",
      altText: "Resume Icon",
      fullscreen: false,
      width: 700,
      height: 700,
      minWidth: 400,
      minHeight: 300,
      zIndex: 1
    },
    {
      windowId: "AIAssistant",
      windowState: "close",
      displayName: "AI Assistant",
      windowComponent: 'Window',
      windowContent: 'AIAssistant',
      windowContentPadding: {
        top: null,
        right: null,
        bottom: null,
        left: null
      },
      position: "absolute",
      positionX: 250,
      positionY: 250,
      iconImage: "ai-assistant.png",
      altText: "AI Assistant Icon",
      fullscreen: false,
      width: 700,
      height: 550,
      minWidth: 350,
      minHeight: 400,
      zIndex: 1
    }
  ],
  // Track the highest z-index for window focusing
  maxZIndex: 1,
  // Store last opened window positions for better cascade behavior
  lastWindowPosition: { x: 100, y: 100 },
  // Dock state
  dockItems: []
};

// Windows slice
const windowsSlice = createSlice({
  name: 'windows',
  initialState,
  reducers: {
    setAppGridStatus: (state, action) => {
      state.appGridStatus = action.payload;
    },
    openWindow: (state, action) => {
      const window = state.windows.find(w => w.windowId === action.payload);
      if (window && window.windowState !== 'open') {
        // Get currently open windows
        const openWindows = state.windows.filter(w => w.windowState === 'open');
        
        // Calculate new position based on existing open windows
        const newPosition = getNextWindowPosition(openWindows, 100, 100);
        
        // Update window properties
        window.windowState = 'open';
        window.positionX = newPosition.x;
        window.positionY = newPosition.y;
        
        // Bring window to front when opened
        state.maxZIndex += 1;
        window.zIndex = state.maxZIndex;
        
        // Update last window position for future reference
        state.lastWindowPosition = newPosition;
        
        // Add to dock if not already there
        const existingDockItem = state.dockItems.find(item => item.windowId === window.windowId);
        if (!existingDockItem) {
          state.dockItems.push({
            windowId: window.windowId,
            displayName: window.displayName,
            iconImage: window.iconImage,
            altText: window.altText,
            windowState: window.windowState
          });
        } else {
          existingDockItem.windowState = 'open';
        }
      }
    },
    closeWindow: (state, action) => {
      const window = state.windows.find(w => w.windowId === action.payload);
      if (window) {
        window.windowState = 'close';
        
        // Remove from dock when closed
        state.dockItems = state.dockItems.filter(item => item.windowId !== action.payload);
      }
    },
    minimizeWindow: (state, action) => {
      const window = state.windows.find(w => w.windowId === action.payload);
      if (window) {
        window.windowState = 'minimize';
        
        // Update dock item state
        const dockItem = state.dockItems.find(item => item.windowId === action.payload);
        if (dockItem) {
          dockItem.windowState = 'minimize';
        }
      }
    },
    maximizeWindow: (state, action) => {
      const window = state.windows.find(w => w.windowId === action.payload);
      if (window) {
        window.fullscreen = !window.fullscreen;
        // Bring to front when maximized
        if (window.fullscreen) {
          state.maxZIndex += 1;
          window.zIndex = state.maxZIndex;
        }
      }
    },
    // Restore window from minimized state
    restoreWindow: (state, action) => {
      const window = state.windows.find(w => w.windowId === action.payload);
      if (window && window.windowState === 'minimize') {
        window.windowState = 'open';
        
        // Bring to front when restored
        state.maxZIndex += 1;
        window.zIndex = state.maxZIndex;
        
        // Update dock item state
        const dockItem = state.dockItems.find(item => item.windowId === action.payload);
        if (dockItem) {
          dockItem.windowState = 'open';
        }
      }
    },
    // Remove from dock (this will also close the window)
    removeFromDock: (state, action) => {
      const window = state.windows.find(w => w.windowId === action.payload);
      if (window) {
        window.windowState = 'close';
      }
      
      // Remove from dock
      state.dockItems = state.dockItems.filter(item => item.windowId !== action.payload);
    },
    // Optimized position update - accepts only pixel values
    updateWindowPosition: (state, action) => {
      const { windowId, x, y } = action.payload;
      const window = state.windows.find(w => w.windowId === windowId);
      if (window) {
        // Ensure we're working with numbers, not strings
        window.positionX = typeof x === 'number' ? x : convertToPixels(x);
        window.positionY = typeof y === 'number' ? y : convertToPixels(y);
      }
    },
    // New action for updating window size
    updateWindowSize: (state, action) => {
      const { windowId, width, height } = action.payload;
      const window = state.windows.find(w => w.windowId === windowId);
      if (window) {
        if (width !== undefined) window.width = Math.max(width, window.minWidth);
        if (height !== undefined) window.height = Math.max(height, window.minHeight);
      }
    },
    // New action for focusing window (bringing to front)
    focusWindow: (state, action) => {
      const window = state.windows.find(w => w.windowId === action.payload);
      if (window && window.windowState === 'open') {
        state.maxZIndex += 1;
        window.zIndex = state.maxZIndex;
      }
    },
    // Batch update for better performance during drag
    batchUpdateWindow: (state, action) => {
      const { windowId, updates } = action.payload;
      const window = state.windows.find(w => w.windowId === windowId);
      if (window) {
        Object.assign(window, updates);
      }
    },
    // Handle window resize events to recalculate positions if needed
    handleWindowResize: (state) => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      state.windows.forEach(win => {
        // Only adjust positions for open windows
        if (win.windowState === 'open') {
          // Ensure windows stay within bounds after viewport resize
          if (win.positionX + win.width > viewportWidth) {
            win.positionX = Math.max(0, viewportWidth - win.width);
          }
          if (win.positionY + win.height > viewportHeight) {
            win.positionY = Math.max(0, viewportHeight - win.height);
          }
          
          // Ensure windows don't go completely off-screen
          if (win.positionX < -win.width + 50) {
            win.positionX = -win.width + 50;
          }
          if (win.positionY < 0) {
            win.positionY = 0;
          }
        }
      });
    },
    // New action to reset window positions if needed
    resetWindowPositions: (state) => {
      let baseX = 100;
      let baseY = 100;
      
      state.windows.forEach((window, index) => {
        window.positionX = baseX + (index * WINDOW_OFFSET_X);
        window.positionY = baseY + (index * WINDOW_OFFSET_Y);
      });
      
      state.lastWindowPosition = { x: baseX, y: baseY };
    }
  }
});

export const {
  setAppGridStatus,
  openWindow,
  closeWindow,
  minimizeWindow,
  maximizeWindow,
  restoreWindow,
  removeFromDock,
  updateWindowPosition,
  updateWindowSize,
  focusWindow,
  batchUpdateWindow,
  handleWindowResize,
  resetWindowPositions
} = windowsSlice.actions;

// Selectors for better performance
export const selectOpenWindows = (state) => 
  state.windows.windows.filter(w => w.windowState === 'open');

export const selectWindowById = (state, windowId) =>
  state.windows.windows.find(w => w.windowId === windowId);

export const selectWindowsByZIndex = (state) =>
  state.windows.windows
    .filter(w => w.windowState === 'open')
    .sort((a, b) => a.zIndex - b.zIndex);

// New selector to get the topmost window
export const selectTopmostWindow = (state) =>
  state.windows.windows
    .filter(w => w.windowState === 'open')
    .reduce((prev, current) => 
      (!prev || current.zIndex > prev.zIndex) ? current : prev, 
    null);

// Selector for dock items
export const selectDockItems = (state) => state.windows.dockItems;

// Selector for app grid status
export const selectAppGridStatus = (state) => state.windows.appGridStatus;

// Selector for all available apps (for app grid)
export const selectAllApps = (state) => state.windows.windows;

export const store = configureStore({
  reducer: {
    windows: windowsSlice.reducer
  },
  // Add middleware for better performance
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for performance
        ignoredActions: ['windows/batchUpdateWindow'],
      },
    }),
});

// Add window resize listener to handle viewport changes
if (typeof window !== 'undefined') {
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      store.dispatch(handleWindowResize());
    }, 100);
  });
}