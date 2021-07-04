import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import IndexCard from './index-card'
import SettingsCard from './settings-card'
import { TextField, Button } from '@material-ui/core'
const useStyles = makeStyles(theme => ({
  fontStyle: {
    color: '#9ee2ff'
  },
  midItem: {
    marginTop: '1rem',
    marginBottom: '6rem'
  },
  item: {
    flex: 1,
    display: 'flex',
    alignItems: 'center'
  },
  coverLeft: {
    background: 'linear-gradient(to bottom, #307AFF, 50%, #46cdff)',
    alignItems: 'center',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    '@media (max-width: 700px)': {
      height: '500px'
    }
  },
  coverContent: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    color: '#fff',
    position: 'relative'
  },
  coverRight: {
    position: 'relative',
    flex: 1,
    display: 'flex',
    '@media (max-width: 700px)': {
      height: '500px'
    }
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    display: 'flex',
    minWidth: 700,
    minHeight: 500,
    maxHeight: 500,
    borderRadius: '10px',
    boxShadow: '0px 6px 18px 0px rgba(0,0,0,0.2)',
    '@media (max-width: 700px)': {
      minWidth: 'unset',
      maxHeight: 'unset'
    }
  },
  input: {
    maxWidth: '250px',
    minWidth: '250px',
    alignSelf: 'center'
  },
  grid: {
    margin: '0 !important'
  },
  button: {
    height: '44px',
    width: '260px',
    '&:hover': {
      backgroundColor: '#307AFF'
    },
    margin: theme.spacing(1),
    marginTop: '33px',
    backgroundColor: '#44a2fc',
    borderRadius: '30px'
  }
}))

export default function CardPage () {
  useEffect(() => {
    const idField = document.querySelector('#App_ID')
    const tokenField = document.querySelector('#App_TOKEN')
    idField.placeholder = `App ID (${window.localStorage.getItem('Sample_App_ID')})`
    tokenField.placeholder = `App TOKEN (${window.localStorage.getItem('Sample_App_TOKEN')})`
  })

  const classes = useStyles()

  const setAuthentication = () => {
    const idField = document.querySelector('#App_ID')
    const tokenField = document.querySelector('#App_TOKEN')
    if (idField.value) { window.localStorage.setItem('Sample_App_ID', idField.value) }
    if (tokenField.value) { window.localStorage.setItem('Sample_App_TOKEN', tokenField.value) }
    idField.value = ''
    tokenField.value = ''
    idField.placeholder = `App ID (${window.localStorage.getItem('Sample_App_ID')})`
    tokenField.placeholder = `App TOKEN (${window.localStorage.getItem('Sample_App_TOKEN')})`
    window.location.reload()
  }

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Card className={classes.card}>
        <Box display="flex" flex="1" flexWrap="wrap">
          <div className={classes.coverLeft}>
            <div className={classes.item}>
              <svg width="120" height="130" viewBox="0 0 37 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.5 27.07c1.1 3.233 3.8-.605 4.4-2.221h.5l-2.7 7.575-3 7.576L4.1 4.747S2.9.808 0 .808V0h13.1v.808c0-.1-1.4.101-1.4.101-.9.101-1.9.303-2.4 1.01-.5.707.5 2.828 1 4.142l8.2 21.01zM37 0v.707c-3.2 0-6.3 5.96-8.6 11.414h-.5C29.3 6.768 29.9.606 24 .606V0h13z" fill="#ECBE71"></path></svg>
            </div>
            <div className={classes.item}>
              <div className={classes.coverContent}>
                <TextField id="App_ID" fontSize="h6.fontSize" className={classes.fontStyle} placeholder="App ID"/>
                <TextField id="App_TOKEN" fontSize="h6.fontSize" className={classes.fontStyle} placeholder="App TOKEN"/>
                <Button variant="contained" color="primary" onClick={setAuthentication}>Set Authentication</Button>
                {/* <Box textAlign="center" fontWeight="fontWeightRegular" fontSize="h4.fontSize" className={classes.midItem}>OPEN LIVE</Box> */}
                {/* <Box textAlign="center" fontWeight="fontWeightRegular" className={classes.fontStyle} style={{color: "white", fontSize: "17px"}}>Agora Web SDK: {AgoraRTC.VERSION}</Box> */}
                <Box textAlign="center" fontWeight="fontWeightRegular" className={classes.fontStyle} fontSize="h7.fontSize">Powered by Agora.io</Box>
              </div>
            </div>
          </div>
          <div className={classes.coverRight}>
            <Switch>
              <Route exact path="/" component={IndexCard}></Route>
              <Route path="/setting" component={SettingsCard}></Route>
            </Switch>
          </div>
        </Box>
      </Card>
    </Box>
  )
}
