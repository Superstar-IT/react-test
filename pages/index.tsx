import { Paper, Grid, TextField, Button } from '@material-ui/core'
import { useState } from 'react'

const Home = (): JSX.Element => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (): void => {
    // make an api request for an http://localhost:3000/api/login endpoint
    // body request example { username: 'test', password: 'test }
    // please, display server errors somewhere
    // username 'ddi' will return token, otherwise -- error message
    const url = 'http://localhost:3000/api/login'
    const data = {
      username: username,
      password: password,
    }
    fetch(url, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.token) {
          localStorage.setItem('ddnxt:token', result.token)
          window.location.href = '/table'
        } else if (result.error) {
          alert(result.error)
        }
      })
  }

  return (
    <Grid container spacing={0} direction="column" alignItems="center" justify="center" style={{ minHeight: '100vh' }}>
      <Paper style={{ padding: 30 }}>
        <Grid container>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item md={true} sm={true} xs={true}>
              <TextField
                id="username"
                label="Username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                autoFocus
                required
              />
            </Grid>
          </Grid>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item md={true} sm={true} xs={true}>
              <TextField
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                required
              />
            </Grid>
          </Grid>
          <Grid container justify="center" style={{ marginTop: '10px' }}>
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              style={{ textTransform: 'none' }}
              onClick={() => handleSubmit()}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}

export default Home
