import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>


                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Employeelist
                        </Typography>

                        <Button color="inherit"><Link style={{ textDecoration: 'none', color: 'white' }} onClick={() => sessionStorage.removeItem("token") } to={'/'}>Logout</Link></Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    )
}

export default Navbar
