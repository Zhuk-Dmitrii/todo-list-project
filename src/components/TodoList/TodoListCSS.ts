export const customCSS = {
  editableSpan: {
    textField: {
      '&.MuiTextField-root': {
        width: '100%',
      },
      '& .MuiInput-root': {
        height: '28px',
      },
      '& .MuiInput-root::before': {
        bottom: '-5px',
      },
      '& .MuiInput-root::after': {
        bottom: '-5px',
      },
      '& .MuiInput-input': {
        padding: '0px',
      },
    },
    typography: {
      '&.MuiTypography-root': {
        display: 'inline-block',
        lineHeight: '28px',
        cursor: 'pointer',
      },
    },
  },
}
