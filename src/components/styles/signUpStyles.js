const styles = {
    paper: {
       marginTop: 80,
       display: 'flex',
       flexDirection: 'column',
       alignItems: 'center',
    },
    avatar: {
       margin: 5,
       backgroundColor: '#0571d6',
    },
    form: {
       width: '100%',
       marginTop: 18,
    },
    submit: {
       marginTop: 25,
       backgroundColor: '#077ce8',
       '&:hover': {
          backgroundColor: '#0571d6'
       }
    },
    link: {
       marginTop: 10,
    },
    hideLoader: {
       display: 'none',
    },
    loginMessage: {
       marginBottom: '8px',
       fontSize: '16px',
       color: '#00000099',
    },
    loader: {
       position: 'absolute',
       margin: '125px -12px',
    },
    loaderOverlay: {
       height: '100%',
       width: '100%',
       position: 'absolute',
    },
 
 };

 export default styles;