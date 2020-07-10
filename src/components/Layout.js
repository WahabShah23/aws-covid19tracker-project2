import React, {useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: '25px',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  padding: {
    padding: '25px',
  },
  active: {
    borderBottom: '5px solid orange',
  },
  total: {
    borderBottom: '5px solid blue',
  },
  deaths: {
    borderBottom: '5px solid red',
  },
  recover: {
    borderBottom: '5px solid green',
  },
}));

const useStylesTypography = makeStyles({
  root: {
    width: '100%',
    maxWidth: 500,
  },
});


export default function Layout() {
  const classes = useStyles();
  const classesTypography = useStylesTypography();

  // For data
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);


  useEffect( () => {
    async function fetchGlobalData() {
      setLoading(true);
      const apiResp = await fetch('https://api.thevirustracker.com/free-api?global=stats');
      console.log({apiResp});
      const dataFromApi = await apiResp.json();
      console.log({dataFromApi});
      setData(dataFromApi);
      setLoading(false);
    }
    fetchGlobalData();
  }, [] );


  if(loading) {
    return (
        <h2 style={{ margin: '0 auto '}} >Loading Data...</h2>
    )
  }


  return (
    <div className={classes.root}>

        <Grid container spacing={3}>

            <Grid item xs={6} sm={3}>
                <Paper className={classes.paper + ' ' + classes.total} elevation={2}>
                    <Typography className={classesTypography.root} variant="h6" gutterBottom>
                        Total Cases
                    </Typography>
                    <Typography className={classesTypography.root} variant="h3" gutterBottom>
                        { data && data.results && (data.results[0].total_cases).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }
                    </Typography>
                </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
                <Paper className={classes.paper + ' ' + classes.active} elevation={2}>
                    <Typography className={classesTypography.root} variant="h6" gutterBottom>
                        Active Cases
                    </Typography>
                    <Typography className={classesTypography.root} variant="h3" gutterBottom>
                        { data && data.results && (data.results[0].total_active_cases + data.results[0].total_unresolved).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }
                    </Typography>
                </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
                <Paper className={classes.paper + ' ' + classes.recover} elevation={2}>
                    <Typography className={classesTypography.root} variant="h6" gutterBottom>
                        Recovered
                    </Typography>
                    <Typography className={classesTypography.root} variant="h3" gutterBottom>
                        { data && data.results && (data.results[0].total_recovered).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }
                    </Typography>
                </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
                <Paper className={classes.paper + ' ' + classes.deaths} elevation={2}>
                    <Typography className={classesTypography.root} variant="h6" gutterBottom>
                        Muertos
                    </Typography>
                    <Typography className={classesTypography.root} variant="h3" gutterBottom>
                        { data && data.results && (data.results[0].total_deaths).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }
                    </Typography>
                </Paper>
            </Grid>

        </Grid>

    </div>
  );
}

