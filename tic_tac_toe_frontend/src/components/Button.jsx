import React from "react";

/**
 * Example usage:
 * 
 * import Button from "./components/Button";
 * 
 * <Button
 *   variant="primary"
 *   size="md"
 *   fullWidth
 *   disabled={false}
 *   loading={false}
 *   onClick={() => alert("Clicked!")}
 * >
 *   Click Me
 * </Button>
 */

/**
 * PUBLIC_INTERFACE
 * Button component for consistent, accessible buttons.
 * 
 * @param {object} props - Button props
 * @param {React.ReactNode} props.children - Button label or content
 * @param {'primary'|'secondary'|'ghost'} [props.variant='primary'] - Visual variant
 * @param {'sm'|'md'|'lg'} [props.size='md'] - Button size
 * @param {boolean} [props.disabled=false] - Disabled state
 * @param {boolean} [props.fullWidth=false] - Stretch to container width
 * @param {boolean} [props.loading=false] - Show loading spinner and aria-busy
 * @param {string} [props.className] - Extra className(s) for extension
 * @param {function} [props.onClick] - onClick handler
 * @param {...object} [props.rest] - Other HTML button props
 * @returns {JSX.Element}
 */
export default function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  fullWidth = false,
  loading = false,
  className = "",
  ...rest
}) {
  // Accent colors for project style guide
  const palette = {
    primary: "#3b82f6",
    secondary: "#64748b",
    ghost: "transparent",
    text: "#111827",
    white: "#fff",
    success: "#06b6d4",
    error: "#EF4444",
  };

  // Variant styles
  const variants = {
    primary: {
      background: palette.primary,
      color: palette.white,
      border: `1px solid ${palette.primary}`,
      hover: {
        background: "#2563eb",
        border: `1px solid #2563eb`,
      },
      active: {
        background: "#1d4ed8",
        border: `1px solid #1d4ed8`,
      },
      disabled: {
        background: "#bfdbfe",
        color: "#b1b8c8",
        border: `1px solid #bfdbfe`,
      },
    },
    secondary: {
      background: palette.secondary,
      color: palette.white,
      border: `1px solid ${palette.secondary}`,
      hover: {
        background: "#4b5563",
        border: `1px solid #4b5563`,
      },
      active: {
        background: "#374151",
        border: `1px solid #374151`,
      },
      disabled: {
        background: "#e5e7eb",
        color: "#b1b8c8",
        border: `1px solid #e5e7eb`,
      },
    },
    ghost: {
      background: "transparent",
      color: palette.primary,
      border: `1px solid ${palette.primary}`,
      hover: {
        background: "#f1f5f9",
      },
      active: {
        background: "#e0e7ef",
      },
      disabled: {
        color: "#b1b8c8",
        border: "1px solid #e5e7eb",
      },
    },
  };

  // Size styles
  const sizes = {
    sm: {
      fontSize: "0.875rem",
      padding: "0.375rem 0.75rem",
      borderRadius: "6px",
      minHeight: "32px",
    },
    md: {
      fontSize: "1rem",
      padding: "0.5rem 1.25rem",
      borderRadius: "8px",
      minHeight: "40px",
    },
    lg: {
      fontSize: "1.125rem",
      padding: "0.75rem 1.75rem",
      borderRadius: "10px",
      minHeight: "48px",
    },
  };

  // Generate style for current variant and state
  const style = {
    ...sizes[size],
    ...variants[variant],
    width: fullWidth ? "100%" : undefined,
    outline: "none",
    fontFamily: "inherit",
    fontWeight: 600,
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: disabled || loading ? "not-allowed" : "pointer",
    opacity: disabled ? 0.7 : 1,
    transition: "background 0.15s,border 0.15s,box-shadow 0.1s,color 0.12s",
    boxShadow: "0 1px 3px 0 rgba(32,40,89,0.04)",
    userSelect: "none",
  };

  // Adds accessibility focus ring when focused via keyboard (focus-visible)
  const focusRingStyle = `
    .kavia-btn:focus-visible {
      outline: 2px solid ${palette.success};
      outline-offset: 2px;
      box-shadow: 0 0 0 2px #dbeafe;
      z-index: 1;
    }
    .kavia-btn:active {
      filter: brightness(0.95);
    }
    .kavia-btn:disabled {
      pointer-events: none;
    }
    .kavia-btn__spinner {
      display: inline-block;
      margin-right: 8px;
      vertical-align: middle;
    }
  `;

  // Dynamic effect for hover and active
  function getDynamicStyle(isHover, isActive) {
    if (disabled || loading) {
      return {
        ...(variants[variant].disabled || {}),
        cursor: "not-allowed",
        filter: "grayscale(50%)",
      };
    }
    if (isActive && variants[variant].active)
      return { ...variants[variant].active };
    if (isHover && variants[variant].hover)
      return { ...variants[variant].hover };
    return {};
  }

  // Internal state for CSS-in-JS hover/active effects
  const [effect, setEffect] = React.useState({});
  const handleMouseEnter = () => setEffect(getDynamicStyle(true, false));
  const handleMouseLeave = () => setEffect({});
  const handleMouseDown = () => setEffect(getDynamicStyle(false, true));
  const handleMouseUp = () => setEffect({});

  // Render minimal inline spinner for loading
  const Spinner = (
    <span
      className="kavia-btn__spinner"
      style={{
        width: "1em",
        height: "1em",
        display: "inline-block",
        marginRight: "8px",
        border: "2px solid #cbd5e1",
        borderTop: `2px solid ${palette.primary}`,
        borderRadius: "50%",
        animation: "kavia-spin 0.7s linear infinite",
      }}
      aria-hidden="true"
    />
  );

  // Create keyframes for spinner
  React.useEffect(() => {
    const spinnerKeyframes = `
      @keyframes kavia-spin {
        0% { transform: rotate(0deg);}
        100% { transform: rotate(360deg);}
      }
    `;
    if (!document.getElementById("kavia-btn-style")) {
      const styleTag = document.createElement("style");
      styleTag.id = "kavia-btn-style";
      styleTag.innerHTML = focusRingStyle + spinnerKeyframes;
      document.head.appendChild(styleTag);
    }
  }, []); // one time

  // Combine className for style extension
  const baseClass = `kavia-btn${className ? " " + className : ""}`;

  return (
    <button
      type={rest.type || "button"}
      aria-busy={loading ? "true" : undefined}
      disabled={disabled || loading}
      tabIndex={0}
      className={baseClass}
      style={{ ...style, ...effect }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      {...rest}
    >
      {loading && Spinner}
      {children}
    </button>
  );
}
