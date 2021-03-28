import { Button, Card, CardContent, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import { db } from '../firebase/firebaseconfig';
import './Todo.css';
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2)
    },
    deletebtn :{
        margin:'10px'
    },
}))
export const TodoList = (props)=>{
    const items = props.todos
    const classes = useStyles()

    const deleteTodo = (id)=>{
        db.collection('mine').doc(id).delete()
    }


    return (
        <div className={classes.root}>
            <Grid
                container
                spacing={2}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
            >
                {items.map(elem => (
                    <Grid item xs={12} sm={6} md={3} key={elem.id}>
                        <Card>
                            <p>{elem.date}</p>
                            <CardContent>
                                <p>{elem.todo}</p>
                            </CardContent>
                            <Button onClick={()=>deleteTodo(elem.id)} className={classes.deletebtn} variant="contained" color="secondary">
                                DELETE
                            </Button>
                        </Card>
                     </Grid>
                ))}
            </Grid>
        </div>
    )
}