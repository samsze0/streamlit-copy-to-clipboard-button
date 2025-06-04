import {
  Streamlit,
  withStreamlitConnection,
  ComponentProps,
} from "streamlit-component-lib"
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  ReactElement,
} from "react"

// https://github.com/streamlit/streamlit/blob/develop/frontend/lib/src/components/widgets/Button/Button.tsx
// https://github.com/streamlit/streamlit/blob/develop/frontend/lib/src/components/shared/BaseButton/BaseButton.tsx

function CopyToClipboard({
  args,
  disabled,
  // https://docs.streamlit.io/develop/concepts/configuration/theming
  theme,
}: ComponentProps): ReactElement {
  const { text, label_before_copy, label_after_copy } = args as {
    text: string
    label_before_copy: string
    label_after_copy: string
  }

  const [isFocused, setIsFocused] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const [numClicks, setNumClicks] = useState(0)
  const [isJustCopied, setIsJustCopied] = useState(false)

  const style: React.CSSProperties = useMemo(() => {
    if (!theme) return {}

    let baseStyle: React.CSSProperties = {
      outline: "none",
      borderRadius: "0.5rem",
      textDecoration: "none",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "rgba(250, 250, 250, 0.2)",
      backgroundColor: theme.backgroundColor,
      color: theme.textColor,
      cursor: "pointer",
      fontFamily: theme.font,
      padding: "0.25rem 0.75rem",
      lineHeight: "1.6",
      fontWeight: "400",
      wordBreak: "break-word",
      minHeight: "2.5rem",
      userSelect: "none",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "auto",
    }

    if (isHovered && !disabled) {
      baseStyle = {
        ...baseStyle,
        color: theme.primaryColor,
        borderColor: theme.primaryColor,
      }
    }

    if (isPressed && !disabled) {
      baseStyle = {
        ...baseStyle,
        backgroundColor: theme.primaryColor,
        color: theme.textColor,
      }
    }

    return baseStyle
  }, [theme, isHovered, isPressed, disabled])

  useEffect(() => {
    Streamlit.setComponentValue(numClicks)
  }, [numClicks])

  // setFrameHeight should be called on first render and evertime the size might change (e.g. due to a DOM update).
  // Adding the style and theme here since they might effect the visual size of the component.
  useEffect(() => {
    Streamlit.setFrameHeight()
  }, [style, theme])

  const onClicked = useCallback((): void => {
    setNumClicks((prevNumClicks) => prevNumClicks + 1)

    navigator.clipboard.writeText(text).catch((err) => {
      console.error("Failed to copy text: ", err)
    })

    setIsJustCopied(true)
    setTimeout(() => {
      setIsJustCopied(false)
    }, 1000)
  }, [text])

  const onFocus = useCallback((): void => {
    setIsFocused(true)
  }, [])

  const onBlur = useCallback((): void => {
    setIsFocused(false)
  }, [])

  const onMouseEnter = useCallback((): void => {
    setIsHovered(true)
  }, [])

  const onMouseLeave = useCallback((): void => {
    setIsHovered(false)
  }, [])

  const onMouseDown = useCallback((): void => {
    setIsPressed(true)
  }, [])

  const onMouseUp = useCallback((): void => {
    setIsPressed(false)
  }, [])

  return (
    <button
      style={style}
      onClick={onClicked}
      disabled={disabled}
      onFocus={onFocus}
      onBlur={onBlur}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      {isJustCopied
        ? label_after_copy ?? "Copied"
        : label_before_copy ?? "Copy to clipboard"}
    </button>
  )
}

// "withStreamlitConnection" is a wrapper function. It bootstraps the
// connection between your component and the Streamlit app, and handles
// passing arguments from Python -> Component.
//
// You don't need to edit withStreamlitConnection (but you're welcome to!).
export default withStreamlitConnection(CopyToClipboard)
