import {blue, red } from '@material-ui/core/colors'
import { makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles({
    root: {
      margin:"10px",
      maxWidth: 345,
      maxHeight: 400,
      border:blue,
      
    },
    container:{
      background:red,
    }
   
})