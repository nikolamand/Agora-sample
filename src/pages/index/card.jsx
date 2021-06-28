import React from 'react'
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
    flexDirection: 'column'
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
    display: 'flex'
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
    boxShadow: '0px 6px 18px 0px rgba(0,0,0,0.2)'
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
  const classes = useStyles()

  const setAuthentication = () => {
    const idField = document.querySelector('#App_ID')
    const tokenField = document.querySelector('#App_TOKEN')
    window.localStorage.setItem('Sample_App_ID', idField.value)
    window.localStorage.setItem('Sample_App_TOKEN', tokenField.value)
    idField.value = ''
    tokenField.value = ''
    idField.placeholder = `App ID (${window.localStorage.getItem('Sample_App_ID')})`
    tokenField.placeholder = `App TOKEN (${window.localStorage.getItem('Sample_App_TOKEN')})`
    window.location.reload()
  }

  const handleFocus = (e, type) => {
    if (window.localStorage.getItem('Sample_App_' + type)) {
      e.target.placeholder = `App ${type} (${window.localStorage.getItem('Sample_App_' + type)})`
    }
  }

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Card className={classes.card}>
        <Box display="flex" flex="1">
          <div className={classes.coverLeft}>
            <div className={classes.item}>
              <div className='cover-image' />
            </div>
            <div className={classes.item}>
              <div className={classes.coverContent}>
                <TextField id="App_ID" fontSize="h6.fontSize" className={classes.fontStyle} placeholder="App ID"
                  onFocus={e => { handleFocus(e, 'ID') }}
                />
                <TextField id="App_TOKEN" fontSize="h6.fontSize" className={classes.fontStyle} placeholder="App TOKEN"
                  onFocus={e => { handleFocus(e, 'TOKEN') }}
                />
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
