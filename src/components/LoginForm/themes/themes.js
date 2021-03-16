import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export const CustomButton = withStyles(({
  root: {
    maxWidth: 200,
    alignSelf: 'center',
    marginTop: 20,
    textDecoration: 'none',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
}))(Button);
