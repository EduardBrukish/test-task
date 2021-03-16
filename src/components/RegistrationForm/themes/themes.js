import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { purple } from '@material-ui/core/colors';
import Checkbox from '@material-ui/core/Checkbox';

export const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    borderRadius: 50,
    maxWidth: 200,
    alignSelf: 'center',
    marginTop: 20,
    '&:hover': {
      backgroundColor: purple[700],
    },
  },
}))(Button);

export const CustomCheckbox = withStyles({
  root: {
    color: purple[500],
  },
})(Checkbox);
