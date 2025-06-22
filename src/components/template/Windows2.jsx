import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import {
  closeWindow,
  minimizeWindow,
  maximizeWindow,
  updateWindowPosition,
  updateWindowSize,
  focusWindow
} from '../../store/store';
import { X, Minus, Square } from 'lucide-react';
import interact from '@interactjs/interactjs';

// Import content components
import About from '../views/About';
import Contact from '../views/Contact';
import Skills from '../views/Skills';

const contentComponents = {
  About,
  Contact,
  Skills
};

const Window = ({ windowData }) => {
  const dispatch = useDispatch();
  const windowRef = useRef(null);
  const isInteractSetup = useRef(false);

  const {
    windowId,
    displayName,
    windowContent,
    windowContentPadding,
    positionX,
    positionY,
    width,
    height,
    minWidth,
    minHeight,
    fullscreen,
    iconImage,
    altText,
    zIndex
  } = windowData;

  useEffect(() => {
    const windowElement = windowRef.current;
    if (!windowElement || isInteractSetup.current) return;

    // Clean up any existing interact instance
    interact(windowElement).unset();

    // Don't setup dragging/resizing for fullscreen windows
    if (fullscreen) {
      isInteractSetup.current = false;
      return;
    }

    // Setup interact.js for drag and resize
    interact(windowElement)
      .draggable({
        // Only allow dragging from the header
        allowFrom: '.window-header',
        inertia: {
          resistance: 20,
          minSpeed: 100,
          endSpeed: 10
        },
        listeners: {
          start(event) {
            // Bring window to front when starting to drag
            dispatch(focusWindow(windowId));
            // Change cursor to grabbing
            event.target.style.cursor = 'grabbing';
          },
          move(event) {
            const target = event.target;
            const currentX = parseFloat(target.dataset.x) || 0;
            const currentY = parseFloat(target.dataset.y) || 0;
            
            const newX = currentX + event.dx;
            const newY = currentY + event.dy;

            // Apply transform for smooth dragging
            target.style.transform = `translate(${newX}px, ${newY}px)`;
            target.dataset.x = newX;
            target.dataset.y = newY;
          },
          end(event) {
            const target = event.target;
            const deltaX = parseFloat(target.dataset.x) || 0;
            const deltaY = parseFloat(target.dataset.y) || 0;

            // dispatch(updateWindowPosition({
            //     windowId,
            //     x: `calc(${positionX} + ${x}px)`,
            //     y: `calc(${positionY} + ${y}px)`
            // }));

            // Calculate final position
            const finalX = Math.max(0, Math.min(positionX + deltaX, window.innerWidth - width));
            const finalY = Math.max(0, Math.min(positionY + deltaY, window.innerHeight - height));

            // Reset cursor
            event.target.style.cursor = 'grab';

            // Clear transform immediately to prevent glitch
            target.style.transform = '';
            target.dataset.x = 0;
            target.dataset.y = 0;

            // Update position in store after clearing transform
            dispatch(updateWindowPosition({
              windowId,
              x: finalX,
              y: finalY
            }));
          }
        }
      })
      .resizable({
        edges: { left: true, right: true, bottom: true, top: true },
        listeners: {
          start(event) {
            // Bring window to front when starting to resize
            dispatch(focusWindow(windowId));
          },
          move(event) {
            const target = event.target;
            
            // Get current transform values
            let currentX = parseFloat(target.dataset.x) || 0;
            let currentY = parseFloat(target.dataset.y) || 0;

            // Update position if resizing from top or left edges
            currentX += event.deltaRect.left;
            currentY += event.deltaRect.top;

            // Apply new dimensions and position
            Object.assign(target.style, {
              width: `${Math.max(event.rect.width, minWidth)}px`,
              height: `${Math.max(event.rect.height, minHeight)}px`,
              transform: `translate(${currentX}px, ${currentY}px)`
            });

            // Update dataset
            target.dataset.x = currentX;
            target.dataset.y = currentY;
          },
          end(event) {
            const target = event.target;
            const deltaX = parseFloat(target.dataset.x) || 0;
            const deltaY = parseFloat(target.dataset.y) || 0;

            // Calculate final position and size
            const finalX = Math.max(0, positionX + deltaX);
            const finalY = Math.max(0, positionY + deltaY);
            const finalWidth = Math.max(event.rect.width, minWidth);
            const finalHeight = Math.max(event.rect.height, minHeight);

            // Update both position and size in store
            dispatch(updateWindowPosition({
              windowId,
              x: finalX,
              y: finalY
            }));

            dispatch(updateWindowSize({
              windowId,
              width: finalWidth,
              height: finalHeight
            }));

            // Reset transform and dataset immediately
            target.style.transform = '';
            target.style.width = '';
            target.style.height = '';
            target.dataset.x = 0;
            target.dataset.y = 0;
          }
        }
      });

    isInteractSetup.current = true;

    return () => {
      interact(windowElement).unset();
      isInteractSetup.current = false;
    };
  }, [windowId, positionX, positionY, width, height, minWidth, minHeight, fullscreen, dispatch]);

  // Handle window focus when clicked
  const handleWindowClick = () => {
    dispatch(focusWindow(windowId));
  };

  const handleClose = () => dispatch(closeWindow(windowId));
  const handleMinimize = () => dispatch(minimizeWindow(windowId));
  const handleMaximize = () => dispatch(maximizeWindow(windowId));

  const ContentComponent = contentComponents[windowContent];

  const windowStyle = {
    position: 'absolute',
    left: fullscreen ? 0 : positionX,
    top: fullscreen ? 0 : positionY,
    width: fullscreen ? '100vw' : width,
    height: fullscreen ? '100vh' : height,
    zIndex: zIndex,
    minWidth: fullscreen ? 'auto' : minWidth,
    minHeight: fullscreen ? 'auto' : minHeight,
    ...(fullscreen && {
      position: 'fixed',
      transform: 'none'
    })
  };

  const contentStyle = {
    paddingTop: windowContentPadding?.top,
    paddingRight: windowContentPadding?.right,
    paddingBottom: windowContentPadding?.bottom,
    paddingLeft: windowContentPadding?.left
  };

  return (
    <div
      ref={windowRef}
      className={`window ${fullscreen ? 'fullscreen' : ''}`}
      style={windowStyle}
      data-window-id={windowId}
      data-x="0"
      data-y="0"
      onClick={handleWindowClick}
    >
      <div className="window-header" style={{ cursor: fullscreen ? 'default' : 'grab' }}>
        <div className="window-title-bar">
          <div className="window-title-left">
            <img
              src={`/src/assets/icons/${iconImage}`}
              alt={altText}
              className="window-header-icon"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'inline';
              }}
            />
            <span className="icon-fallback" style={{ display: 'none' }}>📱</span>
            <span className="window-title">{displayName}</span>
          </div>
          <div className="window-controls">
            <button 
              className="window-btn minimize-btn" 
              onClick={handleMinimize}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <Minus size={14} />
            </button>
            <button 
              className="window-btn maximize-btn" 
              onClick={handleMaximize}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <Square size={14} />
            </button>
            <button 
              className="window-btn close-btn" 
              onClick={handleClose}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <X size={14} />
            </button>
          </div>
        </div>
      </div>
      <div className="window-content" style={contentStyle}>
        {ContentComponent ? <ContentComponent /> : <div>Content not found</div>}
      </div>
    </div>
  );
};

export default Window;
