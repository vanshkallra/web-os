import React, { useState, useEffect, useRef, useCallback } from 'react';
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

// Import content components
import About from '../views/About';
import Contact from '../views/Contact';
import Skills from '../views/Skills';
import Projects from '../views/Projects';
import Resume from '../views/Resume';
import AIAssistant from '../views/AIAssistant';

const contentComponents = {
  About,
  Contact,
  Skills,
  Projects,
  Resume,
  AIAssistant
};

const Window = ({ windowData }) => {
  const dispatch = useDispatch();
  const windowRef = useRef(null);

  const {
    windowId,
    displayName,
    windowContent,
    windowContentPadding,
    positionX: initialX,
    positionY: initialY,
    width: initialWidth,
    height: initialHeight,
    minWidth,
    minHeight,
    fullscreen,
    iconImage,
    altText,
    zIndex
  } = windowData;

  // Local state for drag and drop
  const [x, setX] = useState(initialX || 50);
  const [y, setY] = useState(initialY || 50);
  const [width, setWidth] = useState(initialWidth || 600);
  const [height, setHeight] = useState(initialHeight || 400);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffsetX, setDragOffsetX] = useState(0);
  const [dragOffsetY, setDragOffsetY] = useState(0);

  // Update local state when props change
  useEffect(() => {
    setX(initialX || 50);
    setY(initialY || 50);
    setWidth(initialWidth || 600);
    setHeight(initialHeight || 400);
  }, [initialX, initialY, initialWidth, initialHeight]);

  // Ensure window stays within bounds
  useEffect(() => {
    const clampPosition = () => {
      if (windowRef.current && !fullscreen) {
        const rect = windowRef.current.getBoundingClientRect();
        const newX = Math.min(Math.max(0, x), window.innerWidth - rect.width);
        const newY = Math.min(Math.max(0, y), window.innerHeight - rect.height);
        if (newX !== x || newY !== y) {
          setX(newX);
          setY(newY);
        }
      }
    };
    clampPosition();
    window.addEventListener('resize', clampPosition);
    return () => window.removeEventListener('resize', clampPosition);
  }, [x, y, fullscreen]);

  // Handle window focus
  const handleFocus = useCallback(() => {
    dispatch(focusWindow(windowId));
  }, [dispatch, windowId]);

  // Drag functionality
  const startDrag = useCallback((e) => {
    // Only allow dragging from header, not from buttons or resize handles
    if (e.target.tagName !== 'BUTTON' && 
        !e.target.closest('.window-controls') && 
        !e.target.classList.contains('resize-handle') &&
        !fullscreen) {
      setIsDragging(true);
      setDragOffsetX(e.clientX - x);
      setDragOffsetY(e.clientY - y);
      handleFocus();
    }
  }, [x, y, handleFocus, fullscreen]);

  const onDrag = useCallback((e) => {
    if (isDragging && !fullscreen) {
      const newX = e.clientX - dragOffsetX;
      const newY = e.clientY - dragOffsetY;
      setX(newX);
      setY(newY);
    }
  }, [isDragging, dragOffsetX, dragOffsetY, fullscreen]);

  const stopDrag = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      // Update Redux store with final position
      dispatch(updateWindowPosition({
        windowId,
        x: x,
        y: y
      }));
    }
  }, [isDragging, dispatch, windowId, x, y]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', onDrag);
      window.addEventListener('mouseup', stopDrag);
    } else {
      window.removeEventListener('mousemove', onDrag);
      window.removeEventListener('mouseup', stopDrag);
    }
    return () => {
      window.removeEventListener('mousemove', onDrag);
      window.removeEventListener('mouseup', stopDrag);
    };
  }, [isDragging, onDrag, stopDrag]);

  // Resize functionality
  const startResize = useCallback((e, direction) => {
    e.stopPropagation();
    handleFocus();

    const initialMouseX = e.clientX;
    const initialMouseY = e.clientY;
    const initialWidth = windowRef.current.offsetWidth;
    const initialHeight = windowRef.current.offsetHeight;
    const initialX = windowRef.current.offsetLeft;
    const initialY = windowRef.current.offsetTop;

    const doResize = (moveEvent) => {
      const dx = moveEvent.clientX - initialMouseX;
      const dy = moveEvent.clientY - initialMouseY;

      let newWidth = width;
      let newHeight = height;
      let newX = x;
      let newY = y;

      switch (direction) {
        case 'right':
          newWidth = Math.max(minWidth || 200, initialWidth + dx);
          break;
        case 'bottom':
          newHeight = Math.max(minHeight || 100, initialHeight + dy);
          break;
        case 'bottom-right':
          newWidth = Math.max(minWidth || 200, initialWidth + dx);
          newHeight = Math.max(minHeight || 100, initialHeight + dy);
          break;
        case 'left':
          newWidth = Math.max(minWidth || 200, initialWidth - dx);
          newX = initialX + dx;
          break;
        case 'top':
          newHeight = Math.max(minHeight || 100, initialHeight - dy);
          newY = initialY + dy;
          break;
        case 'top-left':
          newWidth = Math.max(minWidth || 200, initialWidth - dx);
          newHeight = Math.max(minHeight || 100, initialHeight - dy);
          newX = initialX + dx;
          newY = initialY + dy;
          break;
        case 'top-right':
          newWidth = Math.max(minWidth || 200, initialWidth + dx);
          newHeight = Math.max(minHeight || 100, initialHeight - dy);
          newY = initialY + dy;
          break;
        case 'bottom-left':
          newWidth = Math.max(minWidth || 200, initialWidth - dx);
          newHeight = Math.max(minHeight || 100, initialHeight + dy);
          newX = initialX + dx;
          break;
        default:
          break;
      }
      setWidth(newWidth);
      setHeight(newHeight);
      setX(newX);
      setY(newY);
    };

    const stopResize = () => {
      window.removeEventListener('mousemove', doResize);
      window.removeEventListener('mouseup', stopResize);
      
      // Update Redux store with final size and position
      dispatch(updateWindowSize({
        windowId,
        width: width,
        height: height
      }));
      dispatch(updateWindowPosition({
        windowId,
        x: x,
        y: y
      }));
    };

    window.addEventListener('mousemove', doResize);
    window.addEventListener('mouseup', stopResize);
  }, [width, height, x, y, handleFocus, minWidth, minHeight, dispatch, windowId]);

  // Window control handlers
  const handleClose = () => dispatch(closeWindow(windowId));
  const handleMinimize = () => dispatch(minimizeWindow(windowId));
  const handleMaximize = () => dispatch(maximizeWindow(windowId));

  const ContentComponent = contentComponents[windowContent];

  const windowStyle = {
    position: 'absolute',
    left: fullscreen ? 0 : x,
    top: fullscreen ? 0 : y,
    width: fullscreen ? '100vw' : width,
    height: fullscreen ? '100%' : height,
    zIndex: zIndex,
    minWidth: fullscreen ? 'auto' : minWidth,
    minHeight: fullscreen ? 'auto' : minHeight,
    cursor: isDragging ? 'grabbing' : 'default',
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
      onClick={handleFocus}
    >
      <div 
        className="window-header" 
        style={{ cursor: fullscreen ? 'default' : (isDragging ? 'grabbing' : 'grab') }}
        onMouseDown={startDrag}
      >
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

      {/* Resize handles - only show when not fullscreen */}
      {!fullscreen && (
        <>
          {/* Corner handles */}
          <div 
            className="resize-handle resize-handle-top-left"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '10px',
              height: '10px',
              cursor: 'nw-resize',
              zIndex: 10
            }}
            onMouseDown={(e) => startResize(e, 'top-left')}
          />
          <div 
            className="resize-handle resize-handle-top-right"
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '10px',
              height: '10px',
              cursor: 'ne-resize',
              zIndex: 10
            }}
            onMouseDown={(e) => startResize(e, 'top-right')}
          />
          <div 
            className="resize-handle resize-handle-bottom-left"
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '10px',
              height: '10px',
              cursor: 'sw-resize',
              zIndex: 10
            }}
            onMouseDown={(e) => startResize(e, 'bottom-left')}
          />
          <div 
            className="resize-handle resize-handle-bottom-right"
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: '10px',
              height: '10px',
              cursor: 'se-resize',
              zIndex: 10
            }}
            onMouseDown={(e) => startResize(e, 'bottom-right')}
          />
          
          {/* Edge handles */}
          <div 
            className="resize-handle resize-handle-top"
            style={{
              position: 'absolute',
              top: 0,
              left: '10px',
              right: '10px',
              height: '5px',
              cursor: 'n-resize',
              zIndex: 10
            }}
            onMouseDown={(e) => startResize(e, 'top')}
          />
          <div 
            className="resize-handle resize-handle-bottom"
            style={{
              position: 'absolute',
              bottom: 0,
              left: '10px',
              right: '10px',
              height: '5px',
              cursor: 's-resize',
              zIndex: 10
            }}
            onMouseDown={(e) => startResize(e, 'bottom')}
          />
          <div 
            className="resize-handle resize-handle-left"
            style={{
              position: 'absolute',
              left: 0,
              top: '10px',
              bottom: '10px',
              width: '5px',
              cursor: 'w-resize',
              zIndex: 10
            }}
            onMouseDown={(e) => startResize(e, 'left')}
          />
          <div 
            className="resize-handle resize-handle-right"
            style={{
              position: 'absolute',
              right: 0,
              top: '10px',
              bottom: '10px',
              width: '5px',
              cursor: 'e-resize',
              zIndex: 10
            }}
            onMouseDown={(e) => startResize(e, 'right')}
          />
        </>
      )}
    </div>
  );
};

export default Window;