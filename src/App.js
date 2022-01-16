import { ThemeProvider } from '@material-ui/core'
import React from 'react'
import Test from './components/Test'
import { Theme } from './components/Theme'

const App = () => {
  return (
    <>
      <ThemeProvider theme={Theme}>
        <Test />
      </ThemeProvider>
    </>
  )
}

export default App
