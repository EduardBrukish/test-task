import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export const CustomButton = withStyles(({
  root: {
    maxWidth: 200,
    alignSelf: 'center',
    backgroundColor: '#e91e63',
    fontSize: 10,
    borderRadius: 50,
    '&:hover': {
      backgroundColor: '#d44f6c',
    },
  },
}))(Button);
