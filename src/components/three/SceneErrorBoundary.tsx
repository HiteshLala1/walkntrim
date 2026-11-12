"use client";

import { Component, useEffect, useState, type ReactNode } from "react";

interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class SceneErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  override render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export function useCanRender3D(minWidth = 768): {
  ready: boolean;
  canRender: boolean;
} {
  const [state, setState] = useState({ ready: false, canRender: false });

  useEffect(() => {
    const check = () => {
      const wideEnough = window.innerWidth >= minWidth;
      let hasWebGL = false;
      try {
        const canvas = document.createElement("canvas");
        hasWebGL = Boolean(
          window.WebGLRenderingContext &&
            (canvas.getContext("webgl2") ||
              canvas.getContext("webgl") ||
              canvas.getContext("experimental-webgl"))
        );
      } catch {
        hasWebGL = false;
      }
      setState({ ready: true, canRender: wideEnough && hasWebGL });
    };

    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [minWidth]);

  return state;
}
