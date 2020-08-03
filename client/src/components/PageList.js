import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

// Material Imports
import CircularProgress from '@material-ui/core/CircularProgress';
import { Box, Container, Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button, withStyles, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

// Actions
import { fetchPages, removePage } from '../actions';
import { AvatarImage } from './AvatarImage';

const styles = (theme) => ({
    root: {
        position: 'relative'
    },
    media: {
        height: 160,
    },
    addButton: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
    },
    deleteButton: {
        position: 'absolute',
        right: -10,
        top: -10,
        zIndex: 10
    }
});

class PageList extends React.Component {
    constructor(props) {
        super(props);

        this.onPageClick = this.onPageClick.bind(this);
    }

    componentWillMount() {
        const { fetchPages } = this.props;
        fetchPages({});
    }

    onRemovePage(id) {
        const { removePage } = this.props;

        var confirmed = confirm(`Are you sure you want to remove this page?`)

        if (confirmed)
            removePage(id);
    }

    onPageClick(id) {
        this.props.history.push(`/pages/${id}`);
    }

    render() {
        let { loadingPages, pages, classes } = this.props;

        return (
            <Container fixed>
                <Box p={2}>
                    <Box>
                        <label className={classes.addButton}>Pages</label>
                        <Fab href="/pages/add" color="primary" aria-label="add" size="small">
                            <AddIcon />
                        </Fab>
                    </Box>

                    {loadingPages &&
                        <CircularProgress />
                    }

                    {!loadingPages &&
                        <Box textAlign="left">
                            {pages.map((page, index) => (
                                <Box p={1} key={index}>
                                    <Card className={classes.root}>
                                        <Fab onClick={() => this.onRemovePage(page._id)} color="secondary" aria-label="edit" className={classes.deleteButton}>
                                            <DeleteIcon />
                                        </Fab>
                                        <CardActionArea onClick={() => this.onPageClick(page._id)}>
                                            <CardMedia
                                                className={classes.media}
                                                image={page.banner}
                                                title={page.title}
                                            />

                                            <CardContent>
                                                <Box display="flex">
                                                    <Box m={1} component="div" display="inline">
                                                        <AvatarImage src={page.avatar} />
                                                    </Box>

                                                    <Box component="div" display="inline">
                                                        <Typography variant="h5">
                                                            {page.title}
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary">
                                                            {page.description}
                                                        </Typography>
                                                    </Box>
                                                </Box>

                                            </CardContent>
                                        </CardActionArea>

                                        <CardActions>
                                            <Button onClick={() => this.onPageClick(page._id)} size="small" color="primary">
                                                Learn More
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Box>
                            ))}
                        </Box>
                    }
                </Box>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    pages: state.pages.data,
    loadingPages: state.pages.loadingPages
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchPages: fetchPages,
    removePage: removePage
}, dispatch);

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(PageList);