"use client";
import React, { useState, useEffect } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorColor, setCursorColor] = useState("#000000");

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Check if we're hovering over a clickable element
      const target = e.target;
      const hoveredElement = target.closest(
        'a, button, [role="button"], input, select, [tabindex="0"],h2'
      );
      setIsPointer(!!hoveredElement);

      // Update cursor color when hovering over a clickable element
      if (hoveredElement) {
        const cursorColor = hoveredElement.getAttribute("data-cursor-color");
        if (cursorColor) {
          setCursorColor(cursorColor);
        }
      }
      // Show cursor when it moves
      if (!isVisible) {
        setIsVisible(true);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  return (
    <>
      <div
        className={`custom-cursor-ring fixed pointer-events-none transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, -50%)",
          width: isPointer ? "180px" : "20px",
          height: isPointer ? "180px" : "20px",
          borderRadius: "50%",
          mixBlendMode: "difference",
          transition:
            "width 0.2s ease-out, height 0.2s ease-out, transform 0.01s linear, background-color 0.2s ease",
          backgroundColor: isPointer ? cursorColor : "#000000",
        }}
      />
    </>
  );
};

export default CustomCursor;
