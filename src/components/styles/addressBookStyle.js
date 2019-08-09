const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    navbar: {
        backgroundColor: '#094571',
    },
    menuButton: {
        marginRight: 2,
    },
    title: {
        flexGrow: 1,
    },
    header: {
        backgroundImage: 'url(https://service.mycontacts-app.com/contacts/static/img/start_page_image.png)',
        backgroundSize: 'cover',
        minHeight: '200px',
        minWidth: '1210px',
        borderRadius: '10px 10px 10px 10px',
        boxShadow: '0 1px 2px 0 rgba(60,64,67,0.302), 0 2px 6px 2px rgba(60,64,67,0.149)',
    },
    paper: {
        marginTop: 60,
        minWidth: 100,
        margin: 'auto',
        borderRadius: '.5rem',
        marginBottom: 10,
        boxShadow: '0 1px 2px 0 rgba(60,64,67,0.302), 0 2px 6px 2px rgba(60,64,67,0.149)',
    },
    searchBar: {
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
    searchInput: {
        fontSize: 12,
    },
    block: {
        display: 'block',
    },
    contentWrapper: {
        maxHeight: 540,
        overflow: 'auto',
    },
    table: {
        minWidth: 1195,
    },
    addUser: {
        marginRight: 2,
        backgroundColor: '#077ce8',
        '&:hover': {
            backgroundColor: '#0571d6'
        }
    },
    textfield: {
        marginRight: theme.spacing(2),
    },
    hideLoader: {
        display: 'none',
    },
    loader: {
        position: 'absolute',
    },
    loaderOverlay: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: '44%',
        left: '49%'
    },
    contacts: {
        '&:hover': {
            backgroundColor: '#efefef'
        }
    },
    filter: {
        display: 'flex',
        alignItems: 'center',
    },
    toggle: {
        cursor: 'pointer',
    }
});


export default styles;